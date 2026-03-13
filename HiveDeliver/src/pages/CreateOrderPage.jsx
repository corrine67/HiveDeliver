import { useMemo, useState } from 'react'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { FaRocket } from 'react-icons/fa6'
import PageHeader from '../components/PageHeader.jsx'
import { drones } from '../data/mockData.js'

const baseEtaByPriority = {
  Low: 18,
  Medium: 14,
  High: 10,
}

function CreateOrderPage() {
  const [form, setForm] = useState({
    customerName: '',
    deliveryAddress: '',
    parcelWeight: '',
    priority: 'Medium',
  })
  const [result, setResult] = useState('')

  const bestDrone = useMemo(() => {
    const available = drones
      .filter((drone) => drone.status === 'Idle')
      .sort((a, b) => b.batteryLevel - a.batteryLevel)
    return available[0]
  }, [])

  const handleChange = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }))
  }

  const handleAssign = (event) => {
    event.preventDefault()

    if (!bestDrone) {
      setResult('No idle drones are currently available. Please try again in a few minutes.')
      return
    }

    const eta = baseEtaByPriority[form.priority] + Math.floor(Math.random() * 4)
    setResult(`Drone ${bestDrone.droneId} assigned. Estimated delivery time: ${eta} minutes.`)
  }

  return (
    <Stack spacing={2.5}>
      <Box className="reveal-up">
        <PageHeader
          title="Create Delivery Order"
          subtitle="Simulate AI-assisted order assignment based on priority and available drone capacity."
        />
      </Box>

      <Box className="reveal-up delay-1">
        <Card className="hover-lift glow-card" sx={{ borderRadius: 3 }}>
          <CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
            <Grid container spacing={2.5} component="form" onSubmit={handleAssign}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Customer Name"
                  value={form.customerName}
                  onChange={handleChange('customerName')}
                  fullWidth
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2.5,
                      transition: 'all 0.2s ease',
                      '&:hover': { boxShadow: '0 2px 8px rgba(15,118,110,0.08)' },
                      '&.Mui-focused': { boxShadow: '0 0 0 3px rgba(20,184,166,0.1)' },
                    },
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Delivery Address"
                  value={form.deliveryAddress}
                  onChange={handleChange('deliveryAddress')}
                  fullWidth
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2.5,
                      transition: 'all 0.2s ease',
                      '&:hover': { boxShadow: '0 2px 8px rgba(15,118,110,0.08)' },
                      '&.Mui-focused': { boxShadow: '0 0 0 3px rgba(20,184,166,0.1)' },
                    },
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Parcel Weight (kg)"
                  type="number"
                  value={form.parcelWeight}
                  onChange={handleChange('parcelWeight')}
                  inputProps={{ min: 0.1, step: 0.1 }}
                  fullWidth
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2.5,
                      transition: 'all 0.2s ease',
                      '&:hover': { boxShadow: '0 2px 8px rgba(15,118,110,0.08)' },
                      '&.Mui-focused': { boxShadow: '0 0 0 3px rgba(20,184,166,0.1)' },
                    },
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel id="priority-label">Delivery Priority</InputLabel>
                  <Select
                    labelId="priority-label"
                    label="Delivery Priority"
                    value={form.priority}
                    onChange={handleChange('priority')}
                    sx={{ borderRadius: 2.5 }}
                  >
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  startIcon={<FaRocket />}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 700,
                    borderRadius: 99,
                    px: 4,
                    py: 1.3,
                    background: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)',
                    boxShadow: '0 4px 16px rgba(15,118,110,0.3)',
                    fontSize: '0.95rem',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #115e59 0%, #0f766e 100%)',
                      boxShadow: '0 6px 24px rgba(15,118,110,0.4)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Assign Drone
                </Button>
              </Grid>
            </Grid>

            {result && (
              <Alert
                severity="success"
                sx={{
                  mt: 2.5,
                  borderRadius: 2.5,
                  border: '1px solid rgba(34,197,94,0.2)',
                  bgcolor: 'rgba(34,197,94,0.06)',
                  '& .MuiAlert-icon': { color: '#22c55e' },
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 600 }}>{result}</Typography>
              </Alert>
            )}
          </CardContent>
        </Card>
      </Box>
    </Stack>
  )
}

export default CreateOrderPage
