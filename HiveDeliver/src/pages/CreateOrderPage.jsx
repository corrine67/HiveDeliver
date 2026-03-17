import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { FaRocket, FaRobot, FaCheckCircle, FaInfoCircle } from 'react-icons/fa6'
import PageHeader from '../components/PageHeader.jsx'
import { drones } from '../data/mockData.js'

const baseEtaByPriority = {
  Low: 18,
  Medium: 14,
  High: 10,
}

const SWARM_WEIGHT_THRESHOLD = 25.0 // kg

function CreateOrderPage() {
  const { t } = useTranslation()
  const [form, setForm] = useState({
    customerName: '',
    deliveryAddress: '',
    parcelWeight: '',
    priority: 'Medium',
  })
  const [result, setResult] = useState('')
  const [isSwarm, setIsSwarm] = useState(false)

  const availableDrones = useMemo(() => {
    return drones
      .filter((drone) => drone.status === 'Idle')
      .sort((a, b) => b.batteryLevel - a.batteryLevel)
  }, [])

  const handleChange = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }))
  }

  const handleAssign = (event) => {
    event.preventDefault()
    const weight = parseFloat(form.parcelWeight)

    if (weight > SWARM_WEIGHT_THRESHOLD) {
      // Swarm Logic: Needs 2 drones
      if (availableDrones.length < 2) {
        setResult(t('order.noDronesAvailable'))
        setIsSwarm(false)
        return
      }

      const drone1 = availableDrones[0]
      const drone2 = availableDrones[1]
      const eta = baseEtaByPriority[form.priority] + Math.floor(Math.random() * 3)
      
      setResult(t('order.swarmAssigned', { 
        drone1: drone1.droneId, 
        drone2: drone2.droneId, 
        eta 
      }))
      setIsSwarm(true)
    } else {
      // Standard Logic: Needs 1 drone
      if (availableDrones.length < 1) {
        setResult(t('order.noDronesAvailable'))
        setIsSwarm(false)
        return
      }

      const bestDrone = availableDrones[0]
      const eta = baseEtaByPriority[form.priority] + Math.floor(Math.random() * 4)
      setResult(t('order.droneAssigned', { droneId: bestDrone.droneId, eta }))
      setIsSwarm(false)
    }
  }

  const textFieldSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      border: '1.5px solid rgba(20,184,166,0.2)',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderColor: 'rgba(20,184,166,0.4)',
        boxShadow: '0 4px 12px rgba(20,184,166,0.12)',
      },
      '&.Mui-focused': {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderColor: 'rgba(20,184,166,0.6)',
        boxShadow: '0 0 0 3px rgba(20,184,166,0.2)',
      },
    },
    '& .MuiOutlinedInput-input': {
      fontSize: '0.95rem',
      fontWeight: 500,
    },
  }

  const selectSx = {
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    border: '1.5px solid rgba(20,184,166,0.2)',
    '& .MuiOutlinedInput-root': {
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderColor: 'rgba(20,184,166,0.4)',
        boxShadow: '0 4px 12px rgba(20,184,166,0.12)',
      },
      '&.Mui-focused': {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderColor: 'rgba(20,184,166,0.6)',
        boxShadow: '0 0 0 3px rgba(20,184,166,0.2)',
      },
    },
  }

  return (
    <Stack spacing={2.5}>
      <Box className="reveal-up">
        <PageHeader
          title={t('order.title')}
          subtitle={t('order.subtitle')}
        />
      </Box>

      <Box className="reveal-up delay-1">
        <Card 
          className="hover-lift glow-card" 
          sx={{ 
            borderRadius: 3,
            background: 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(240,253,250,0.98) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(20,184,166,0.15)',
            boxShadow: '0 8px 32px rgba(20,184,166,0.12), inset 0 1px 0 rgba(255,255,255,0.6)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <CardContent sx={{ p: 5 }}>
            <Stack component="form" onSubmit={handleAssign} spacing={4}>
              {/* Info Banner */}
              <Box sx={{
                background: 'linear-gradient(135deg, rgba(20,184,166,0.08) 0%, rgba(20,184,166,0.04) 100%)',
                border: '1px solid rgba(20,184,166,0.2)',
                borderRadius: 2,
                p: 2.5,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}>
                <FaInfoCircle style={{ color: '#0f766e', fontSize: '1.2rem', flexShrink: 0 }} />
                <Typography variant="body2" sx={{ color: '#0f766e', fontWeight: 500, fontSize: '0.9rem' }}>
                  Parcels over <strong>25kg</strong> are automatically assigned 2 drones for safe cooperative delivery.
                </Typography>
              </Box>

              {/* Row 1: Customer Name and Delivery Address */}
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0f766e', fontSize: '0.9rem', letterSpacing: '0.3px' }}>
                      {t('order.customerName')} <span style={{ color: '#ef4444' }}>*</span>
                    </Typography>
                    <TextField
                      placeholder="e.g., John Smith"
                      value={form.customerName}
                      onChange={handleChange('customerName')}
                      fullWidth
                      required
                      size="small"
                      variant="outlined"
                      sx={textFieldSx}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0f766e', fontSize: '0.9rem', letterSpacing: '0.3px' }}>
                      {t('order.deliveryAddress')} <span style={{ color: '#ef4444' }}>*</span>
                    </Typography>
                    <TextField
                      placeholder="e.g., 123 Main St, Kuala Lumpur"
                      value={form.deliveryAddress}
                      onChange={handleChange('deliveryAddress')}
                      fullWidth
                      required
                      size="small"
                      variant="outlined"
                      sx={textFieldSx}
                    />
                  </Stack>
                </Grid>
              </Grid>

              {/* Row 2: Parcel Weight and Delivery Priority */}
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0f766e', fontSize: '0.9rem', letterSpacing: '0.3px' }}>
                        {t('order.parcelWeight')} <span style={{ color: '#ef4444' }}>*</span>
                      </Typography>
                      {parseFloat(form.parcelWeight) > SWARM_WEIGHT_THRESHOLD && (
                        <Chip
                          size="small"
                          icon={<FaRobot style={{ fontSize: '0.7rem' }} />}
                          label="Swarm Mode"
                          sx={{
                            bgcolor: 'rgba(59,130,246,0.2)',
                            color: '#1e40af',
                            fontWeight: 600,
                            fontSize: '0.75rem',
                          }}
                        />
                      )}
                    </Box>
                    <TextField
                      placeholder="0.0 kg"
                      type="number"
                      value={form.parcelWeight}
                      onChange={handleChange('parcelWeight')}
                      inputProps={{ min: 0.1, step: 0.1, max: 100 }}
                      fullWidth
                      required
                      size="small"
                      variant="outlined"
                      sx={textFieldSx}
                    />
                    {parseFloat(form.parcelWeight) > SWARM_WEIGHT_THRESHOLD && (
                      <Typography variant="caption" sx={{ color: '#1e40af', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 0.7, mt: 0.5 }}>
                        <FaCheckCircle style={{ fontSize: '0.8rem' }} /> {t('order.heavyWeightAlert')}
                      </Typography>
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0f766e', fontSize: '0.9rem', letterSpacing: '0.3px' }}>
                      {t('order.deliveryPriority')}
                    </Typography>
                    <FormControl fullWidth size="small">
                      <Select
                        value={form.priority}
                        onChange={handleChange('priority')}
                        variant="outlined"
                        sx={selectSx}
                      >
                        <MenuItem value="Low">{t('order.priorityLow')}</MenuItem>
                        <MenuItem value="Medium">{t('order.priorityMedium')}</MenuItem>
                        <MenuItem value="High">{t('order.priorityHigh')}</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                </Grid>
              </Grid>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                startIcon={parseFloat(form.parcelWeight) > SWARM_WEIGHT_THRESHOLD ? <FaRobot /> : <FaRocket />}
                sx={{
                  textTransform: 'none',
                  fontWeight: 700,
                  borderRadius: 2,
                  px: 4,
                  py: 2,
                  fontSize: '1.05rem',
                  letterSpacing: '0.4px',
                  background: parseFloat(form.parcelWeight) > SWARM_WEIGHT_THRESHOLD 
                    ? 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)' 
                    : 'linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)',
                  boxShadow: parseFloat(form.parcelWeight) > SWARM_WEIGHT_THRESHOLD
                    ? '0 6px 20px rgba(59,130,246,0.35)'
                    : '0 6px 20px rgba(13,148,136,0.3)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  marginTop: 1,
                  '&:hover': {
                    background: parseFloat(form.parcelWeight) > SWARM_WEIGHT_THRESHOLD 
                      ? 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)' 
                      : 'linear-gradient(135deg, #0d7a62 0%, #0d9488 100%)',
                    boxShadow: parseFloat(form.parcelWeight) > SWARM_WEIGHT_THRESHOLD
                      ? '0 8px 28px rgba(59,130,246,0.45)'
                      : '0 8px 28px rgba(13,148,136,0.4)',
                    transform: 'translateY(-3px)',
                  },
                  '&:active': {
                    transform: 'translateY(-1px)',
                  },
                }}
              >
                {parseFloat(form.parcelWeight) > SWARM_WEIGHT_THRESHOLD ? '🐝 Assign Drone Fleet' : t('order.assignDrone')}
              </Button>
            </Stack>

            {result && (
              <Alert
                severity={isSwarm ? "info" : "success"}
                icon={isSwarm ? <FaRobot /> : <FaCheckCircle />}
                sx={{
                  mt: 4,
                  borderRadius: 2,
                  border: isSwarm ? '1.5px solid rgba(59,130,246,0.4)' : '1.5px solid rgba(16,185,129,0.4)',
                  bgcolor: isSwarm ? 'rgba(59,130,246,0.1)' : 'rgba(16,185,129,0.1)',
                  '& .MuiAlert-icon': { 
                    color: isSwarm ? '#3b82f6' : '#10b981',
                    fontSize: '1.4rem',
                  },
                  '& .MuiAlert-message': { 
                    fontWeight: 500, 
                    fontSize: '0.95rem',
                    color: isSwarm ? '#1e40af' : '#065f46',
                  },
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