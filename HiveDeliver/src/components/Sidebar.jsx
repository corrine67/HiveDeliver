import { NavLink } from 'react-router-dom'
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import { HiCubeTransparent, HiMap, HiChartBarSquare, HiCpuChip } from 'react-icons/hi2'
import { FaHouse, FaClipboardList } from 'react-icons/fa6'
import { GiDeliveryDrone } from 'react-icons/gi'

export const drawerWidth = 276

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
    <Box sx={{ height: '100%', p: 2.2 }}>
      <Stack direction="row" spacing={1.2} alignItems="center" sx={{ mb: 2.2, px: 1 }}>
        <Box
          sx={{
            width: 38,
            height: 38,
            borderRadius: 2,
            background: 'linear-gradient(140deg, #0f766e, #14b8a6)',
            display: 'grid',
            placeItems: 'center',
            color: 'white',
            fontWeight: 700,
            boxShadow: '0 8px 20px rgba(15,118,110,0.35)',
          }}
        >
          H
        </Box>
        <Stack spacing={0}>
          <Typography variant="h6" sx={{ lineHeight: 1.1 }}>
            HiveDeliver
          </Typography>
          <Typography variant="caption" color="text.secondary">
            AI Swarm Logistics
          </Typography>
        </Stack>
      </Stack>

      <List sx={{ p: 0 }}>
        {navItems.map((item) => (
          <ListItemButton
            key={item.path}
            component={NavLink}
            to={item.path}
            onClick={onNavigate}
            sx={{
              borderRadius: 2,
              mb: 0.55,
              '&.active': {
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                '& .MuiListItemIcon-root': {
                  color: 'inherit',
                },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 34, color: 'text.secondary' }}>{item.icon}</ListItemIcon>
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{
                fontWeight: 600,
                fontSize: 14,
              }}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  )
}

export default Sidebar
