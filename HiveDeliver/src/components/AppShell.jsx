import { useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  Chip,
  ListItemText,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import MenuIcon from '@mui/icons-material/Menu'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import TranslateIcon from '@mui/icons-material/Translate'
import Sidebar, { drawerWidth } from './Sidebar.jsx'
import { useColorMode } from '../ColorModeContext.jsx'
import NotificationPanel from './NotificationPanel.jsx'
import { languages } from '../i18n/i18n.js'
import { useAuth } from '../contexts/AuthContext.jsx'
import { FaUserTie, FaStore } from 'react-icons/fa6'

const pathToKey = {
  '/home': 'home',
  '/dashboard': 'dashboard',
  '/map': 'map',
  '/order': 'order',
  '/history': 'history',
  '/addresses': 'addresses',
  '/notifications': 'notifications',
  '/support': 'support',
  '/intelligence': 'intelligence',
  '/analytics': 'analytics',
  '/fleet': 'fleet',
}

function AppShell({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
  const { mode, toggleColorMode } = useColorMode()
  const isDark = mode === 'dark'
  const { t, i18n } = useTranslation()
  const { user } = useAuth()
  const isManager = user?.role === 'manager' || user?.role === 'admin'

  const pageTitle = useMemo(() => {
    const key = pathToKey[location.pathname] || 'home'
    return t(`pageTitles.${key}`)
  }, [location.pathname, t])

  // Language menu state
  const [langAnchor, setLangAnchor] = useState(null)
  const langMenuOpen = Boolean(langAnchor)

  const handleLangClick = (event) => {
    setLangAnchor(event.currentTarget)
  }
  const handleLangClose = () => {
    setLangAnchor(null)
  }
  const handleLangSelect = (code) => {
    i18n.changeLanguage(code)
    handleLangClose()
  }

  const currentLang = languages.find((l) => l.code === i18n.language) || languages[0]

  return (
    <Box
      className="grid-bg"
      sx={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: 'background.default',
        position: 'relative',
      }}
    >
      {/* App Bar */}
      <AppBar
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          borderBottom: `1px solid ${isDark ? 'rgba(20,184,166,0.1)' : 'rgba(15,118,110,0.06)'}`,
          ml: { md: `${drawerWidth}px` },
          width: { md: `calc(100% - ${drawerWidth}px)` },
          bgcolor: isDark ? 'rgba(6,14,20,0.85)' : 'rgba(240,246,248,0.8)',
          backdropFilter: 'blur(20px) saturate(1.5)',
        }}
      >
        <Toolbar sx={{ gap: 1 }}>
          {!isDesktop && (
            <IconButton onClick={() => setMobileOpen(true)} edge="start" sx={{ mr: 0.5 }}>
              <MenuIcon />
            </IconButton>
          )}
          <Stack sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.05rem' }}>
              {pageTitle}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
              {t('common.subtitle')}
            </Typography>
          </Stack>

          <Chip
            label={t('common.live')}
            size="small"
            sx={{
              bgcolor: 'rgba(34,197,94,0.12)',
              color: '#22c55e',
              fontWeight: 800,
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              height: 24,
              border: '1px solid rgba(34,197,94,0.2)',
              '& .MuiChip-label': { px: 1 },
            }}
            icon={
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  bgcolor: '#22c55e',
                  ml: 1,
                  animation: 'livePulse 2s ease-in-out infinite',
                }}
              />
            }
          />

          {/* Role Badge */}
          <Chip
            icon={
              <Box sx={{ display: 'flex', alignItems: 'center', pl: 0.8 }}>
                {isManager ? <FaUserTie size={11} /> : <FaStore size={11} />}
              </Box>
            }
            label={isManager ? 'Manager' : 'SME User'}
            size="small"
            sx={{
              bgcolor: isManager ? 'rgba(20,184,166,0.12)' : 'rgba(99,102,241,0.12)',
              color: isManager ? '#14b8a6' : '#6366f1',
              fontWeight: 700,
              fontSize: '0.65rem',
              letterSpacing: '0.05em',
              height: 24,
              border: `1px solid ${isManager ? 'rgba(20,184,166,0.3)' : 'rgba(99,102,241,0.3)'}`,
              '& .MuiChip-label': { px: 0.8 },
              '& .MuiChip-icon': { color: isManager ? '#14b8a6' : '#6366f1' },
              display: { xs: 'none', sm: 'flex' },
            }}
          />

          <NotificationPanel />

          {/* Language Selector */}
          <Tooltip title={t('common.language')}>
            <IconButton
              onClick={handleLangClick}
              color="inherit"
              sx={{
                border: '1px solid',
                borderColor: langMenuOpen ? 'primary.main' : 'divider',
                borderRadius: 2,
                height: 38,
                minWidth: 38,
                px: 1,
                gap: 0.5,
                transition: 'all 0.3s ease',
                bgcolor: langMenuOpen ? 'rgba(20,184,166,0.08)' : 'transparent',
                '&:hover': {
                  bgcolor: 'rgba(20,184,166,0.08)',
                },
              }}
            >
              <TranslateIcon fontSize="small" />
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  fontSize: '0.7rem',
                  textTransform: 'uppercase',
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                {currentLang.code}
              </Typography>
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={langAnchor}
            open={langMenuOpen}
            onClose={handleLangClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            slotProps={{
              paper: {
                sx: {
                  mt: 1,
                  minWidth: 180,
                  borderRadius: 2.5,
                  bgcolor: isDark ? 'rgba(10,22,32,0.95)' : 'rgba(255,255,255,0.98)',
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${isDark ? 'rgba(20,184,166,0.12)' : 'rgba(15,118,110,0.08)'}`,
                  boxShadow: isDark
                    ? '0 8px 32px rgba(0,0,0,0.5)'
                    : '0 8px 32px rgba(0,0,0,0.1)',
                },
              },
            }}
          >
            {languages.map((lang) => (
              <MenuItem
                key={lang.code}
                selected={i18n.language === lang.code}
                onClick={() => handleLangSelect(lang.code)}
                sx={{
                  py: 1.2,
                  px: 2,
                  borderRadius: 1.5,
                  mx: 0.5,
                  mb: 0.3,
                  transition: 'all 0.2s ease',
                  ...(i18n.language === lang.code && {
                    bgcolor: isDark ? 'rgba(20,184,166,0.12)' : 'rgba(20,184,166,0.08)',
                    borderLeft: '3px solid',
                    borderColor: 'primary.main',
                  }),
                  '&:hover': {
                    bgcolor: isDark ? 'rgba(20,184,166,0.08)' : 'rgba(20,184,166,0.05)',
                  },
                }}
              >
                <Typography sx={{ fontSize: '1.2rem', mr: 1.5, lineHeight: 1 }}>
                  {lang.flag}
                </Typography>
                <ListItemText
                  primary={lang.label}
                  primaryTypographyProps={{
                    fontWeight: i18n.language === lang.code ? 700 : 500,
                    fontSize: '0.88rem',
                  }}
                />
                {i18n.language === lang.code && (
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      ml: 1,
                    }}
                  />
                )}
              </MenuItem>
            ))}
          </Menu>

          <Tooltip title={isDark ? t('common.switchToLight') : t('common.switchToDark')}>
            <IconButton
              onClick={toggleColorMode}
              color="inherit"
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                width: 38,
                height: 38,
              }}
            >
              {isDark ? <LightModeOutlinedIcon fontSize="small" /> : <DarkModeOutlinedIcon fontSize="small" />}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
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
              borderRight: `1px solid ${isDark ? 'rgba(20,184,166,0.08)' : 'rgba(15,118,110,0.06)'}`,
              background: isDark
                ? 'linear-gradient(180deg, rgba(6,14,20,0.98) 0%, rgba(10,22,32,0.95) 100%)'
                : 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(240,250,248,0.9) 100%)',
              backdropFilter: 'blur(20px)',
            },
          }}
        >
          <Sidebar />
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 2.5, md: 3 },
          maxWidth: '100%',
          overflow: 'hidden',
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}

export default AppShell
