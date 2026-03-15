import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import CloudQueueOutlinedIcon from '@mui/icons-material/CloudQueueOutlined'
import AltRouteOutlinedIcon from '@mui/icons-material/AltRouteOutlined'
import { GiDeliveryDrone } from 'react-icons/gi'

const iconByType = {
  weather: <CloudQueueOutlinedIcon fontSize="small" />,
  traffic: <AltRouteOutlinedIcon fontSize="small" />,
  swarm: <GiDeliveryDrone size={16} />,
}

function SwarmAlertPanel({ alerts = [], placement = 'overlay' }) {
  if (!alerts.length) return null

  const isOverlay = placement === 'overlay'

  return (
    <Box
      sx={{
        position: isOverlay ? 'absolute' : 'relative',
        top: isOverlay ? 14 : 'auto',
        right: isOverlay ? 14 : 'auto',
        width: isOverlay ? { xs: 'calc(100% - 28px)', sm: 320 } : '100%',
        maxWidth: '100%',
        zIndex: isOverlay ? 1000 : 'auto',
        pointerEvents: isOverlay ? 'none' : 'auto',
      }}
    >
      <Stack spacing={1.1}>
        {alerts.map((alert) => (
          <Card
            key={alert.id}
            sx={{
              borderRadius: 3,
              bgcolor: isOverlay ? 'rgba(255,255,255,0.94)' : 'background.paper',
              backdropFilter: isOverlay ? 'blur(16px)' : 'none',
              border: '1px solid rgba(249,115,22,0.18)',
              boxShadow: isOverlay ? '0 16px 32px rgba(15,23,42,0.18)' : '0 8px 20px rgba(15,23,42,0.08)',
              pointerEvents: 'auto',
            }}
          >
            <CardContent sx={{ p: 1.5 }}>
              <Stack spacing={1}>
                <Stack direction="row" justifyContent="space-between" spacing={1} alignItems="center">
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Stack
                      alignItems="center"
                      justifyContent="center"
                      sx={{
                        width: 30,
                        height: 30,
                        borderRadius: 2,
                        bgcolor: 'rgba(249,115,22,0.12)',
                        color: '#ea580c',
                        flexShrink: 0,
                      }}
                    >
                      {iconByType[alert.type] || iconByType.swarm}
                    </Stack>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 800, lineHeight: 1.25 }}>
                        {alert.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {alert.subtitle}
                      </Typography>
                    </Box>
                  </Stack>
                  <Chip
                    icon={<WarningAmberRoundedIcon sx={{ fontSize: '1rem !important' }} />}
                    label={alert.level}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(249,115,22,0.1)',
                      color: '#c2410c',
                      border: '1px solid rgba(249,115,22,0.18)',
                      fontWeight: 700,
                    }}
                  />
                </Stack>

                <Stack spacing={0.35}>
                  {alert.lines.map((line) => (
                    <Typography key={line} variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.5 }}>
                      {line}
                    </Typography>
                  ))}
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  )
}

export default SwarmAlertPanel
