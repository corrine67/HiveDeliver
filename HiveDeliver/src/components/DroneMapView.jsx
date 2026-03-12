import { useEffect, useMemo, useState } from 'react'
import L from 'leaflet'
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet'
import { Box, Card, CardContent, Stack, Typography } from '@mui/material'

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
  point: L.divIcon({
    className: 'map-div-icon',
    html: '<div class="map-pin map-pin-point">P</div>',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  }),
}

function DroneMapView({ mapData }) {
  const [progressByDrone, setProgressByDrone] = useState(() =>
    mapData.droneRoutes.reduce((acc, route) => {
      acc[route.droneId] = 0
      return acc
    }, {}),
  )

  useEffect(() => {
    const timer = setInterval(() => {
      setProgressByDrone((current) => {
        const next = { ...current }
        mapData.droneRoutes.forEach((route) => {
          next[route.droneId] = (current[route.droneId] + 1) % route.path.length
        })
        return next
      })
    }, 1700)

    return () => clearInterval(timer)
  }, [mapData.droneRoutes])

  const dronePositions = useMemo(
    () =>
      mapData.droneRoutes.map((route) => ({
        droneId: route.droneId,
        destinationId: route.destinationId,
        color: route.color,
        path: route.path,
        position: route.path[progressByDrone[route.droneId] || 0],
      })),
    [mapData.droneRoutes, progressByDrone],
  )

  return (
    <Card className="hover-lift">
      <CardContent>
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={1} sx={{ mb: 1.5 }}>
          <Typography variant="h6">Live Drone Coordination</Typography>
          <Typography variant="body2" color="text.secondary">
            Simulated swarm movement updates every 1.7 seconds
          </Typography>
        </Stack>

        <Box sx={{ borderRadius: 3, overflow: 'hidden', border: '1px solid #d2e4ea' }}>
          <MapContainer
            center={mapData.warehouse.position}
            zoom={14}
            style={{ height: '460px', width: '100%' }}
            scrollWheelZoom
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={mapData.warehouse.position} icon={iconByType.warehouse}>
              <Popup>{mapData.warehouse.name}</Popup>
            </Marker>

            {mapData.destinations.map((destination) => (
              <Marker key={destination.id} position={destination.position} icon={iconByType.point}>
                <Popup>{destination.name}</Popup>
              </Marker>
            ))}

            {dronePositions.map((drone) => (
              <Marker key={drone.droneId} position={drone.position} icon={iconByType.drone}>
                <Popup>
                  Drone {drone.droneId} heading to {drone.destinationId}
                </Popup>
              </Marker>
            ))}

            {mapData.droneRoutes.map((route) => (
              <Polyline
                key={route.droneId}
                positions={route.path}
                pathOptions={{ color: route.color, weight: 3.5, dashArray: '10 6' }}
              />
            ))}
          </MapContainer>
        </Box>
      </CardContent>
    </Card>
  )
}

export default DroneMapView
