import { useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import MenuIcon from '@mui/icons-material/Menu'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import Sidebar, { drawerWidth } from './Sidebar.jsx'
import { useColorMode } from '../ColorModeContext.jsx'

const pageTitleByPath = {
  '/home': 'HiveDeliver Platform',
  '/dashboard': 'Delivery Dashboard',
  '/map': 'Live Drone Map',
  '/order': 'Create Delivery Order',
  '/intelligence': 'Hive Swarm Intelligence',
  '/analytics': 'Logistics Analytics',
  '/fleet': 'Drone Fleet Management',
}

function AppShell({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const { mode, toggleColorMode } = useColorMode()
  const isDark = mode === 'dark'

  const pageTitle = useMemo(
    () => pageTitleByPath[location.pathname] || 'HiveDeliver Platform',
    [location.pathname],
  )

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          borderBottom: `1px solid ${isDark ? '#1e3444' : '#d8e4e9'}`,
          ml: { md: `${drawerWidth}px` },
          width: { md: `calc(100% - ${drawerWidth}px)` },
          bgcolor: isDark ? 'rgba(13,27,34,0.88)' : 'rgba(243,247,248,0.86)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <Toolbar>
          {!isDesktop && (
            <IconButton onClick={() => setMobileOpen(true)} edge="start" sx={{ mr: 1 }}>
              <MenuIcon />
            </IconButton>
          )}
          <Stack sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {pageTitle}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Autonomous last-mile delivery for SMEs
            </Typography>
          </Stack>
          <Tooltip title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
            <IconButton onClick={toggleColorMode} color="inherit">
              {isDark ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          <Sidebar onNavigate={() => setMobileOpen(false)} />
        </Drawer>

        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: `1px solid ${isDark ? '#1e3444' : '#d8e4e9'}`,
              background: isDark
                ? 'linear-gradient(180deg, #101f2a, #0c1b26)'
                : 'linear-gradient(180deg, #f7fbfc, #eef7f6)',
            },
          }}
        >
          <Sidebar />
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2, sm: 2.5, md: 3.2 } }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}

export default AppShell
