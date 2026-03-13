import {
  Box,
  LinearProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
} from '@mui/material'
import PageHeader from '../components/PageHeader.jsx'
import { drones } from '../data/mockData.js'

const statusConfig = {
  Idle: { color: '#22c55e', bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.2)', barColor: '#22c55e' },
  Delivering: { color: '#0ea5e9', bg: 'rgba(14,165,233,0.1)', border: 'rgba(14,165,233,0.2)', barColor: '#0ea5e9' },
  Charging: { color: '#f97316', bg: 'rgba(249,115,22,0.1)', border: 'rgba(249,115,22,0.2)', barColor: '#f97316' },
}

function FleetPage() {
  return (
    <Stack spacing={2.5}>
      <Box className="reveal-up">
        <PageHeader
          title="Drone Fleet Management"
          subtitle="Track battery levels, status, and location across all active drones."
        />
      </Box>

      <Box className="reveal-up delay-1">
        <TableContainer
          component={Paper}
          className="hover-lift"
          sx={{ borderRadius: 3, overflow: 'hidden' }}
        >
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
              {drones.map((drone) => {
                const config = statusConfig[drone.status] || statusConfig.Idle
                return (
                  <TableRow
                    key={drone.droneId}
                    hover
                    sx={{
                      transition: 'all 0.2s ease',
                      '&:hover': { bgcolor: 'rgba(20,184,166,0.03)' },
                    }}
                  >
                    <TableCell>
                      <Box
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 1,
                          px: 1.2,
                          py: 0.3,
                          borderRadius: 2,
                          bgcolor: 'rgba(14,165,233,0.06)',
                          border: '1px solid rgba(14,165,233,0.1)',
                        }}
                      >
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 800, fontFamily: 'monospace', fontSize: '0.85rem' }}
                        >
                          {drone.droneId}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ minWidth: 200 }}>
                      <Stack spacing={0.5}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Typography variant="caption" sx={{ fontWeight: 700, fontSize: '0.78rem' }}>
                            {drone.batteryLevel}%
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              color: drone.batteryLevel > 70 ? '#22c55e' : drone.batteryLevel > 40 ? '#eab308' : '#ef4444',
                              fontWeight: 600,
                              fontSize: '0.68rem',
                            }}
                          >
                            {drone.batteryLevel > 70 ? 'Good' : drone.batteryLevel > 40 ? 'Medium' : 'Low'}
                          </Typography>
                        </Stack>
                        <LinearProgress
                          variant="determinate"
                          value={drone.batteryLevel}
                          sx={{
                            height: 8,
                            borderRadius: 99,
                            bgcolor: 'rgba(0,0,0,0.06)',
                            '& .MuiLinearProgress-bar': {
                              borderRadius: 99,
                              background: `linear-gradient(90deg, ${config.barColor}, ${config.barColor}dd)`,
                              boxShadow: `0 0 8px ${config.barColor}40`,
                            },
                          }}
                        />
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={drone.status}
                        size="small"
                        icon={
                          <Box
                            sx={{
                              width: 7,
                              height: 7,
                              borderRadius: '50%',
                              bgcolor: config.color,
                              ml: 0.8,
                              ...(drone.status === 'Delivering' && {
                                animation: 'livePulse 2s ease-in-out infinite',
                              }),
                            }}
                          />
                        }
                        sx={{
                          bgcolor: config.bg,
                          color: config.color,
                          fontWeight: 700,
                          fontSize: '0.72rem',
                          border: `1px solid ${config.border}`,
                          '& .MuiChip-icon': { mr: -0.3 },
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {drone.currentLocation}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Stack>
  )
}

export default FleetPage
