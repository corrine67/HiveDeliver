import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { FaLocationDot, FaPlus } from 'react-icons/fa6'
import { MdDeleteOutline, MdEdit } from 'react-icons/md'
import PageHeader from '../components/PageHeader.jsx'
import { savedAddressesInitial } from '../data/clientFeaturesData.js'

const emptyForm = {
  label: '',
  name: '',
  phone: '',
  address: '',
}

function SavedAddresses() {
  const { t } = useTranslation()
  const [addresses, setAddresses] = useState(savedAddressesInitial)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(emptyForm)

  const isEditing = useMemo(() => Boolean(editingId), [editingId])

  const handleAddClick = () => {
    setEditingId(null)
    setForm(emptyForm)
    setDialogOpen(true)
  }

  const handleEditClick = (item) => {
    setEditingId(item.id)
    setForm({
      label: item.label,
      name: item.name,
      phone: item.phone,
      address: item.address,
    })
    setDialogOpen(true)
  }

  const handleDelete = (id) => {
    setAddresses((prev) => prev.filter((item) => item.id !== id))
  }

  const handleSave = () => {
    if (!form.label || !form.name || !form.phone || !form.address) {
      return
    }

    if (editingId) {
      setAddresses((prev) => prev.map((item) => (item.id === editingId ? { ...item, ...form } : item)))
    } else {
      const id = `ADDR-${Date.now()}`
      setAddresses((prev) => [...prev, { id, ...form }])
    }

    setDialogOpen(false)
    setEditingId(null)
    setForm(emptyForm)
  }

  const handleClose = () => {
    setDialogOpen(false)
    setEditingId(null)
    setForm(emptyForm)
  }

  const updateField = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  return (
    <Stack spacing={2.5}>
      <Box className="reveal-up">
        <PageHeader
          title={t('addresses.title')}
          subtitle={t('addresses.subtitle')}
        />
      </Box>

      <Box className="reveal-up delay-1">
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" sx={{ mb: 1.5 }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
            {t('addresses.totalSaved', { count: addresses.length })}
          </Typography>
          <Button
            variant="contained"
            startIcon={<FaPlus />}
            onClick={handleAddClick}
            sx={{
              textTransform: 'none',
              borderRadius: 99,
              px: 2.2,
              fontWeight: 700,
              background: 'linear-gradient(135deg, #0f766e, #14b8a6)',
            }}
          >
            {t('addresses.addNew')}
          </Button>
        </Stack>

        <Grid container spacing={1.5}>
          {addresses.map((item, index) => (
            <Grid key={item.id} size={{ xs: 12, md: 6, xl: 4 }}>
              <Box className={`reveal-up delay-${Math.min(index + 2, 5)}`}>
                <Card className="hover-lift glow-card" sx={{ borderRadius: 3, height: '100%' }}>
                  <CardContent sx={{ p: 2.2 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <FaLocationDot color="#14b8a6" />
                        <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                          {item.label}
                        </Typography>
                      </Stack>

                      <Stack direction="row" spacing={0.4}>
                        <IconButton size="small" onClick={() => handleEditClick(item)}>
                          <MdEdit size={18} />
                        </IconButton>
                        <IconButton size="small" color="error" onClick={() => handleDelete(item.id)}>
                          <MdDeleteOutline size={18} />
                        </IconButton>
                      </Stack>
                    </Stack>

                    <Stack spacing={0.7}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>{t('addresses.contactName')}:</strong> {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>{t('addresses.contactPhone')}:</strong> {item.phone}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                        <strong>{t('addresses.fullAddress')}:</strong> {item.address}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Dialog open={dialogOpen} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 700 }}>
          {isEditing ? t('addresses.editAddress') : t('addresses.addAddress')}
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={1.5} sx={{ pt: 0.5 }}>
            <TextField
              label={t('addresses.addressLabel')}
              value={form.label}
              onChange={updateField('label')}
              fullWidth
              required
            />
            <TextField
              label={t('addresses.contactName')}
              value={form.name}
              onChange={updateField('name')}
              fullWidth
              required
            />
            <TextField
              label={t('addresses.contactPhone')}
              value={form.phone}
              onChange={updateField('phone')}
              fullWidth
              required
            />
            <TextField
              label={t('addresses.fullAddress')}
              value={form.address}
              onChange={updateField('address')}
              fullWidth
              required
              multiline
              minRows={3}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 1.5 }}>
          <Button onClick={handleClose}>{t('addresses.cancel')}</Button>
          <Button variant="contained" onClick={handleSave}>
            {isEditing ? t('addresses.saveChanges') : t('addresses.saveAddress')}
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  )
}

export default SavedAddresses
