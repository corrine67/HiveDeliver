import { useNavigate } from 'react-router-dom'
import { Box, Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import { FaBoxOpen, FaWarehouse } from 'react-icons/fa6'
import { GiDeliveryDrone } from 'react-icons/gi'
import PageHeader from '../components/PageHeader.jsx'
import { benefits } from '../data/mockData.js'

function LandingPage() {
  const navigate = useNavigate()

  return (
    <Stack spacing={2.2}>
      <PageHeader
        title="HiveDeliver - AI Swarm Drone Delivery"
        subtitle="Autonomous last-mile delivery powered by intelligent drone swarms."
      />

      <Card className="hover-lift hero-gradient" sx={{ overflow: 'hidden' }}>
        <CardContent sx={{ p: { xs: 2.2, md: 3.3 } }}>
          <Grid container spacing={2.4} alignItems="center">
            <Grid size={{ xs: 12, md: 7 }}>
              <Typography variant="h3" sx={{ mb: 1.2 }}>
                HiveDeliver - AI Swarm Drone Delivery
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2.1, maxWidth: 620 }}>
                Autonomous last-mile delivery powered by intelligent drone swarms.
              </Typography>

              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/dashboard')}
                sx={{
                  px: 2.6,
                  py: 1,
                  textTransform: 'none',
                  fontWeight: 700,
                  borderRadius: 99,
                }}
              >
                Open Delivery Dashboard
              </Button>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
              <Box className="drone-illustration">
                <Stack direction="row" spacing={1.2} justifyContent="space-between" sx={{ mb: 1 }}>
                  <Box className="node-card">
                    <FaWarehouse />
                    <Typography variant="caption">Warehouse</Typography>
                  </Box>
                  <Box className="node-card floating">
                    <GiDeliveryDrone />
                    <Typography variant="caption">Drone Swarm</Typography>
                  </Box>
                  <Box className="node-card">
                    <FaBoxOpen />
                    <Typography variant="caption">Packages</Typography>
                  </Box>
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  Drone swarms coordinate routes from warehouse to SME destinations in real time.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Box>
        <Typography variant="h5" sx={{ mb: 1.1 }}>
          Key Benefits
        </Typography>
        <Grid container spacing={1.2}>
          {benefits.map((benefit) => (
            <Grid key={benefit.title} size={{ xs: 12, sm: 6 }}>
              <Card className="hover-lift" sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.4 }}>
                    {benefit.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {benefit.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Stack>
  )
}

export default LandingPage
