import { Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import PageHeader from '../components/PageHeader.jsx'
import SwarmNetworkMini from '../components/SwarmNetworkMini.jsx'
import { swarmMetrics } from '../data/mockData.js'

const healthFeed = [
  'Collision avoidance model refreshed 20 seconds ago',
  'Drone H2 rerouted to avoid dense no-fly zone corridor',
  'Weather compensation active for westbound fleet lane',
  'Swarm consensus heartbeat stable at 99.4%',
]

function IntelligencePage() {
  return (
    <Stack spacing={2}>
      <PageHeader
        title="Hive Swarm Intelligence Panel"
        subtitle="Observe live AI system status for coordination, safety, and efficiency."
      />

      <Grid container spacing={1.2}>
        {swarmMetrics.map((metric) => (
          <Grid key={metric.label} size={{ xs: 12, sm: 6, lg: 3 }}>
            <Card className="hover-lift" sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.7 }}>
                  {metric.label}
                </Typography>
                <Typography variant="h5">{metric.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={1.2}>
        <Grid size={{ xs: 12, md: 7 }}>
          <SwarmNetworkMini />
        </Grid>
        <Grid size={{ xs: 12, md: 5 }}>
          <Card className="hover-lift" sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1.2 }}>
                AI Health Feed
              </Typography>
              <Stack spacing={1}>
                {healthFeed.map((log) => (
                  <Typography key={log} variant="body2" color="text.secondary" className="status-line">
                    {log}
                  </Typography>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  )
}

export default IntelligencePage
