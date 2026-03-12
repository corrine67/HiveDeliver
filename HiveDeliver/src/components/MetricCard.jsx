import { Box, Card, CardContent, Stack, Typography } from '@mui/material'
import { useAnimatedCounter } from '../hooks/useAnimatedCounter.js'

function MetricCard({ title, value, trend, icon }) {
  const isNumeric = typeof value === 'number'
  const animated = useAnimatedCounter(isNumeric ? value : 0)
  const displayed = isNumeric ? animated : value

  return (
    <Card className="hover-lift" sx={{ height: '100%' }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
          <Stack spacing={0.8}>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={0.8}>
              <Typography variant="h5">{displayed}</Typography>
              {isNumeric && (
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    flexShrink: 0,
                    animation: 'livePulse 2s ease-in-out infinite',
                  }}
                />
              )}
            </Stack>
            <Typography variant="caption" color="primary.main">
              {trend}
            </Typography>
          </Stack>
          <Typography variant="h5" color="primary.main">
            {icon}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default MetricCard
