import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@mui/material/styles'
import { Box, Card, CardContent, Chip, Grid, Stack, Typography } from '@mui/material'
import { FaCloudRain, FaLocationDot, FaMountainSun, FaWarehouse, FaNetworkWired } from 'react-icons/fa6'
import { GiDeliveryDrone } from 'react-icons/gi'
import { MdBlock, MdPriorityHigh } from 'react-icons/md'
import PageHeader from '../components/PageHeader.jsx'
import EnhancedDroneMap from '../components/EnhancedDroneMap.jsx'
import SimulationControls from '../components/SimulationControls.jsx'
import SwarmAlertPanel from '../components/SwarmAlertPanel.jsx'
import SwarmStatusPanel from '../components/SwarmStatusPanel.jsx'

function LiveMapPage() {
  const { t } = useTranslation()
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'
  const desktopSidebarHeight = 'calc(clamp(680px, 78vh, 820px) + 72px)'
  const [isRunning, setIsRunning] = useState(true)
  const [droneCount, setDroneCount] = useState(8)
  const [speed, setSpeed] = useState(1)
  const [showHeatmap, setShowHeatmap] = useState(false)
  const [priorityMode, setPriorityMode] = useState(false)
  const [showNoFlyZones, setShowNoFlyZones] = useState(true)
  const [swarmState, setSwarmState] = useState({
    activeDroneCount: 0,
    communicationEnabled: false,
    communicationLinks: 0,
    collisionAvoidanceActive: true,
    routeOptimizationRunning: true,
    taskRedistributionEnabled: false,
    activeAlerts: 0,
  })
  const [swarmAlerts, setSwarmAlerts] = useState([])
  const [dronePositions, setDronePositions] = useState([])

  const handleSwarmAlertsChange = useCallback((alerts) => {
    setSwarmAlerts(alerts)
  }, [])

  const handleReset = () => {
    setIsRunning(false)
    if (window.__droneMapReset) {
      window.__droneMapReset()
    }
    setTimeout(() => setIsRunning(true), 100)
  }

  return (
    <Stack spacing={2.5}>
      <Box className="reveal-up">
        <PageHeader
          title={t('map.title')}
          subtitle={t('map.subtitle')}
        />
      </Box>

      <Grid container spacing={1.5}>
        {/* Main Map Area */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Box className="reveal-up delay-1">
            <EnhancedDroneMap
              droneCount={droneCount}
              speed={speed}
              isRunning={isRunning}
              showHeatmap={showHeatmap}
              priorityMode={priorityMode}
              showNoFlyZones={showNoFlyZones}
              onSwarmStateChange={setSwarmState}
              onSwarmAlertsChange={handleSwarmAlertsChange}
              onDronePositionsChange={setDronePositions}
            />
          </Box>
        </Grid>

        {/* Right Sidebar */}
        <Grid size={{ xs: 12, lg: 4 }} sx={{ display: 'flex' }}>
          <Stack
            spacing={1}
            sx={{
              width: '100%',
              height: { xs: 'auto', lg: desktopSidebarHeight },
            }}
          >
            {/* Swarm Alerts */}
            <Box className="reveal-up delay-2" sx={{ flex: 1.08, minHeight: 0 }}>
              <Card className="hover-lift glow-card" sx={{ borderRadius: 3, height: '100%' }}>
                <CardContent sx={{ p: 1.4, height: '100%', overflow: 'auto' }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 0.8 }}>
                    {t('map.swarmAdjustment')}
                  </Typography>
                  <SwarmAlertPanel alerts={swarmAlerts} placement="sidebar" />
                </CardContent>
              </Card>
            </Box>

            {/* Map Legend */}
            <Box className="reveal-up delay-3" sx={{ flex: 1, minHeight: 0 }}>
              <Card className="hover-lift glow-card" sx={{ borderRadius: 2, height: '100%', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <CardContent sx={{ p: 1.2, height: '100%', overflow: 'auto' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, color: isDark ? 'text.primary' : 'black' }}>
                    {t('map.mapLegend')}
                  </Typography>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr' },
                      gap: 0.7,
                    }}
                  >
                    {[
                      { key: 'warehouse', icon: <FaWarehouse />, className: 'legend-warehouse', label: t('map.warehouseHub') },
                      { key: 'drone', icon: <GiDeliveryDrone />, className: 'legend-drone', label: t('map.activeDrone') },
                      { key: 'urban', icon: <FaLocationDot />, className: 'legend-point', label: t('map.urbanDest') },
                      { key: 'rural', icon: <FaMountainSun />, className: 'legend-rural', label: t('map.ruralDest') },
                      { key: 'critical', icon: <MdPriorityHigh />, className: 'legend-critical', label: t('map.criticalDel') },
                      { key: 'weather', icon: <FaCloudRain />, className: 'legend-weather', label: t('map.weatherIndicator') },
                      { key: 'network', icon: <FaNetworkWired />, className: 'legend-weather', label: t('map.communicationLine') },
                      { key: 'nofly', icon: <MdBlock />, className: 'legend-nofly', label: t('map.noFlyZone') },
                    ].map((item) => (
                      <Box
                        key={item.key}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          p: 0.65,
                          borderRadius: 1.5,
                          bgcolor: 'background.paper',
                          border: '1px solid',
                          borderColor: 'divider',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                          transition: 'all 0.2s',
                          '&:hover': {
                            bgcolor: 'action.hover',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                          },
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 28,
                            height: 28,
                            borderRadius: 1,
                            mr: 0.7,
                            bgcolor: 'primary.light',
                            color: 'primary.contrastText',
                          }}
                        >
                          <span
                            className={`legend-icon ${item.className}`}
                            style={{ width: 17, height: 17, borderRadius: 4, fontSize: 10 }}
                          >
                            {item.icon}
                          </span>
                        </Box>
                        <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: 1.2, fontSize: '0.78rem' }}>
                          {item.label}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  {showHeatmap && (
                    <Stack sx={{ mt: 1.5 }}>
                      <Typography variant="caption" sx={{ fontWeight: 700, mb: 0.5 }}>
                        {t('map.heatmapLegend')}
                      </Typography>
                      <div className="heatmap-gradient-bar" />
                      <Stack direction="row" justifyContent="space-between">
                        <Typography variant="caption" color="text.secondary">{t('map.lowCoverage')}</Typography>
                        <Typography variant="caption" color="text.secondary">{t('map.highCoverage')}</Typography>
                      </Stack>
                    </Stack>
                  )}
                </CardContent>
              </Card>
            </Box>

            {/* Priority Info */}
            <Box className="reveal-up delay-4" sx={{ flex: 0.84, minHeight: 0 }}>
              <Card className="hover-lift glow-card" sx={{ borderRadius: 2, height: '100%', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <CardContent sx={{ p: 1.2, height: '100%', overflow: 'auto' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1, color: isDark ? 'text.primary' : 'black' }}>
                    {t('map.priorityLevels')}
                  </Typography>
                  <Stack spacing={0.75}>
                    {[
                      { label: t('map.critical'), color: '#ef4444', desc: t('map.medicalSupplies') },
                      { label: t('map.high'), color: '#f97316', desc: t('map.remoteDeliveries') },
                      { label: t('map.medium'), color: '#eab308', desc: t('map.standardSME') },
                      { label: t('map.low'), color: '#22c55e', desc: t('map.nonUrgent') },
                    ].map((p) => (
                      <Box
                        key={p.label}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          p: 0.75,
                          borderRadius: 1.5,
                          bgcolor: 'background.paper',
                          border: '1px solid',
                          borderColor: 'divider',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                          transition: 'all 0.2s',
                          '&:hover': {
                            bgcolor: 'action.hover',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                          },
                        }}
                      >
                        <Chip
                          label={p.label}
                          size="small"
                          sx={{
                            bgcolor: p.color,
                            color: '#fff',
                            fontWeight: 800,
                            fontSize: '0.64rem',
                            letterSpacing: '0.05em',
                            minWidth: 52,
                            height: 22,
                            mr: 1,
                            '& .MuiChip-label': { px: 0.8 },
                          }}
                        />
                        <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: 1.2, flex: 1, fontSize: '0.78rem' }}>
                          {p.desc}
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          </Stack>
        </Grid>

        {/* Swarm Status Panel — full width */}
        <Grid size={{ xs: 12 }}>
          <Box className="reveal-up delay-5">
            <SwarmStatusPanel swarmState={swarmState} />
          </Box>
        </Grid>

        {/* Simulation Controls */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Box className="reveal-up delay-6">
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
          </Box>
        </Grid>

        {/* Coordinate Snapshot */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Box className="reveal-up delay-6">
            <Card className="hover-lift glow-card" sx={{ borderRadius: 3, height: '100%' }}>
              <CardContent sx={{ p: 2.5 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                  {t('map.coordSnapshot')}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1, lineHeight: 1.7 }}>
                  {t('map.coordDesc1')}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {t('map.coordDesc2')}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Stack>
  )
}

export default LiveMapPage
