import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import L from 'leaflet'
import { Circle, MapContainer, Marker, Polyline, Popup, TileLayer, Tooltip } from 'react-leaflet'
import { Box, Card, CardContent, Stack, Typography } from '@mui/material'
import HeatmapLayer from './HeatmapLayer.jsx'
import {
  WAREHOUSE,
  allDestinations,
  noFlyZones,
  generateDroneFleet,
  assignRoutes,
  priorityColors,
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
  urban: L.divIcon({
    className: 'map-div-icon',
    html: '<div class="map-pin map-pin-point">U</div>',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  }),
  rural: L.divIcon({
    className: 'map-div-icon',
    html: '<div class="map-pin map-pin-rural">R</div>',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  }),
  critical: L.divIcon({
    className: 'map-div-icon',
    html: '<div class="map-pin map-pin-critical">!</div>',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  }),
}

function getDestIcon(dest) {
  if (dest.priority === 'critical') return iconByType.critical
  if (dest.type === 'rural') return iconByType.rural
  return iconByType.urban
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
}) {
  const [droneFleet, setDroneFleet] = useState(() => generateDroneFleet(droneCount))
  const [routes, setRoutes] = useState([])
  const [progress, setProgress] = useState({})
  const [coverageHistory, setCoverageHistory] = useState([])
  const [heatmapPoints, setHeatmapPoints] = useState([])
  const tickRef = useRef(null)
  const coverageRef = useRef([])

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
      }
    })
  }, [routes, progress, speed])

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

  return (
    <Card className="hover-lift">
      <CardContent>
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={1} sx={{ mb: 1.5 }}>
          <Typography variant="h6">
            {showHeatmap ? 'Coverage Heatmap View' : 'Live Drone Coordination'}
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
              {isRunning ? 'Simulation running' : 'Simulation paused'}
              {' | '}
              {dronePositions.length} drones active
              {' | '}
              Speed: {speed}x
            </Typography>
          </Stack>
        </Stack>

        <Box sx={{ borderRadius: 3, overflow: 'hidden', border: '1px solid #d2e4ea' }}>
          <MapContainer
            center={WAREHOUSE.position}
            zoom={13}
            style={{ height: '520px', width: '100%' }}
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
                  <strong>No-Fly Zone</strong><br />
                  {zone.name}
                </Tooltip>
              </Circle>
            ))}

            {/* Warehouse marker */}
            <Marker position={WAREHOUSE.position} icon={iconByType.warehouse}>
              <Popup>
                <strong>{WAREHOUSE.name}</strong><br />
                Central dispatch hub
              </Popup>
            </Marker>

            {/* Destination markers */}
            {allDestinations.map((dest) => (
              <Marker key={dest.id} position={dest.position} icon={getDestIcon(dest)}>
                <Tooltip direction="top" permanent={false}>
                  <div style={{ minWidth: 140 }}>
                    <strong>{dest.name}</strong><br />
                    Type: {dest.type === 'rural' ? 'Rural/Remote' : 'Urban'}<br />
                    Priority: <span style={{ color: priorityColors[dest.priority], fontWeight: 700 }}>
                      {dest.priority.toUpperCase()}
                    </span>
                  </div>
                </Tooltip>
                <Popup>
                  <strong>{dest.name}</strong><br />
                  Type: {dest.type === 'rural' ? 'Rural/Remote' : 'Urban'}<br />
                  Priority: {dest.priority.toUpperCase()}
                </Popup>
              </Marker>
            ))}

            {/* Drone route polylines */}
            {!showHeatmap && dronePositions.map((drone) => (
              <Polyline
                key={`route-${drone.droneId}`}
                positions={drone.path}
                pathOptions={{
                  color: drone.color,
                  weight: 3,
                  dashArray: drone.destinationType === 'rural' ? '4 8' : '10 6',
                  opacity: 0.7,
                }}
              />
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
                    <strong>Drone {drone.droneId}</strong><br />
                    Destination: {drone.destinationName}<br />
                    Parcels: {drone.parcelsAssigned}<br />
                    Battery: {drone.batteryLevel}%<br />
                    ETA: ~{drone.eta} min<br />
                    Priority: <span style={{ color: priorityColors[drone.priority], fontWeight: 700 }}>
                      {drone.priority.toUpperCase()}
                    </span>
                  </div>
                </Tooltip>
                <Popup>
                  <strong>Drone {drone.droneId}</strong><br />
                  Heading to: {drone.destinationName}<br />
                  Type: {drone.destinationType}<br />
                  Parcels assigned: {drone.parcelsAssigned}<br />
                  Battery: {drone.batteryLevel}%<br />
                  ETA: ~{drone.eta} min
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
