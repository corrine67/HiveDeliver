import { Box, Card, CardContent, Chip, Grid, Stack, Typography } from '@mui/material'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FaCloudRain, FaTemperatureHalf, FaWind, FaTriangleExclamation } from 'react-icons/fa6'

const safetyStyles = {
  Safe: {
    color: '#16a34a',
    bg: 'rgba(22,163,74,0.12)',
    border: 'rgba(22,163,74,0.28)',
  },
  Caution: {
    color: '#ea580c',
    bg: 'rgba(234,88,12,0.12)',
    border: 'rgba(234,88,12,0.28)',
  },
  Unsafe: {
    color: '#dc2626',
    bg: 'rgba(220,38,38,0.12)',
    border: 'rgba(220,38,38,0.28)',
  },
}

function WeatherStatusCard({ weather }) {
  const { t } = useTranslation()

  const style = useMemo(
    () => safetyStyles[weather.flightSafety] ?? safetyStyles.Safe,
    [weather.flightSafety],
  )

  const statusKey = `weather.status${weather.flightSafety}`

  return (
    <Card
      className="hover-lift glow-card"
      sx={{
        borderRadius: 3,
        border: '1px solid',
        borderColor: style.border,
      }}
    >
      <CardContent sx={{ p: 2.2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.6 }}>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            {t('weather.title')}
          </Typography>
          <Chip
            label={t(statusKey)}
            size="small"
            sx={{
              color: style.color,
              bgcolor: style.bg,
              border: '1px solid',
              borderColor: style.border,
              fontWeight: 700,
            }}
          />
        </Stack>

        <Grid container spacing={1.2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <FaWind color="#0ea5e9" />
              <Typography variant="body2" color="text.secondary">
                <strong>{t('weather.windSpeed')}:</strong> {weather.windSpeed}
              </Typography>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <FaCloudRain color="#2563eb" />
              <Typography variant="body2" color="text.secondary">
                <strong>{t('weather.rain')}:</strong> {weather.rain}
              </Typography>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <FaTemperatureHalf color="#f97316" />
              <Typography variant="body2" color="text.secondary">
                <strong>{t('weather.temperature')}:</strong> {weather.temperature}
              </Typography>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography variant="body2" color="text.secondary">
              <strong>{t('weather.flightSafety')}:</strong> {t(statusKey)}
            </Typography>
          </Grid>
        </Grid>

        {weather.alert && (
          <Box
            sx={{
              mt: 1.6,
              p: 1.2,
              borderRadius: 2,
              bgcolor: 'rgba(249,115,22,0.1)',
              border: '1px solid rgba(249,115,22,0.28)',
            }}
          >
            <Stack direction="row" spacing={0.9} alignItems="center" sx={{ mb: 0.6 }}>
              <FaTriangleExclamation color="#f97316" />
              <Typography variant="body2" sx={{ fontWeight: 800 }}>
                {t(weather.alert.titleKey)}
              </Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
              {t(weather.alert.messageKey)}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

export default WeatherStatusCard
