import { useNavigate } from 'react-router-dom'
import { Box, Button, Card, CardContent, Grid, Stack, Typography, Chip } from '@mui/material'
import { FaBoxOpen, FaWarehouse, FaArrowRight, FaShieldHalved, FaBolt, FaRoute } from 'react-icons/fa6'
import { GiDeliveryDrone } from 'react-icons/gi'
import { HiCpuChip } from 'react-icons/hi2'
import PageHeader from '../components/PageHeader.jsx'
import { benefits } from '../data/mockData.js'

const benefitIcons = [
  <FaBolt key="fast" />,
  <FaRoute key="cost" />,
  <HiCpuChip key="ai" />,
  <FaShieldHalved key="route" />,
]

const stats = [
  { value: '99.4%', label: 'Uptime' },
  { value: '< 14min', label: 'Avg Delivery' },
  { value: '500+', label: 'Daily Deliveries' },
]

function LandingPage() {
  const navigate = useNavigate()

  return (
    <Stack spacing={3}>
      <Box className="reveal-up">
        <PageHeader
          title="HiveDeliver - AI Swarm Drone Delivery"
          subtitle="Autonomous last-mile delivery powered by intelligent drone swarms."
        />
      </Box>

      {/* Hero Card */}
      <Card className="hover-lift hero-gradient shimmer reveal-up delay-1" sx={{ overflow: 'hidden', borderRadius: 4 }}>
        <CardContent sx={{ p: { xs: 3, md: 4.5 }, position: 'relative' }}>
          <Grid container spacing={3} alignItems="center">
            <Grid size={{ xs: 12, md: 7 }}>
              <Chip
                label="AI-Powered Logistics"
                size="small"
                sx={{
                  mb: 2,
                  bgcolor: 'rgba(255,255,255,0.15)',
                  color: 'inherit',
                  fontWeight: 700,
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  letterSpacing: '0.05em',
                  fontSize: '0.7rem',
                }}
              />
              <Typography variant="h3" sx={{ mb: 1.5, lineHeight: 1.1, fontSize: { xs: '1.8rem', md: '2.6rem' } }}>
                Intelligent Drone Swarms for Last-Mile Delivery
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 3, maxWidth: 560, opacity: 0.85, lineHeight: 1.7, fontSize: '1.02rem' }}
              >
                Our AI-powered swarm coordinates autonomous drones to deliver packages faster,
                cheaper, and smarter — optimized for SMEs across urban and rural areas.
              </Typography>

              <Stack direction="row" spacing={1.5} flexWrap="wrap">
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<FaArrowRight />}
                  onClick={() => navigate('/dashboard')}
                  sx={{
                    px: 3.5,
                    py: 1.3,
                    textTransform: 'none',
                    fontWeight: 700,
                    borderRadius: 99,
                    bgcolor: '#ffffff',
                    color: '#0f766e',
                    fontSize: '0.95rem',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    '&:hover': {
                      bgcolor: '#f0fdfa',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Open Dashboard
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/map')}
                  sx={{
                    px: 3,
                    py: 1.3,
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: 99,
                    borderColor: 'rgba(255,255,255,0.4)',
                    color: 'inherit',
                    fontSize: '0.95rem',
                    '&:hover': {
                      borderColor: 'rgba(255,255,255,0.7)',
                      bgcolor: 'rgba(255,255,255,0.08)',
                    },
                  }}
                >
                  Live Map
                </Button>
              </Stack>

              {/* Stats Row */}
              <Stack direction="row" spacing={2} sx={{ mt: 3.5 }}>
                {stats.map((stat) => (
                  <Box
                    key={stat.label}
                    sx={{
                      px: 2.2,
                      py: 1.2,
                      borderRadius: 3,
                      bgcolor: 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      backdropFilter: 'blur(8px)',
                      textAlign: 'center',
                      minWidth: 90,
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.75 }}>
                      {stat.label}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
              <Box className="drone-illustration">
                <Stack direction="row" spacing={1.5} justifyContent="space-between" sx={{ mb: 1.5 }}>
                  <Box className="node-card">
                    <FaWarehouse style={{ fontSize: 26 }} />
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>Warehouse</Typography>
                  </Box>
                  <Box className="node-card floating">
                    <GiDeliveryDrone style={{ fontSize: 28 }} />
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>Drone Swarm</Typography>
                  </Box>
                  <Box className="node-card">
                    <FaBoxOpen style={{ fontSize: 26 }} />
                    <Typography variant="caption" sx={{ fontWeight: 600 }}>Packages</Typography>
                  </Box>
                </Stack>
                <Typography variant="body2" sx={{ opacity: 0.75, textAlign: 'center', mt: 1 }}>
                  Drone swarms coordinate routes from warehouse to SME destinations in real time.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Benefits Section */}
      <Box className="reveal-up delay-3">
        <Typography variant="h5" sx={{ mb: 2 }}>
          Why <span className="gradient-text">HiveDeliver</span>?
        </Typography>
        <Grid container spacing={1.5}>
          {benefits.map((benefit, i) => (
            <Grid key={benefit.title} size={{ xs: 12, sm: 6 }}>
              <Card
                className={`hover-lift glow-card reveal-up delay-${i + 2}`}
                sx={{ height: '100%', borderRadius: 3 }}
              >
                <CardContent sx={{ p: 2.5 }}>
                  <Box className="metric-icon-bg" sx={{ mb: 1.5 }}>
                    {benefitIcons[i]}
                  </Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.6 }}>
                    {benefit.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
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
