import { Chip } from '@mui/material'

const paletteByStatus = {
  Delivering: { bg: '#e0f2fe', color: '#075985' },
  Delivered: { bg: '#dcfce7', color: '#166534' },
  Waiting: { bg: '#fef3c7', color: '#92400e' },
}

function DeliveryStatusChip({ status }) {
  const palette = paletteByStatus[status] || { bg: '#e2e8f0', color: '#334155' }

  return (
    <Chip
      label={status}
      size="small"
      sx={{
        bgcolor: palette.bg,
        color: palette.color,
        fontWeight: 600,
      }}
    />
  )
}

export default DeliveryStatusChip
