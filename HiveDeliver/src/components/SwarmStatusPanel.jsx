import { Card, CardContent, Chip, Stack, Typography } from '@mui/material'
import FlightTakeoffOutlinedIcon from '@mui/icons-material/FlightTakeoffOutlined'
import WifiTetheringOutlinedIcon from '@mui/icons-material/WifiTetheringOutlined'
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined'
import AltRouteOutlinedIcon from '@mui/icons-material/AltRouteOutlined'
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined'
import { useTranslation } from 'react-i18next'

const rowIcons = {
  drones: <FlightTakeoffOutlinedIcon fontSize="small" />,
  communication: <WifiTetheringOutlinedIcon fontSize="small" />,
  safety: <SecurityOutlinedIcon fontSize="small" />,
  routing: <AltRouteOutlinedIcon fontSize="small" />,
  redistribution: <CompareArrowsOutlinedIcon fontSize="small" />,
}

function StatusRow({ icon, label, value, tone = 'default', meta }) {
  const colorMap = {
    success: {
      bg: 'rgba(34,197,94,0.12)',
      color: '#16a34a',
      border: 'rgba(34,197,94,0.24)',
    },
    warning: {
      bg: 'rgba(249,115,22,0.12)',
      color: '#ea580c',
      border: 'rgba(249,115,22,0.24)',
    },
    info: {
      bg: 'rgba(14,165,233,0.12)',
      color: '#0284c7',
      border: 'rgba(14,165,233,0.24)',
    },
    default: {
      bg: 'rgba(148,163,184,0.12)',
      color: '#475569',
      border: 'rgba(148,163,184,0.24)',
    },
  }

  const colors = colorMap[tone] || colorMap.default

  return (
    <Stack direction="row" spacing={1.2} alignItems="flex-start" justifyContent="space-between">
      <Stack direction="row" spacing={1.1} alignItems="flex-start" sx={{ minWidth: 0 }}>
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{
            width: 34,
            height: 34,
            borderRadius: 2,
            bgcolor: 'rgba(15,118,110,0.08)',
            color: 'primary.main',
            flexShrink: 0,
          }}
        >
          {icon}
        </Stack>
        <Stack spacing={0.35} sx={{ minWidth: 0 }}>
          <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
            {label}
          </Typography>
          {meta && (
            <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.4 }}>
              {meta}
            </Typography>
          )}
        </Stack>
      </Stack>
      <Chip
        label={value}
        size="small"
        sx={{
          bgcolor: colors.bg,
          color: colors.color,
          border: `1px solid ${colors.border}`,
          fontWeight: 700,
          maxWidth: 132,
        }}
      />
    </Stack>
  )
}

function SwarmStatusPanel({ swarmState }) {
  const { t } = useTranslation()

  const statusRows = [
    {
      key: 'drones',
      icon: rowIcons.drones,
      label: t('map.activeDroneSwarm'),
      value: `${swarmState.activeDroneCount} ${t('map.droneUnit')}`,
      tone: 'info',
      meta: t('map.currentCoverageFootprint'),
    },
    {
      key: 'communication',
      icon: rowIcons.communication,
      label: t('map.localCommunication'),
      value: swarmState.communicationEnabled ? t('map.enabled') : t('map.disabled'),
      tone: swarmState.communicationEnabled ? 'success' : 'warning',
      meta: t('map.localLinksCount', { count: swarmState.communicationLinks }),
    },
    {
      key: 'safety',
      icon: rowIcons.safety,
      label: t('map.collisionAvoidance'),
      value: swarmState.collisionAvoidanceActive ? t('map.activeStatus') : t('map.monitoringStatus'),
      tone: swarmState.collisionAvoidanceActive ? 'success' : 'default',
      meta: t('map.safeSeparationTracking'),
    },
    {
      key: 'routing',
      icon: rowIcons.routing,
      label: t('map.routeOptimization'),
      value: swarmState.routeOptimizationRunning ? t('map.runningStatus') : t('map.standbyStatus'),
      tone: swarmState.routeOptimizationRunning ? 'info' : 'default',
      meta: t('map.weatherAndPriorityAware'),
    },
    {
      key: 'redistribution',
      icon: rowIcons.redistribution,
      label: t('map.taskRedistribution'),
      value: swarmState.taskRedistributionEnabled ? t('map.enabled') : t('map.standbyStatus'),
      tone: swarmState.taskRedistributionEnabled ? 'warning' : 'default',
      meta: t('map.activeAlertsCount', { count: swarmState.activeAlerts }),
    },
  ]

  return (
    <Card className="hover-lift glow-card" sx={{ borderRadius: 3 }}>
      <CardContent sx={{ p: 2.5 }}>
        <Stack spacing={1.6}>
          <Stack spacing={0.5}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {t('map.swarmCoordinationStatus')}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
              {t('map.swarmCoordinationSubtitle')}
            </Typography>
          </Stack>

          <Stack spacing={1.35}>
            {statusRows.map((row) => (
              <StatusRow
                key={row.key}
                icon={row.icon}
                label={row.label}
                value={row.value}
                tone={row.tone}
                meta={row.meta}
              />
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default SwarmStatusPanel
