import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  FormControlLabel,
  Slider,
  Stack,
  Switch,
  Typography,
} from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import SpeedIcon from '@mui/icons-material/Speed'
import MapIcon from '@mui/icons-material/Map'
import LayersIcon from '@mui/icons-material/Layers'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh'
import FlightIcon from '@mui/icons-material/Flight'
import BlockIcon from '@mui/icons-material/Block'

function SimulationControls({
  isRunning,
  onToggleRunning,
  onReset,
  droneCount,
  onDroneCountChange,
  speed,
  onSpeedChange,
  showHeatmap,
  onToggleHeatmap,
  priorityMode,
  onTogglePriority,
  showNoFlyZones,
  onToggleNoFlyZones,
}) {
  return (
    <Card className="hover-lift" sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
          Simulation Controls
        </Typography>

        {/* Playback Controls */}
        <Stack direction="row" spacing={1} sx={{ mb: 2.5 }}>
          <Button
            variant="contained"
            color={isRunning ? 'warning' : 'success'}
            startIcon={isRunning ? <PauseIcon /> : <PlayArrowIcon />}
            onClick={onToggleRunning}
            sx={{ textTransform: 'none', fontWeight: 600, flex: 1 }}
          >
            {isRunning ? 'Pause' : 'Start'}
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<RestartAltIcon />}
            onClick={onReset}
            sx={{ textTransform: 'none', fontWeight: 600, flex: 1 }}
          >
            Reset
          </Button>
        </Stack>

        <Divider sx={{ mb: 2 }} />

        {/* Drone Count Slider */}
        <Box sx={{ mb: 2.5 }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
            <FlightIcon fontSize="small" color="primary" />
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              Number of Drones
            </Typography>
            <Chip
              label={droneCount}
              size="small"
              color="primary"
              sx={{ fontWeight: 700, ml: 'auto' }}
            />
          </Stack>
          <Slider
            value={droneCount}
            onChange={(_, val) => onDroneCountChange(val)}
            min={2}
            max={12}
            step={1}
            marks={[
              { value: 2, label: '2' },
              { value: 6, label: '6' },
              { value: 12, label: '12' },
            ]}
            sx={{ mt: 1 }}
          />
        </Box>

        {/* Speed Slider */}
        <Box sx={{ mb: 2.5 }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
            <SpeedIcon fontSize="small" color="primary" />
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              Delivery Speed
            </Typography>
            <Chip
              label={`${speed}x`}
              size="small"
              color="secondary"
              sx={{ fontWeight: 700, ml: 'auto' }}
            />
          </Stack>
          <Slider
            value={speed}
            onChange={(_, val) => onSpeedChange(val)}
            min={0.5}
            max={5}
            step={0.5}
            marks={[
              { value: 0.5, label: '0.5x' },
              { value: 1, label: '1x' },
              { value: 3, label: '3x' },
              { value: 5, label: '5x' },
            ]}
            sx={{ mt: 1 }}
          />
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Toggle Switches */}
        <Stack spacing={1.5}>
          <FormControlLabel
            control={
              <Switch
                checked={showHeatmap}
                onChange={onToggleHeatmap}
                color="primary"
              />
            }
            label={
              <Stack direction="row" alignItems="center" spacing={1}>
                {showHeatmap ? <LayersIcon fontSize="small" /> : <MapIcon fontSize="small" />}
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {showHeatmap ? 'Heatmap View' : 'Map View'}
                </Typography>
              </Stack>
            }
          />

          <FormControlLabel
            control={
              <Switch
                checked={priorityMode}
                onChange={onTogglePriority}
                color="warning"
              />
            }
            label={
              <Stack direction="row" alignItems="center" spacing={1}>
                <PriorityHighIcon fontSize="small" color={priorityMode ? 'warning' : 'disabled'} />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Priority / Swarm Logic
                </Typography>
              </Stack>
            }
          />

          <FormControlLabel
            control={
              <Switch
                checked={showNoFlyZones}
                onChange={onToggleNoFlyZones}
                color="error"
              />
            }
            label={
              <Stack direction="row" alignItems="center" spacing={1}>
                <BlockIcon fontSize="small" color={showNoFlyZones ? 'error' : 'disabled'} />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  No-Fly Zones
                </Typography>
              </Stack>
            }
          />
        </Stack>

        <Divider sx={{ my: 2 }} />

        {/* Status Info */}
        <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: 'action.hover' }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
            Simulation Status
          </Typography>
          <Stack spacing={0.5} sx={{ mt: 1 }}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">State</Typography>
              <Chip
                label={isRunning ? 'Running' : 'Paused'}
                size="small"
                color={isRunning ? 'success' : 'default'}
                sx={{ fontWeight: 600 }}
              />
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">Active Drones</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{droneCount}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">Mode</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {priorityMode ? 'Priority Routing' : 'Standard'}
              </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">View</Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {showHeatmap ? 'Heatmap' : 'Routes'}
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  )
}

export default SimulationControls
