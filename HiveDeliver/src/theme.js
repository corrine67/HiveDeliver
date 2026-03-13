import { createTheme, alpha } from '@mui/material/styles'

export function createAppTheme(mode) {
  const isDark = mode === 'dark'

  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#0f766e',
        light: '#14b8a6',
        dark: '#115e59',
      },
      secondary: {
        main: '#f97316',
        light: '#fb923c',
        dark: '#ea580c',
      },
      success: { main: '#22c55e' },
      info: { main: '#0ea5e9' },
      warning: { main: '#eab308' },
      error: { main: '#ef4444' },
      ...(isDark
        ? {
            background: { default: '#060e14', paper: '#0c1a24' },
            text: { primary: '#e8f4f8', secondary: '#8ba3b0' },
          }
        : {
            background: { default: '#f0f6f8', paper: '#ffffff' },
            text: { primary: '#0c1824', secondary: '#4a6275' },
          }),
    },
    shape: { borderRadius: 16 },
    typography: {
      fontFamily: ['Outfit', 'Inter', 'Segoe UI', 'sans-serif'].join(','),
      h3: { fontWeight: 800, letterSpacing: '-0.02em' },
      h4: { fontWeight: 700, letterSpacing: '-0.01em' },
      h5: { fontWeight: 700 },
      h6: { fontWeight: 700, letterSpacing: '-0.005em' },
      subtitle1: { fontWeight: 600 },
      body2: { lineHeight: 1.65 },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            background: isDark
              ? 'linear-gradient(135deg, rgba(12,26,36,0.9) 0%, rgba(15,32,44,0.8) 100%)'
              : 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(248,253,255,0.7) 100%)',
            backdropFilter: 'blur(20px) saturate(1.4)',
            border: `1px solid ${isDark ? 'rgba(20,184,166,0.12)' : 'rgba(15,118,110,0.08)'}`,
            boxShadow: isDark
              ? '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)'
              : '0 4px 24px rgba(15,23,42,0.06), inset 0 1px 0 rgba(255,255,255,0.8)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          contained: {
            boxShadow: '0 4px 14px rgba(15,118,110,0.3)',
            fontWeight: 700,
            letterSpacing: '0.01em',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              boxShadow: '0 6px 20px rgba(15,118,110,0.45)',
              transform: 'translateY(-1px)',
            },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            fontWeight: 700,
            textTransform: 'uppercase',
            fontSize: '0.72rem',
            letterSpacing: '0.08em',
            color: isDark ? '#8ba3b0' : '#4a6275',
          },
        },
      },
      MuiLinearProgress: {
        styleOverrides: {
          root: {
            borderRadius: 99,
            height: 8,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 600,
          },
        },
      },
    },
  })
}
