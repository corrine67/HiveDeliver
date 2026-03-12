import { Card, CardContent, Grid, Stack, Typography } from '@mui/material'
import { FaLocationDot, FaWarehouse } from 'react-icons/fa6'
import { GiDeliveryDrone } from 'react-icons/gi'
import PageHeader from '../components/PageHeader.jsx'
import DroneMapView from '../components/DroneMapView.jsx'
import { mapData } from '../data/mockData.js'

function LiveMapPage() {
  return (
    <Stack spacing={2}>
      <PageHeader
        title="Live Drone Map"
        subtitle="Visualize warehouse dispatch, active drones, and destination routes in real time."
      />

      <Grid container spacing={1.2}>
        <Grid size={{ xs: 12, md: 8 }}>
          <DroneMapView mapData={mapData} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={1.2}>
            <Card className="hover-lift">
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                  Map Legend
                </Typography>
                <div className="legend-row">
                  <span className="legend-icon legend-warehouse">
                    <FaWarehouse />
                  </span>
                  <Typography variant="body2" color="text.primary">Warehouse marker</Typography>
                </div>
                <div className="legend-row">
                  <span className="legend-icon legend-drone">
                    <GiDeliveryDrone />
                  </span>
                  <Typography variant="body2" color="text.primary">Drone marker</Typography>
                </div>
                <div className="legend-row">
                  <span className="legend-icon legend-point">
                    <FaLocationDot />
                  </span>
                  <Typography variant="body2" color="text.primary">Delivery destination marker</Typography>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                  Coordination Snapshot
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  The AI engine staggers departures and path vectors to reduce overlap risk and avoid
                  mid-route conflicts.
                </Typography>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  )
}

export default LiveMapPage
