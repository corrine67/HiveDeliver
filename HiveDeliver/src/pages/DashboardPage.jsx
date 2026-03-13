import { useEffect, useState } from 'react'
import { Grid, Stack, Typography, Box } from '@mui/material'
import { FaBoxesStacked, FaClock } from 'react-icons/fa6'
import { HiCheckBadge } from 'react-icons/hi2'
import { GiDeliveryDrone } from 'react-icons/gi'
import MetricCard from '../components/MetricCard.jsx'
import PageHeader from '../components/PageHeader.jsx'
import DeliveryTable from '../components/DeliveryTable.jsx'
import { deliveries, keyMetrics } from '../data/mockData.js'

const metricIcons = [
  <FaBoxesStacked key="deliveries" />,
  <GiDeliveryDrone key="drones" />,
  <HiCheckBadge key="done" />,
  <FaClock key="avg" />,
]

function nudge(value, max, min = 0) {
  const delta = Math.floor(Math.random() * 3) - 1
  return Math.min(max, Math.max(min, value + delta))
}

function DashboardPage() {
  const [metrics, setMetrics] = useState(keyMetrics)

  useEffect(() => {
    const timer = setInterval(() => {
      setMetrics((prev) =>
        prev.map((m, i) => {
          if (i === 0) return { ...m, value: nudge(m.value, 40, 10) }
          if (i === 1) return { ...m, value: nudge(m.value, 25, 5) }
          if (i === 2) return { ...m, value: nudge(m.value, 300, 150) }
          return m
        }),
      )
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <Stack spacing={2.5}>
      <Box className="reveal-up">
        <PageHeader
          title="Delivery Dashboard"
          subtitle="Monitor active operations, delivery flow, and drone assignment in one place."
        />
      </Box>

      <Grid container spacing={1.5}>
        {metrics.map((metric, index) => (
          <Grid key={metric.label} size={{ xs: 12, sm: 6, lg: 3 }}>
            <Box className={`reveal-up delay-${index + 1}`}>
              <MetricCard
                title={metric.label}
                value={metric.value}
                trend={metric.trend}
                icon={metricIcons[index]}
              />
            </Box>
          </Grid>
        ))}
      </Grid>

      <Box className="reveal-up delay-5">
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>
          Delivery Table
        </Typography>
        <DeliveryTable rows={deliveries} />
      </Box>
    </Stack>
  )
}

export default DashboardPage
