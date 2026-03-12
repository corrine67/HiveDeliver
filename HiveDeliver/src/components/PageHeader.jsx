import { Stack, Typography } from '@mui/material'

function PageHeader({ title, subtitle }) {
  return (
    <Stack spacing={0.6} sx={{ mb: 2.5 }}>
      <Typography variant="h4">{title}</Typography>
      <Typography variant="body1" color="text.secondary">
        {subtitle}
      </Typography>
    </Stack>
  )
}

export default PageHeader
