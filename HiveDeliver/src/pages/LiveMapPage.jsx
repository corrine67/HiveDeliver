import { useState } from 'react'
import { Card, CardContent, Chip, Grid, Stack, Typography } from '@mui/material'
import { FaLocationDot, FaMountainSun, FaWarehouse } from 'react-icons/fa6'
import { GiDeliveryDrone } from 'react-icons/gi'
import { MdBlock, MdPriorityHigh } from 'react-icons/md'
import PageHeader from '../components/PageHeader.jsx'
import EnhancedDroneMap from '../components/EnhancedDroneMap.jsx'
import SimulationControls from '../components/SimulationControls.jsx'

function LiveMapPage() {
  const [isRunning, setIsRunning] = useState(true)
  const [droneCount, setDroneCount] = useState(8)
  const [speed, setSpeed] = useState(1)
  const [showHeatmap, setShowHeatmap] = useState(false)
  const [priorityMode, setPriorityMode] = useState(false)
  const [showNoFlyZones, setShowNoFlyZones] = useState(true)

  const handleReset = () => {
    setIsRunning(false)
    // Call the map's internal reset
    if (window.__droneMapReset) {
      window.__droneMapReset()
    }
    setTimeout(() => setIsRunning(true), 100)
  }

  return (
    <Stack spacing={2}>
      <PageHeader
        title="Live Drone Map"
        subtitle="Visualize warehouse dispatch, active drones, delivery routes, rural coverage, and no-fly zones in real time."
      />

      <Grid container spacing={1.5}>
        {/* Main Map Area */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <EnhancedDroneMap
            droneCount={droneCount}
            speed={speed}
            isRunning={isRunning}
            showHeatmap={showHeatmap}
            priorityMode={priorityMode}
            showNoFlyZones={showNoFlyZones}
          />
        </Grid>

        {/* Controls & Legend Sidebar */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={1.5}>
            {/* Simulation Controls */}
            <SimulationControls
              isRunning={isRunning}
              onToggleRunning={() => setIsRunning((prev) => !prev)}
              onReset={handleReset}
              droneCount={droneCount}
              onDroneCountChange={setDroneCount}
              speed={speed}
              onSpeedChange={setSpeed}
              showHeatmap={showHeatmap}
              onToggleHeatmap={() => setShowHeatmap((prev) => !prev)}
              priorityMode={priorityMode}
              onTogglePriority={() => setPriorityMode((prev) => !prev)}
              showNoFlyZones={showNoFlyZones}
              onToggleNoFlyZones={() => setShowNoFlyZones((prev) => !prev)}
            />

            {/* Map Legend */}
            <Card className="hover-lift">
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5 }}>
                  Map Legend
                </Typography>
                <Stack spacing={1}>
                  <div className="legend-row">
                    <span className="legend-icon legend-warehouse">
                      <FaWarehouse />
                    </span>
                    <Typography variant="body2" color="text.primary">Warehouse (dispatch hub)</Typography>
                  </div>
                  <div className="legend-row">
                    <span className="legend-icon legend-drone">
                      <GiDeliveryDrone />
                    </span>
                    <Typography variant="body2" color="text.primary">Active drone</Typography>
                  </div>
                  <div className="legend-row">
                    <span className="legend-icon legend-point">
                      <FaLocationDot />
                    </span>
                    <Typography variant="body2" color="text.primary">Urban destination</Typography>
                  </div>
                  <div className="legend-row">
                    <span className="legend-icon legend-rural">
                      <FaMountainSun />
                    </span>
                    <Typography variant="body2" color="text.primary">Rural / remote destination</Typography>
                  </div>
                  <div className="legend-row">
                    <span className="legend-icon legend-critical">
                      <MdPriorityHigh />
                    </span>
                    <Typography variant="body2" color="text.primary">Critical priority delivery</Typography>
                  </div>
                  <div className="legend-row">
                    <span className="legend-icon legend-nofly">
                      <MdBlock />
                    </span>
                    <Typography variant="body2" color="text.primary">No-fly zone</Typography>
                  </div>
                </Stack>

                {showHeatmap && (
                  <Stack sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                      Heatmap Legend
                    </Typography>
                    <div className="heatmap-gradient-bar" />
                    <Stack direction="row" justifyContent="space-between">
                      <Typography variant="caption" color="text.secondary">Low coverage</Typography>
                      <Typography variant="caption" color="text.secondary">High coverage</Typography>
                    </Stack>
                  </Stack>
                )}
              </CardContent>
            </Card>

            {/* Priority Info */}
            <Card className="hover-lift">
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                  Priority Levels
                </Typography>
                <Stack spacing={0.8}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Chip label="CRITICAL" size="small" sx={{ bgcolor: '#ef4444', color: '#fff', fontWeight: 700, fontSize: 11 }} />
                    <Typography variant="body2" color="text.secondary">Medical / emergency supplies</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Chip label="HIGH" size="small" sx={{ bgcolor: '#f97316', color: '#fff', fontWeight: 700, fontSize: 11 }} />
                    <Typography variant="body2" color="text.secondary">Remote area deliveries</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Chip label="MEDIUM" size="small" sx={{ bgcolor: '#eab308', color: '#fff', fontWeight: 700, fontSize: 11 }} />
                    <Typography variant="body2" color="text.secondary">Standard SME deliveries</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Chip label="LOW" size="small" sx={{ bgcolor: '#22c55e', color: '#fff', fontWeight: 700, fontSize: 11 }} />
                    <Typography variant="body2" color="text.secondary">Non-urgent packages</Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>

            {/* Coordination Snapshot */}
            <Card className="hover-lift">
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                  Coordination Snapshot
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  The AI engine staggers departures and path vectors to reduce overlap risk and avoid
                  mid-route conflicts. Rural and critical deliveries are prioritized when swarm logic is enabled.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Hover over any drone marker to see real-time info including drone ID, parcels assigned,
                  battery level, and estimated time of arrival.
                </Typography>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  )
}

export default LiveMapPage
