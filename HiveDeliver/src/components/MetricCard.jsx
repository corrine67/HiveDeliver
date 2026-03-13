import { Box, Card, CardContent, Stack, Typography } from '@mui/material'
import { useAnimatedCounter } from '../hooks/useAnimatedCounter.js'

function MetricCard({ title, value, trend, icon }) {
  const isNumeric = typeof value === 'number'
  const animated = useAnimatedCounter(isNumeric ? value : 0)
  const displayed = isNumeric ? animated : value

  return (
    <Card className="hover-lift glow-card" sx={{ height: '100%', borderRadius: 3, overflow: 'visible' }}>
      <CardContent sx={{ p: 2.5 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
          <Stack spacing={0.6}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.68rem' }}
            >
              {title}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="h4" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
                {displayed}
              </Typography>
              {isNumeric && (
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: '#22c55e',
                    flexShrink: 0,
                    animation: 'livePulse 2s ease-in-out infinite',
                    boxShadow: '0 0 8px rgba(34,197,94,0.5)',
                  }}
                />
              )}
            </Stack>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                color: 'primary.light',
                fontSize: '0.72rem',
              }}
            >
              {trend}
            </Typography>
          </Stack>
          <Box className="metric-icon-bg">
            {icon}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default MetricCard
