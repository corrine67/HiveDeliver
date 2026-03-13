import { Box, Container } from '@mui/material'

export default function AuthLayout({ children }) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        py: 6,
        background: 'linear-gradient(145deg, rgba(15,118,110,0.18), rgba(249,115,22,0.13))',
      }}
    >
      <Container maxWidth="sm" sx={{ width: '100%' }}>
        {children}
      </Container>
    </Box>
  )
}
