import {
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import PageHeader from '../components/PageHeader.jsx'
import { drones } from '../data/mockData.js'

const paletteByDroneStatus = {
  Idle: '#0f766e',
  Delivering: '#0ea5e9',
  Charging: '#f97316',
}

function FleetPage() {
  return (
    <>
      <PageHeader
        title="Drone Fleet Management"
        subtitle="Track battery levels, status, and location across all active drones."
      />

      <TableContainer component={Paper} className="hover-lift" sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Drone ID</TableCell>
              <TableCell>Battery Level</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Current Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {drones.map((drone) => (
              <TableRow key={drone.droneId} hover>
                <TableCell>
                  <Typography fontWeight={600}>{drone.droneId}</Typography>
                </TableCell>
                <TableCell sx={{ minWidth: 180 }}>
                  <Typography variant="body2" sx={{ mb: 0.4 }}>
                    {drone.batteryLevel}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={drone.batteryLevel}
                    sx={{
                      height: 8,
                      borderRadius: 99,
                      bgcolor: '#e2e8f0',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: paletteByDroneStatus[drone.status],
                      },
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 700,
                      color: paletteByDroneStatus[drone.status],
                    }}
                  >
                    {drone.status}
                  </Typography>
                </TableCell>
                <TableCell>{drone.currentLocation}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default FleetPage
