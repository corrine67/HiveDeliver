import { Card, CardContent, LinearProgress, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { FaLeaf, FaOilCan } from 'react-icons/fa6'
import { TbCloudCheck } from 'react-icons/tb'

function EnvironmentalImpactCard({ impact, compact = false }) {
  const { t } = useTranslation()

  return (
    <Card className="hover-lift glow-card" sx={{ borderRadius: 3, height: '100%' }}>
      <CardContent sx={{ p: compact ? 1.8 : 2.2 }}>
        <Stack direction="row" alignItems="center" spacing={1.1} sx={{ mb: compact ? 1 : 1.4 }}>
          <FaLeaf color="#16a34a" />
          <Typography variant={compact ? 'subtitle1' : 'h6'} sx={{ fontWeight: 800 }}>
            {t('environment.title')}
          </Typography>
        </Stack>

        <Stack spacing={compact ? 0.8 : 1.1}>
          <Typography variant="body2" color="text.secondary">
            <strong>{t('environment.co2Saved')}:</strong> {impact.co2Saved}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>{t('environment.fuelSaved')}:</strong> {impact.fuelSaved}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>{t('environment.greenDeliveries')}:</strong> {impact.greenDeliveries}
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: compact ? 1.2 : 1.8, mb: 0.7 }}>
          <TbCloudCheck color="#0ea5e9" />
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>
            {t('environment.weeklyProgress', { pct: impact.weeklyReductionPct })}
          </Typography>
        </Stack>

        <LinearProgress
          variant="determinate"
          value={impact.weeklyReductionPct}
          sx={{
            height: 8,
            borderRadius: 999,
            bgcolor: 'rgba(15,118,110,0.15)',
            '& .MuiLinearProgress-bar': {
              background: 'linear-gradient(90deg, #16a34a 0%, #0ea5e9 100%)',
            },
          }}
        />

        <Stack direction="row" spacing={0.8} alignItems="center" sx={{ mt: compact ? 0.8 : 1.1 }}>
          <FaOilCan color="#f59e0b" size={13} />
          <Typography variant="caption" color="text.secondary">
            {t('environment.secondaryNote')}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default EnvironmentalImpactCard
