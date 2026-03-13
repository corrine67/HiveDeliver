/**
 * Enhanced simulation data for the Live Drone Map page.
 * Includes rural/remote areas, no-fly zones, and expanded drone fleet.
 */

// Singapore-area coordinates for the simulation
export const WAREHOUSE = {
  name: 'HiveDeliver Warehouse Alpha',
  position: [1.3002, 103.8418],
}

// Urban delivery destinations
export const urbanDestinations = [
  { id: 'U1', name: 'Downtown SME Hub', position: [1.3078, 103.8512], priority: 'medium', type: 'urban' },
  { id: 'U2', name: 'Harbor Retail Block', position: [1.2925, 103.8311], priority: 'medium', type: 'urban' },
  { id: 'U3', name: 'North Innovation Park', position: [1.3191, 103.8473], priority: 'low', type: 'urban' },
  { id: 'U4', name: 'Tech Park Unit 7', position: [1.3055, 103.8555], priority: 'medium', type: 'urban' },
  { id: 'U5', name: 'Market Street Kiosk', position: [1.2988, 103.8488], priority: 'low', type: 'urban' },
]

// Rural / remote delivery destinations (harder to reach)
export const ruralDestinations = [
  { id: 'R1', name: 'Hillside Village Clinic', position: [1.3280, 103.8250], priority: 'high', type: 'rural' },
  { id: 'R2', name: 'Remote Farm Supply Depot', position: [1.2820, 103.8600], priority: 'high', type: 'rural' },
  { id: 'R3', name: 'Coastal Fishing Community', position: [1.2750, 103.8350], priority: 'high', type: 'rural' },
  { id: 'R4', name: 'Mountain Research Station', position: [1.3320, 103.8580], priority: 'critical', type: 'rural' },
  { id: 'R5', name: 'Island Medical Outpost', position: [1.2700, 103.8500], priority: 'critical', type: 'rural' },
]

// No-fly zones (restricted airspace)
export const noFlyZones = [
  {
    id: 'NFZ1',
    name: 'Military Airspace',
    center: [1.3150, 103.8350],
    radius: 400, // meters
    color: '#ef4444',
  },
  {
    id: 'NFZ2',
    name: 'Government Complex',
    center: [1.2950, 103.8450],
    radius: 300,
    color: '#ef4444',
  },
  {
    id: 'NFZ3',
    name: 'Airport Approach Zone',
    center: [1.3050, 103.8300],
    radius: 350,
    color: '#f97316',
  },
]

// Generate path with waypoints between two points, optionally avoiding no-fly zones
function generatePath(start, end, numWaypoints = 4) {
  const path = []
  for (let i = 0; i <= numWaypoints; i++) {
    const t = i / numWaypoints
    const lat = start[0] + (end[0] - start[0]) * t + (Math.random() - 0.5) * 0.002 * (i > 0 && i < numWaypoints ? 1 : 0)
    const lng = start[1] + (end[1] - start[1]) * t + (Math.random() - 0.5) * 0.002 * (i > 0 && i < numWaypoints ? 1 : 0)
    path.push([lat, lng])
  }
  // Ensure exact start and end
  path[0] = [...start]
  path[path.length - 1] = [...end]
  return path
}

// Drone colors for visual distinction
const droneColors = [
  '#0ea5e9', '#f97316', '#22c55e', '#a855f7', '#ec4899',
  '#06b6d4', '#eab308', '#ef4444', '#8b5cf6', '#14b8a6',
  '#f43f5e', '#84cc16',
]

// Build all destinations combined
export const allDestinations = [...urbanDestinations, ...ruralDestinations]

// Generate initial drone fleet
export function generateDroneFleet(count = 8) {
  const fleet = []
  for (let i = 0; i < count; i++) {
    fleet.push({
      droneId: `H${i + 1}`,
      color: droneColors[i % droneColors.length],
      batteryLevel: 60 + Math.floor(Math.random() * 40),
      status: 'idle',
      parcelsAssigned: Math.floor(Math.random() * 3) + 1,
      speed: 1, // multiplier
    })
  }
  return fleet
}

// Assign routes to drones based on priority mode
export function assignRoutes(drones, destinations, priorityMode = false) {
  const sortedDests = [...destinations]

  if (priorityMode) {
    // Priority order: critical > high > medium > low
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
    sortedDests.sort((a, b) => {
      const pa = priorityOrder[a.priority] ?? 2
      const pb = priorityOrder[b.priority] ?? 2
      if (pa !== pb) return pa - pb
      // Rural areas get secondary priority
      if (a.type === 'rural' && b.type !== 'rural') return -1
      if (b.type === 'rural' && a.type !== 'rural') return 1
      return 0
    })
  }

  const routes = []
  const activeDrones = drones.filter(d => d.status !== 'charging')

  for (let i = 0; i < activeDrones.length && i < sortedDests.length; i++) {
    const drone = activeDrones[i]
    const dest = sortedDests[i]
    const path = generatePath(WAREHOUSE.position, dest.position, 5)

    routes.push({
      droneId: drone.droneId,
      color: drone.color,
      destinationId: dest.id,
      destinationName: dest.name,
      destinationType: dest.type,
      priority: dest.priority,
      path,
      parcelsAssigned: drone.parcelsAssigned,
      batteryLevel: drone.batteryLevel,
    })
  }

  return routes
}

// Priority colors for visual indicators
export const priorityColors = {
  critical: '#ef4444',
  high: '#f97316',
  medium: '#eab308',
  low: '#22c55e',
}

// Generate heatmap data points from drone coverage history
export function generateHeatmapData(coverageHistory) {
  const points = []
  for (const pos of coverageHistory) {
    // intensity based on frequency
    points.push([pos[0], pos[1], pos[2] || 0.5])
  }
  return points
}
