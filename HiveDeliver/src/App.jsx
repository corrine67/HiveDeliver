import { useMemo, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { ColorModeContext } from './ColorModeContext.jsx'
import { createAppTheme } from './theme.js'
import AppShell from './components/AppShell.jsx'
import LandingPage from './pages/LandingPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import LiveMapPage from './pages/LiveMapPage.jsx'
import CreateOrderPage from './pages/CreateOrderPage.jsx'
import IntelligencePage from './pages/IntelligencePage.jsx'
import AnalyticsPage from './pages/AnalyticsPage.jsx'
import FleetPage from './pages/FleetPage.jsx'

function App() {
  const [mode, setMode] = useState('light')

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
    }),
    [mode],
  )

  const theme = useMemo(() => createAppTheme(mode), [mode])

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppShell>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/map" element={<LiveMapPage />} />
        <Route path="/order" element={<CreateOrderPage />} />
        <Route path="/intelligence" element={<IntelligencePage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/fleet" element={<FleetPage />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </AppShell>
        </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App
