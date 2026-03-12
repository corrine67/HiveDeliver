import { useMemo, useState } from 'react'
import {
  Alert,
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
    <Stack spacing={2}>
      <PageHeader
        title="Create Delivery Order"
        subtitle="Simulate AI-assisted order assignment based on priority and available drone capacity."
      />

      <Card className="hover-lift">
        <CardContent>
          <Grid container spacing={2} component="form" onSubmit={handleAssign}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Customer Name"
                value={form.customerName}
                onChange={handleChange('customerName')}
                fullWidth
                required
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Delivery Address"
                value={form.deliveryAddress}
                onChange={handleChange('deliveryAddress')}
                fullWidth
                required
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
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button type="submit" variant="contained" size="large" sx={{ textTransform: 'none' }}>
                Assign Drone
              </Button>
            </Grid>
          </Grid>

          {result && (
            <Alert severity="success" sx={{ mt: 2 }}>
              <Typography variant="body2">{result}</Typography>
            </Alert>
          )}
        </CardContent>
      </Card>
    </Stack>
  )
}

export default CreateOrderPage
