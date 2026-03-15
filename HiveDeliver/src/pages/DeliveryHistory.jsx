import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import { FaClockRotateLeft } from 'react-icons/fa6'
import PageHeader from '../components/PageHeader.jsx'
import { deliveryHistoryRecords } from '../data/clientFeaturesData.js'

const statusPalette = {
  Delivered: { color: '#22c55e', bg: 'rgba(34,197,94,0.14)' },
  Cancelled: { color: '#ef4444', bg: 'rgba(239,68,68,0.14)' },
  Failed: { color: '#f97316', bg: 'rgba(249,115,22,0.14)' },
}

function DeliveryHistory() {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [date, setDate] = useState('')

  const filteredRows = useMemo(() => {
    const normalized = search.trim().toLowerCase()

    return deliveryHistoryRecords.filter((row) => {
      const matchesSearch = !normalized
        || row.id.toLowerCase().includes(normalized)
        || row.address.toLowerCase().includes(normalized)
        || row.drone.toLowerCase().includes(normalized)

      const matchesStatus = status === 'all' || row.status === status
      const matchesDate = !date || row.date === date

      return matchesSearch && matchesStatus && matchesDate
    })
  }, [search, status, date])

  return (
    <Stack spacing={2.5}>
      <Box className="reveal-up">
        <PageHeader
          title={t('history.title')}
          subtitle={t('history.subtitle')}
        />
      </Box>

      <Box className="reveal-up delay-1">
        <Card className="hover-lift glow-card" sx={{ borderRadius: 3 }}>
          <CardContent sx={{ p: { xs: 2.2, md: 2.8 } }}>
            <Grid container spacing={1.5} sx={{ mb: 2.2 }}>
              <Grid size={{ xs: 12, md: 5 }}>
                <TextField
                  fullWidth
                  size="small"
                  label={t('history.searchLabel')}
                  placeholder={t('history.searchPlaceholder')}
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3.5 }}>
                <TextField
                  fullWidth
                  select
                  size="small"
                  label={t('history.statusFilter')}
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                >
                  <MenuItem value="all">{t('history.statusAll')}</MenuItem>
                  <MenuItem value="Delivered">{t('history.delivered')}</MenuItem>
                  <MenuItem value="Cancelled">{t('history.cancelled')}</MenuItem>
                  <MenuItem value="Failed">{t('history.failed')}</MenuItem>
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3.5 }}>
                <TextField
                  fullWidth
                  size="small"
                  label={t('history.dateFilter')}
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>

            <Stack direction="row" alignItems="center" spacing={1.1} sx={{ mb: 1.5 }}>
              <FaClockRotateLeft color="#14b8a6" />
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                {t('history.resultsCount', { count: filteredRows.length })}
              </Typography>
            </Stack>

            <TableContainer>
              <Table size="small" sx={{ minWidth: 720 }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>{t('history.parcelId')}</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>{t('history.destinationAddress')}</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>{t('history.assignedDrone')}</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>{t('history.deliveryDate')}</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>{t('history.deliveryStatus')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRows.map((row) => (
                    <TableRow key={row.id} hover>
                      <TableCell sx={{ fontWeight: 700 }}>{row.id}</TableCell>
                      <TableCell>{row.address}</TableCell>
                      <TableCell>{row.drone}</TableCell>
                      <TableCell>{row.date}</TableCell>
                      <TableCell>
                        <Chip
                          label={t(`history.${row.status.toLowerCase()}`)}
                          size="small"
                          sx={{
                            fontWeight: 700,
                            color: statusPalette[row.status].color,
                            backgroundColor: statusPalette[row.status].bg,
                            border: `1px solid ${statusPalette[row.status].color}55`,
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}

                  {filteredRows.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                        <Typography variant="body2" color="text.secondary">
                          {t('history.noResults')}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
    </Stack>
  )
}

export default DeliveryHistory
