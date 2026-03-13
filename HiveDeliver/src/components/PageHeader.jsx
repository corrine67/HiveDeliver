import { Stack, Typography, Box } from '@mui/material'

function PageHeader({ title, subtitle }) {
  return (
    <Stack spacing={0.5} sx={{ mb: 2 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, fontSize: { xs: '1.5rem', md: '1.85rem' } }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 640, lineHeight: 1.7 }}>
          {subtitle}
        </Typography>
      )}
      <Box className="section-divider" sx={{ mt: 1 }} />
    </Stack>
  )
}

export default PageHeader
