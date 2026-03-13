import { Chip, Box } from '@mui/material'

const paletteByStatus = {
  Delivering: { bg: 'rgba(14,165,233,0.1)', color: '#0284c7', border: 'rgba(14,165,233,0.2)', dot: '#0ea5e9' },
  Delivered: { bg: 'rgba(34,197,94,0.1)', color: '#15803d', border: 'rgba(34,197,94,0.2)', dot: '#22c55e' },
  Waiting: { bg: 'rgba(234,179,8,0.1)', color: '#a16207', border: 'rgba(234,179,8,0.2)', dot: '#eab308' },
}

function DeliveryStatusChip({ status }) {
  const palette = paletteByStatus[status] || { bg: '#e2e8f0', color: '#334155', border: '#cbd5e1', dot: '#94a3b8' }

  return (
    <Chip
      label={status}
      size="small"
      icon={
        <Box
          sx={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            bgcolor: palette.dot,
            ml: 0.8,
            ...(status === 'Delivering' && {
              animation: 'livePulse 2s ease-in-out infinite',
            }),
          }}
        />
      }
      sx={{
        bgcolor: palette.bg,
        color: palette.color,
        fontWeight: 700,
        fontSize: '0.72rem',
        letterSpacing: '0.02em',
        border: `1px solid ${palette.border}`,
        '& .MuiChip-icon': { mr: -0.3 },
      }}
    />
  )
}

export default DeliveryStatusChip
