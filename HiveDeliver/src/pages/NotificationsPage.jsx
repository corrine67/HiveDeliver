import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import { FaCircleCheck, FaTruckFast, FaTriangleExclamation } from 'react-icons/fa6'
import PageHeader from '../components/PageHeader.jsx'
import { notificationsInitial } from '../data/clientFeaturesData.js'

const typeConfig = {
  info: {
    color: '#0ea5e9',
    bg: 'rgba(14,165,233,0.12)',
    icon: <FaTruckFast size={13} />,
  },
  warning: {
    color: '#f97316',
    bg: 'rgba(249,115,22,0.14)',
    icon: <FaTriangleExclamation size={13} />,
  },
  success: {
    color: '#22c55e',
    bg: 'rgba(34,197,94,0.14)',
    icon: <FaCircleCheck size={13} />,
  },
}

function NotificationsPage() {
  const { t } = useTranslation()
  const [notifications, setNotifications] = useState(notificationsInitial)

  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.read).length,
    [notifications],
  )

  const markAllRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })))
  }

  return (
    <Stack spacing={2.5}>
      <Box className="reveal-up">
        <PageHeader
          title={t('notifications.pageTitle')}
          subtitle={t('notifications.pageSubtitle')}
        />
      </Box>

      <Box className="reveal-up delay-1">
        <Card className="hover-lift glow-card" sx={{ borderRadius: 3 }}>
          <CardContent sx={{ p: { xs: 2.2, md: 2.8 } }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} sx={{ mb: 1.6 }}>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                {t('notifications.unreadCount', { count: unreadCount })}
              </Typography>
              <Button variant="outlined" onClick={markAllRead} sx={{ textTransform: 'none', fontWeight: 700 }}>
                {t('notifications.markAllRead')}
              </Button>
            </Stack>

            <Stack spacing={1}>
              {notifications.map((item) => {
                const style = typeConfig[item.type]
                return (
                  <Box
                    key={item.id}
                    sx={{
                      borderRadius: 2.2,
                      px: 1.4,
                      py: 1.2,
                      border: '1px solid',
                      borderColor: 'divider',
                      bgcolor: item.read ? 'transparent' : 'rgba(20,184,166,0.05)',
                    }}
                  >
                    <Stack direction="row" spacing={1.2}>
                      <Chip
                        size="small"
                        icon={style.icon}
                        label=""
                        sx={{
                          minWidth: 28,
                          color: style.color,
                          bgcolor: style.bg,
                          '& .MuiChip-label': { px: 0 },
                        }}
                      />

                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.5 }}>
                          {t(item.messageKey)}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {t(item.timeKey)}
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                )
              })}
            </Stack>

            <Divider sx={{ my: 1.5 }} />
            <Typography variant="caption" color="text.secondary">
              {t('notifications.hint')}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Stack>
  )
}

export default NotificationsPage
