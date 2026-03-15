import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import L from 'leaflet'
import { Circle, MapContainer, Marker, Polyline, Popup, TileLayer, Tooltip } from 'react-leaflet'
import { Box, Card, CardContent, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import HeatmapLayer from './HeatmapLayer.jsx'
import {
  WAREHOUSE,
  allDestinations,
  locationWeatherData,
  noFlyZones,
  generateDroneFleet,
  assignRoutes,
  distanceMeters,
  priorityColors,
  SWARM_COMMUNICATION_RANGE_METERS,
} from '../data/simulationData.js'

/* ---- Leaflet icons ---- */
const iconByType = {
  warehouse: L.divIcon({
    className: 'map-div-icon',
    html: '<div class="map-pin map-pin-warehouse">W</div>',
    iconSize: [34, 34],
    iconAnchor: [17, 17],
  }),
  drone: L.divIcon({
    className: 'map-div-icon',
    html: '<div class="map-pin map-pin-drone">D</div>',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  }),
}

const weatherBadgeBySafety = {
  Safe: { symbol: '☀', className: 'map-weather-safe' },
  Caution: { symbol: '🌧', className: 'map-weather-caution' },
  Unsafe: { symbol: '⛈', className: 'map-weather-unsafe' },
}

const rainKeyByValue = {
  Light: 'weather.rainLight',
  Moderate: 'weather.rainModerate',
  Heavy: 'weather.rainHeavy',
}

function getDestinationIcon(dest, weather) {
  const pinClass = dest.priority === 'critical'
    ? 'map-pin-critical'
    : dest.type === 'rural'
      ? 'map-pin-rural'
      : 'map-pin-point'

  const pinLabel = dest.priority === 'critical' ? '!' : dest.type === 'rural' ? 'R' : 'U'
  const badge = weatherBadgeBySafety[weather?.flightSafety] || weatherBadgeBySafety.Safe

  return L.divIcon({
    className: 'map-div-icon',
    html: `<div class="map-pin-wrap"><div class="map-pin ${pinClass}">${pinLabel}</div><div class="map-weather-badge ${badge.className}">${badge.symbol}</div></div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  })
}

/* ---- Interpolate position along path ---- */
function interpolatePosition(path, progress) {
  if (!path || path.length === 0) return [0, 0]
  if (path.length === 1) return path[0]

  const totalSegments = path.length - 1
  const segFloat = progress * totalSegments
  const segIndex = Math.min(Math.floor(segFloat), totalSegments - 1)
  const segProgress = segFloat - segIndex

  const start = path[segIndex]
  const end = path[segIndex + 1]

  return [
    start[0] + (end[0] - start[0]) * segProgress,
    start[1] + (end[1] - start[1]) * segProgress,
  ]
}

function EnhancedDroneMap({
  droneCount = 8,
  speed = 1,
  isRunning = true,
  showHeatmap = false,
  priorityMode = false,
  showNoFlyZones = true,
  onSwarmStateChange,
  onSwarmAlertsChange,
}) {
  const { t } = useTranslation()
  const [droneFleet, setDroneFleet] = useState(() => generateDroneFleet(droneCount))
  const [routes, setRoutes] = useState([])
  const [progress, setProgress] = useState({})
  const [heatmapPoints, setHeatmapPoints] = useState([])
  const [alertOffset, setAlertOffset] = useState(0)
  const tickRef = useRef(null)
  const coverageRef = useRef([])

  const weatherByDestinationId = useMemo(
    () => Object.fromEntries(locationWeatherData.map((entry) => [entry.destinationId, entry])),
    [],
  )

  // Regenerate fleet when drone count changes
  useEffect(() => {
    const newFleet = generateDroneFleet(droneCount)
    setDroneFleet(newFleet)
  }, [droneCount])

  // Reassign routes when fleet or priority mode changes
  useEffect(() => {
    const newRoutes = assignRoutes(droneFleet, allDestinations, priorityMode)
    setRoutes(newRoutes)
    // Reset progress
    const initialProgress = {}
    newRoutes.forEach((r) => {
      initialProgress[r.droneId] = 0
    })
    setProgress(initialProgress)
  }, [droneFleet, priorityMode])

  // Animation loop
  useEffect(() => {
    if (!isRunning || routes.length === 0) {
      if (tickRef.current) clearInterval(tickRef.current)
      return
    }

    const interval = Math.max(50, 200 / speed)

    tickRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = { ...prev }
        const newCoveragePoints = []

        routes.forEach((route) => {
          const current = prev[route.droneId] || 0
          const step = 0.008 * speed
          let newVal = current + step

          if (newVal >= 1) {
            newVal = 0 // loop back
          }

          next[route.droneId] = newVal

          // Record coverage position
          const pos = interpolatePosition(route.path, newVal)
          newCoveragePoints.push(pos)
        })

        // Update coverage history
        coverageRef.current = [...coverageRef.current, ...newCoveragePoints]
        // Keep last 2000 points
        if (coverageRef.current.length > 2000) {
          coverageRef.current = coverageRef.current.slice(-2000)
        }

        return next
      })
    }, interval)

    return () => clearInterval(tickRef.current)
  }, [isRunning, routes, speed])

  // Update heatmap points periodically
  useEffect(() => {
    if (!showHeatmap) return

    const heatInterval = setInterval(() => {
      // Build heatmap: count frequency at grid cells
      const grid = {}
      const precision = 4

      coverageRef.current.forEach(([lat, lng]) => {
        const key = `${lat.toFixed(precision)},${lng.toFixed(precision)}`
        grid[key] = (grid[key] || 0) + 1
      })

      const maxCount = Math.max(...Object.values(grid), 1)
      const points = Object.entries(grid).map(([key, count]) => {
        const [lat, lng] = key.split(',').map(Number)
        // Invert: high coverage = low intensity (green), low coverage = high intensity (red)
        const intensity = 1 - (count / maxCount)
        return [lat, lng, Math.max(0.1, intensity)]
      })

      setHeatmapPoints(points)
    }, 1000)

    return () => clearInterval(heatInterval)
  }, [showHeatmap])

  // Compute drone positions
  const dronePositions = useMemo(() => {
    return routes.map((route) => {
      const p = progress[route.droneId] || 0
      const position = interpolatePosition(route.path, p)
      return {
        ...route,
        position,
        eta: Math.max(1, Math.round((1 - p) * 14 / speed)),
        status: p > 0.82 ? 'returning' : 'delivering',
      }
    })
  }, [routes, progress, speed])

  const communicationLinks = useMemo(() => {
    const links = []

    for (let i = 0; i < dronePositions.length; i += 1) {
      for (let j = i + 1; j < dronePositions.length; j += 1) {
        const source = dronePositions[i]
        const target = dronePositions[j]
        const distance = distanceMeters(source.position, target.position)

        if (distance <= SWARM_COMMUNICATION_RANGE_METERS) {
          links.push({
            id: `${source.droneId}-${target.droneId}`,
            sourceId: source.droneId,
            targetId: target.droneId,
            positions: [source.position, target.position],
            distance: Math.round(distance),
          })
        }
      }
    }

    return links
  }, [dronePositions])

  const neighborCounts = useMemo(() => {
    const counts = Object.fromEntries(dronePositions.map((drone) => [drone.droneId, 0]))

    communicationLinks.forEach((link) => {
      counts[link.sourceId] = (counts[link.sourceId] || 0) + 1
      counts[link.targetId] = (counts[link.targetId] || 0) + 1
    })

    return counts
  }, [communicationLinks, dronePositions])

  const candidateAlerts = useMemo(() => {
    const alerts = []
    const unsafeRoutes = dronePositions.filter((drone) => {
      const weather = weatherByDestinationId[drone.destinationId]
      return weather?.flightSafety === 'Unsafe'
    })

    unsafeRoutes.slice(0, 2).forEach((drone) => {
      const weather = weatherByDestinationId[drone.destinationId]
      const supportDrone = dronePositions
        .filter((candidate) => candidate.droneId !== drone.droneId)
        .sort((left, right) => distanceMeters(left.position, drone.position) - distanceMeters(right.position, drone.position))[0]

      alerts.push({
        id: `weather-${drone.droneId}`,
        type: 'weather',
        level: t('map.alertLevelAdaptive'),
        title: t('map.swarmAdjustment'),
        subtitle: t('map.weatherAlertDetected'),
        lines: [
          t('map.heavyRainDetectedNear', { location: weather?.location || drone.destinationName }),
          t('map.routeAdjustedForDrone', { droneId: drone.droneId }),
          supportDrone
            ? t('map.assistingNearbyDelivery', { droneId: supportDrone.droneId })
            : t('map.taskRedistributionEnabledMessage'),
        ],
      })
    })

    const busiestDroneId = Object.entries(neighborCounts)
      .sort((left, right) => right[1] - left[1])[0]?.[0]

    if (busiestDroneId && (neighborCounts[busiestDroneId] || 0) >= 3) {
      alerts.push({
        id: `traffic-${busiestDroneId}`,
        type: 'traffic',
        level: t('map.alertLevelTraffic'),
        title: t('map.highDroneTrafficDetected'),
        subtitle: t('map.decentralizedCoordinationActive'),
        lines: [
          t('map.localTrafficDensityHigh', { droneId: busiestDroneId }),
          t('map.trafficReroutedDrone', { droneId: busiestDroneId }),
        ],
      })
    }

    return alerts
  }, [dronePositions, neighborCounts, t, weatherByDestinationId])

  const visibleAlerts = useMemo(() => {
    if (candidateAlerts.length <= 2) return candidateAlerts

    return [
      candidateAlerts[alertOffset % candidateAlerts.length],
      candidateAlerts[(alertOffset + 1) % candidateAlerts.length],
    ]
  }, [alertOffset, candidateAlerts])

  const swarmSummaryRef = useRef(null)
  swarmSummaryRef.current = {
    activeDroneCount: dronePositions.length,
    communicationEnabled: communicationLinks.length > 0,
    communicationLinks: communicationLinks.length,
    collisionAvoidanceActive: dronePositions.length > 1,
    routeOptimizationRunning: isRunning && routes.length > 0,
    taskRedistributionEnabled: candidateAlerts.length > 0,
    activeAlerts: candidateAlerts.length,
  }

  // Reset handler (exposed via parent)
  const handleReset = useCallback(() => {
    coverageRef.current = []
    setHeatmapPoints([])
    const newFleet = generateDroneFleet(droneCount)
    setDroneFleet(newFleet)
  }, [droneCount])

  // Expose reset via window for parent access
  useEffect(() => {
    window.__droneMapReset = handleReset
    return () => { delete window.__droneMapReset }
  }, [handleReset])

  useEffect(() => {
    if (candidateAlerts.length <= 2) {
      setAlertOffset(0)
      return undefined
    }

    const interval = setInterval(() => {
      setAlertOffset((current) => (current + 1) % candidateAlerts.length)
    }, 4500)

    return () => clearInterval(interval)
  }, [candidateAlerts.length])

  useEffect(() => {
    if (!onSwarmStateChange) return undefined

    onSwarmStateChange(swarmSummaryRef.current)

    const interval = setInterval(() => {
      onSwarmStateChange(swarmSummaryRef.current)
    }, 1000)

    return () => clearInterval(interval)
  }, [onSwarmStateChange])

  useEffect(() => {
    if (!onSwarmAlertsChange) return
    onSwarmAlertsChange(visibleAlerts)
  }, [onSwarmAlertsChange, visibleAlerts])

  return (
    <Card className="hover-lift">
      <CardContent>
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={1} sx={{ mb: 1.5 }}>
          <Typography variant="h6">
            {showHeatmap ? t('controls.heatmapView') : t('map.liveCoordination')}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: isRunning ? '#22c55e' : '#ef4444',
                animation: isRunning ? 'livePulse 2s ease-in-out infinite' : 'none',
              }}
            />
            <Typography variant="body2" color="text.secondary">
              {isRunning ? t('map.simRunning') : t('map.simPaused')}
              {' | '}
              {dronePositions.length} {t('map.dronesActive')}
              {' | '}
              {t('map.speed')}: {speed}x
            </Typography>
          </Stack>
        </Stack>

        <Box sx={{ position: 'relative', borderRadius: 3, overflow: 'hidden', border: '1px solid #d2e4ea' }}>
          <MapContainer
            center={WAREHOUSE.position}
            zoom={13}
            style={{ height: 'clamp(680px, 78vh, 820px)', width: '100%' }}
            scrollWheelZoom
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Heatmap overlay */}
            {showHeatmap && heatmapPoints.length > 0 && (
              <HeatmapLayer points={heatmapPoints} />
            )}

            {/* No-fly zones */}
            {showNoFlyZones && noFlyZones.map((zone) => (
              <Circle
                key={zone.id}
                center={zone.center}
                radius={zone.radius}
                pathOptions={{
                  color: zone.color,
                  fillColor: zone.color,
                  fillOpacity: 0.2,
                  weight: 2,
                  dashArray: '8 4',
                }}
              >
                <Tooltip direction="top" permanent={false}>
                  <strong>{t('map.noFlyZone')}</strong><br />
                  {zone.name}
                </Tooltip>
              </Circle>
            ))}

            {/* Warehouse marker */}
            <Marker position={WAREHOUSE.position} icon={iconByType.warehouse}>
              <Popup>
                <strong>{WAREHOUSE.name}</strong><br />
                {t('map.centralDispatchHub')}
              </Popup>
            </Marker>

            {/* Destination markers */}
            {allDestinations.map((dest) => {
              const weather = weatherByDestinationId[dest.id]
              const safety = weather?.flightSafety || 'Safe'
              const rainLabel = weather ? t(rainKeyByValue[weather.rain] || weather.rain) : '-'

              return (
              <Marker key={dest.id} position={dest.position} icon={getDestinationIcon(dest, weather)}>
                <Tooltip direction="top" permanent={false}>
                  <div style={{ minWidth: 140 }}>
                    <strong>{dest.name}</strong><br />
                    {t('map.typeLabel')}: {dest.type === 'rural' ? t('map.ruralRemoteType') : t('map.urbanType')}<br />
                    {t('map.priorityLabel')}: <span style={{ color: priorityColors[dest.priority], fontWeight: 700 }}>
                      {t(`map.${dest.priority}`)}
                    </span>
                  </div>
                </Tooltip>
                <Popup>
                  <strong>{t('map.locationLabel')}:</strong> {dest.name}<br />
                  {t('map.typeLabel')}: {dest.type === 'rural' ? t('map.ruralRemoteType') : t('map.urbanType')}<br />
                  {t('map.priorityLabel')}: {t(`map.${dest.priority}`)}
                  <br /><br />
                  <strong>{t('map.weatherConditions')}</strong><br />
                  {t('weather.windSpeed')}: {weather?.windSpeed || '-'}<br />
                  {t('weather.rain')}: {rainLabel}<br />
                  {t('weather.temperature')}: {weather?.temperature || '-'}<br />
                  {t('weather.flightSafety')}: <span style={{ fontWeight: 700, color: safety === 'Unsafe' ? '#dc2626' : safety === 'Caution' ? '#f97316' : '#16a34a' }}>
                    {t(`weather.status${safety}`)}
                  </span>
                  {weather?.messageKey && (
                    <>
                      <br /><br />
                      <strong>{t('map.messageLabel')}:</strong><br />
                      {t(weather.messageKey)}
                    </>
                  )}
                </Popup>
              </Marker>
              )
            })}

            {/* Drone route polylines */}
            {!showHeatmap && dronePositions.map((drone) => (
              <Polyline
                key={`route-${drone.droneId}`}
                positions={drone.path}
                pathOptions={(() => {
                  const routeWeather = weatherByDestinationId[drone.destinationId]
                  const defaultStyle = {
                    color: drone.color,
                    weight: 3,
                    dashArray: drone.destinationType === 'rural' ? '4 8' : '10 6',
                    opacity: 0.7,
                  }

                  if (!routeWeather) return defaultStyle
                  if (routeWeather.flightSafety === 'Unsafe') {
                    return {
                      ...defaultStyle,
                      color: '#dc2626',
                      weight: 4,
                      dashArray: '3 8',
                      opacity: 0.9,
                    }
                  }

                  if (routeWeather.flightSafety === 'Caution') {
                    return {
                      ...defaultStyle,
                      color: '#f97316',
                      weight: 3.5,
                      dashArray: '6 7',
                      opacity: 0.85,
                    }
                  }

                  return defaultStyle
                })()}
              >
                {(() => {
                  const routeWeather = weatherByDestinationId[drone.destinationId]
                  if (!routeWeather || routeWeather.flightSafety === 'Safe') return null
                  return <Tooltip direction="center">{t('map.weatherAffectedRoute')}</Tooltip>
                })()}
              </Polyline>
            ))}

            {/* Drone communication links */}
            {communicationLinks.map((link) => (
              <Fragment key={link.id}>
                <Polyline
                  key={`comm-base-${link.id}`}
                  positions={link.positions}
                  pathOptions={{
                    color: '#0f766e',
                    weight: 4,
                    opacity: 0.12,
                    className: 'swarm-comm-link-base',
                  }}
                />
                <Polyline
                  key={`comm-${link.id}`}
                  positions={link.positions}
                  pathOptions={{
                    color: '#14b8a6',
                    weight: 2.4,
                    opacity: 0.45,
                    dashArray: '6 10',
                    lineCap: 'round',
                    className: 'swarm-comm-link-active',
                  }}
                >
                  <Tooltip direction="center">
                    <div>
                      <strong>{t('map.communicationLine')}</strong><br />
                      {t('map.communicationLinkBetween', { source: link.sourceId, target: link.targetId })}<br />
                      {t('map.linkDistanceMeters', { count: link.distance })}
                    </div>
                  </Tooltip>
                </Polyline>
              </Fragment>
            ))}

            {/* Drone markers with hover info */}
            {dronePositions.map((drone) => (
              <Marker
                key={`drone-${drone.droneId}`}
                position={drone.position}
                icon={iconByType.drone}
              >
                <Tooltip direction="top" permanent={false} className="drone-tooltip">
                  <div style={{ minWidth: 160 }}>
                    <strong>{t('map.droneWithId', { droneId: drone.droneId })}</strong><br />
                    {t('map.destinationLabel')}: {drone.destinationName}<br />
                    {t('map.parcelsLabel')}: {drone.parcelsAssigned}<br />
                    {t('map.batteryLabel')}: {drone.batteryLevel}%<br />
                    {t('map.etaLabel')}: ~{drone.eta} {t('map.minShort')}<br />
                    {t('dashboard.status')}: {t(`map.${drone.status}`)}<br />
                    {t('map.priorityLabel')}: <span style={{ color: priorityColors[drone.priority], fontWeight: 700 }}>
                      {t(`map.${drone.priority}`)}
                    </span>
                  </div>
                </Tooltip>
                <Popup>
                  <strong>{t('map.droneWithId', { droneId: drone.droneId })}</strong><br />
                  {t('map.headingToLabel')}: {drone.destinationName}<br />
                  {t('map.typeLabel')}: {drone.destinationType === 'rural' ? t('map.ruralRemoteType') : t('map.urbanType')}<br />
                  {t('map.parcelsAssignedLabel')}: {drone.parcelsAssigned}<br />
                  {t('map.batteryLabel')}: {drone.batteryLevel}%<br />
                  {t('map.etaLabel')}: ~{drone.eta} {t('map.minShort')}<br />
                  {t('dashboard.status')}: {t(`map.${drone.status}`)}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </Box>
      </CardContent>
    </Card>
  )
}

export default EnhancedDroneMap
