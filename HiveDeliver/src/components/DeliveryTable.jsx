import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import DeliveryStatusChip from './DeliveryStatusChip.jsx'

function DeliveryTable({ rows }) {
  return (
    <TableContainer component={Paper} className="hover-lift" sx={{ borderRadius: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Parcel ID</TableCell>
            <TableCell>Destination</TableCell>
            <TableCell>Assigned Drone</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.parcelId} hover>
              <TableCell>
                <Typography fontWeight={600}>{row.parcelId}</Typography>
              </TableCell>
              <TableCell>{row.destination}</TableCell>
              <TableCell>{row.assignedDrone}</TableCell>
              <TableCell>
                <DeliveryStatusChip status={row.status} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DeliveryTable
