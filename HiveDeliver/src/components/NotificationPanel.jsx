import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Badge,
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import { FaCircleCheck, FaTruckFast, FaTriangleExclamation } from 'react-icons/fa6'
import { notificationsInitial } from '../data/clientFeaturesData.js'

const typeStyles = {
  info: {
    color: '#0ea5e9',
    bg: 'rgba(14,165,233,0.12)',
  },
  warning: {
    color: '#f97316',
    bg: 'rgba(249,115,22,0.13)',
  },
  success: {
    color: '#22c55e',
    bg: 'rgba(34,197,94,0.13)',
  },
}

const typeIcons = {
  info: <FaTruckFast size={13} />,
  warning: <FaTriangleExclamation size={13} />,
  success: <FaCircleCheck size={13} />,
}

function NotificationPanel() {
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState(null)
  const [notifications, setNotifications] = useState(notificationsInitial)

  const open = Boolean(anchorEl)
  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.read).length,
    [notifications],
  )

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((item) => ({ ...item, read: true })))
  }

  return (
    <>
      <Tooltip title={t('notifications.panelTitle')}>
        <IconButton
          onClick={handleOpen}
          sx={{
            border: '1px solid',
            borderColor: open ? 'primary.main' : 'divider',
            borderRadius: 2,
            width: 38,
            height: 38,
            bgcolor: open ? 'rgba(20,184,166,0.08)' : 'transparent',
          }}
        >
          <Badge color="error" badgeContent={unreadCount > 9 ? '9+' : unreadCount} invisible={unreadCount === 0}>
            <NotificationsOutlinedIcon fontSize="small" />
          </Badge>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              width: 340,
              maxHeight: 430,
              borderRadius: 2.8,
              border: '1px solid',
              borderColor: 'divider',
              overflow: 'hidden',
            },
          },
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ px: 1.8, py: 1.2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
            {t('notifications.panelTitle')}
          </Typography>
          <Button size="small" onClick={markAllAsRead} sx={{ textTransform: 'none', fontWeight: 700 }}>
            {t('notifications.markAllRead')}
          </Button>
        </Stack>

        <Divider />

        {notifications.map((item) => (
          <MenuItem
            key={item.id}
            sx={{
              py: 1.2,
              alignItems: 'flex-start',
              opacity: item.read ? 0.75 : 1,
            }}
          >
            <Stack direction="row" spacing={1.2} sx={{ width: '100%' }}>
              <Chip
                size="small"
                icon={typeIcons[item.type]}
                label=""
                sx={{
                  minWidth: 28,
                  '& .MuiChip-label': { px: 0 },
                  color: typeStyles[item.type].color,
                  backgroundColor: typeStyles[item.type].bg,
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
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default NotificationPanel
