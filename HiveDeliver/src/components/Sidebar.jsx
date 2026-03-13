import { NavLink } from 'react-router-dom'
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  Divider,
} from '@mui/material'
import { HiCubeTransparent, HiMap, HiChartBarSquare, HiCpuChip } from 'react-icons/hi2'
import { FaHouse, FaClipboardList } from 'react-icons/fa6'
import { GiDeliveryDrone } from 'react-icons/gi'

export const drawerWidth = 270

const navItems = [
  { label: 'Home', path: '/home', icon: <FaHouse /> },
  { label: 'Delivery Dashboard', path: '/dashboard', icon: <HiCubeTransparent /> },
  { label: 'Live Drone Map', path: '/map', icon: <HiMap /> },
  { label: 'Create Delivery Order', path: '/order', icon: <FaClipboardList /> },
  { label: 'Swarm Intelligence', path: '/intelligence', icon: <HiCpuChip /> },
  { label: 'Analytics', path: '/analytics', icon: <HiChartBarSquare /> },
  { label: 'Fleet Management', path: '/fleet', icon: <GiDeliveryDrone /> },
]

function Sidebar({ onNavigate }) {
  return (
    <Box sx={{ height: '100%', p: 2.5, display: 'flex', flexDirection: 'column' }}>
      {/* Logo */}
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1, px: 0.5 }}>
        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: 2.5,
            background: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)',
            display: 'grid',
            placeItems: 'center',
            color: 'white',
            fontWeight: 800,
            fontSize: '1.1rem',
            boxShadow: '0 6px 20px rgba(15,118,110,0.35)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          H
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)',
            }}
          />
        </Box>
        <Stack spacing={0}>
          <Typography variant="h6" sx={{ lineHeight: 1.1, fontWeight: 800, fontSize: '1.05rem' }}>
            HiveDeliver
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500, letterSpacing: '0.04em' }}>
            AI Swarm Logistics
          </Typography>
        </Stack>
      </Stack>

      <Divider sx={{ my: 1.5, opacity: 0.15 }} />

      {/* Navigation */}
      <List sx={{ p: 0, flex: 1 }}>
        {navItems.map((item) => (
          <ListItemButton
            key={item.path}
            component={NavLink}
            to={item.path}
            onClick={onNavigate}
            sx={{
              borderRadius: 2.5,
              mb: 0.4,
              py: 1,
              px: 1.5,
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                bgcolor: 'rgba(20, 184, 166, 0.06)',
                transform: 'translateX(4px)',
              },
              '&.active': {
                background: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)',
                color: '#ffffff',
                boxShadow: '0 4px 16px rgba(15,118,110,0.3)',
                '& .MuiListItemIcon-root': {
                  color: '#ffffff',
                },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36, color: 'text.secondary', fontSize: '1.1rem' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontWeight: 600,
                fontSize: '0.84rem',
              }}
            />
          </ListItemButton>
        ))}
      </List>

      {/* Footer */}
      <Box
        sx={{
          mt: 'auto',
          pt: 2,
          borderTop: '1px solid',
          borderColor: 'divider',
          opacity: 0.6,
        }}
      >
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.68rem' }}>
          v2.0 Swarm Engine
        </Typography>
      </Box>
    </Box>
  )
}

export default Sidebar
