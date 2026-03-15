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

const METERS_PER_DEGREE_LAT = 111320
const NO_FLY_CLEARANCE_METERS = 80
const MAX_DETOUR_INSERTIONS = 12
const DETOUR_RING_SAMPLES = 16
const DETOUR_BUFFER_METERS = 40
export const SWARM_COMMUNICATION_RANGE_METERS = 550

function metersPerDegreeLng(lat) {
  return METERS_PER_DEGREE_LAT * Math.cos((lat * Math.PI) / 180)
}

function toXY(point, refLat) {
  return {
    x: point[1] * metersPerDegreeLng(refLat),
    y: point[0] * METERS_PER_DEGREE_LAT,
  }
}

function toLatLng(point, refLat) {
  return [
    point.y / METERS_PER_DEGREE_LAT,
    point.x / metersPerDegreeLng(refLat),
  ]
}

export function distanceMeters(a, b) {
  const refLat = (a[0] + b[0]) / 2
  const ax = toXY(a, refLat)
  const bx = toXY(b, refLat)
  const dx = bx.x - ax.x
  const dy = bx.y - ax.y
  return Math.hypot(dx, dy)
}

function distanceToSegmentMeters(point, segStart, segEnd) {
  const refLat = (point[0] + segStart[0] + segEnd[0]) / 3
  const p = toXY(point, refLat)
  const a = toXY(segStart, refLat)
  const b = toXY(segEnd, refLat)
  const abx = b.x - a.x
  const aby = b.y - a.y
  const abLenSq = abx * abx + aby * aby

  if (abLenSq === 0) {
    return Math.hypot(p.x - a.x, p.y - a.y)
  }

  const apx = p.x - a.x
  const apy = p.y - a.y
  const t = Math.max(0, Math.min(1, (apx * abx + apy * aby) / abLenSq))
  const closestX = a.x + abx * t
  const closestY = a.y + aby * t
  return Math.hypot(p.x - closestX, p.y - closestY)
}

function segmentHitsZone(segStart, segEnd, zone, clearanceMeters = NO_FLY_CLEARANCE_METERS) {
  const avoidRadius = zone.radius + clearanceMeters
  const distance = distanceToSegmentMeters(zone.center, segStart, segEnd)
  return distance < avoidRadius
}

function findBlockingZone(segStart, segEnd, zones, clearanceMeters = NO_FLY_CLEARANCE_METERS) {
  return zones.find((zone) => segmentHitsZone(segStart, segEnd, zone, clearanceMeters)) || null
}

function buildDetourWaypoint(segStart, segEnd, zone, zones, clearanceMeters = NO_FLY_CLEARANCE_METERS) {
  const refLat = zone.center[0]
  const centerXY = toXY(zone.center, refLat)
  const ringRadius = zone.radius + clearanceMeters + DETOUR_BUFFER_METERS

  const candidates = []
  for (let i = 0; i < DETOUR_RING_SAMPLES; i++) {
    const angle = (i / DETOUR_RING_SAMPLES) * Math.PI * 2
    const pointXY = {
      x: centerXY.x + Math.cos(angle) * ringRadius,
      y: centerXY.y + Math.sin(angle) * ringRadius,
    }
    const waypoint = toLatLng(pointXY, refLat)
    candidates.push(waypoint)
  }

  const scored = candidates.map((waypoint) => {
    const firstZone = findBlockingZone(segStart, waypoint, zones, clearanceMeters)
    const secondZone = findBlockingZone(waypoint, segEnd, zones, clearanceMeters)
    const blockCount = (firstZone ? 1 : 0) + (secondZone ? 1 : 0)
    const length = distanceMeters(segStart, waypoint) + distanceMeters(waypoint, segEnd)
    return { waypoint, blockCount, length }
  })

  scored.sort((left, right) => {
    if (left.blockCount !== right.blockCount) return left.blockCount - right.blockCount
    return left.length - right.length
  })

  return scored[0]?.waypoint || null
}

function buildSafeCorridor(start, end, zones, clearanceMeters = NO_FLY_CLEARANCE_METERS) {
  const corridor = [[...start], [...end]]

  for (let attempt = 0; attempt < MAX_DETOUR_INSERTIONS; attempt++) {
    let inserted = false

    for (let i = 0; i < corridor.length - 1; i++) {
      const segStart = corridor[i]
      const segEnd = corridor[i + 1]
      const blockingZone = findBlockingZone(segStart, segEnd, zones, clearanceMeters)

      if (!blockingZone) continue

      const detour = buildDetourWaypoint(segStart, segEnd, blockingZone, zones, clearanceMeters)
      if (!detour) continue

      corridor.splice(i + 1, 0, detour)
      inserted = true
      break
    }

    if (!inserted) break
  }

  return corridor
}

// Generate path with waypoints between two points while detouring around no-fly zones.
function generatePath(start, end, zones = [], numWaypoints = 6) {
  const corridor = buildSafeCorridor(start, end, zones)
  const path = [[...start]]
  const segmentCount = Math.max(1, corridor.length - 1)
  const stepsPerSegment = Math.max(1, Math.ceil(numWaypoints / segmentCount))

  for (let i = 0; i < corridor.length - 1; i++) {
    const from = corridor[i]
    const to = corridor[i + 1]
    for (let step = 1; step <= stepsPerSegment; step++) {
      const t = step / stepsPerSegment
      const lat = from[0] + (to[0] - from[0]) * t
      const lng = from[1] + (to[1] - from[1]) * t
      path.push([lat, lng])
    }
  }

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

// Location-based weather conditions for each delivery area
export const locationWeatherData = [
  {
    destinationId: 'U1',
    location: 'Downtown SME Hub',
    coordinates: [1.3078, 103.8512],
    windSpeed: '12 km/h',
    rain: 'Light',
    temperature: '29°C',
    flightSafety: 'Safe',
    messageKey: 'map.routeNormalWeather',
  },
  {
    destinationId: 'U2',
    location: 'Harbor Retail Block',
    coordinates: [1.2925, 103.8311],
    windSpeed: '22 km/h',
    rain: 'Moderate',
    temperature: '28°C',
    flightSafety: 'Caution',
    messageKey: 'map.routeAdjustedCaution',
  },
  {
    destinationId: 'U3',
    location: 'North Innovation Park',
    coordinates: [1.3191, 103.8473],
    windSpeed: '15 km/h',
    rain: 'Light',
    temperature: '30°C',
    flightSafety: 'Safe',
    messageKey: 'map.routeNormalWeather',
  },
  {
    destinationId: 'U4',
    location: 'Tech Park Unit 7',
    coordinates: [1.3055, 103.8555],
    windSpeed: '18 km/h',
    rain: 'Light',
    temperature: '29°C',
    flightSafety: 'Safe',
    messageKey: 'map.routeNormalWeather',
  },
  {
    destinationId: 'U5',
    location: 'Market Street Kiosk',
    coordinates: [1.2988, 103.8488],
    windSpeed: '26 km/h',
    rain: 'Moderate',
    temperature: '27°C',
    flightSafety: 'Caution',
    messageKey: 'map.routeAdjustedCaution',
  },
  {
    destinationId: 'R1',
    location: 'Hillside Village Clinic',
    coordinates: [1.3280, 103.8250],
    windSpeed: '20 km/h',
    rain: 'Moderate',
    temperature: '26°C',
    flightSafety: 'Caution',
    messageKey: 'map.routeAdjustedCaution',
  },
  {
    destinationId: 'R2',
    location: 'Remote Farm Supply Depot',
    coordinates: [1.2820, 103.8600],
    windSpeed: '35 km/h',
    rain: 'Heavy',
    temperature: '27°C',
    flightSafety: 'Unsafe',
    messageKey: 'map.routeAdjustedSevere',
  },
  {
    destinationId: 'R3',
    location: 'Coastal Fishing Community',
    coordinates: [1.2750, 103.8350],
    windSpeed: '31 km/h',
    rain: 'Heavy',
    temperature: '26°C',
    flightSafety: 'Unsafe',
    messageKey: 'map.routeAdjustedSevere',
  },
  {
    destinationId: 'R4',
    location: 'Mountain Research Station',
    coordinates: [1.3320, 103.8580],
    windSpeed: '24 km/h',
    rain: 'Moderate',
    temperature: '25°C',
    flightSafety: 'Caution',
    messageKey: 'map.routeAdjustedCaution',
  },
  {
    destinationId: 'R5',
    location: 'Island Medical Outpost',
    coordinates: [1.2700, 103.8500],
    windSpeed: '34 km/h',
    rain: 'Heavy',
    temperature: '25°C',
    flightSafety: 'Unsafe',
    messageKey: 'map.routeAdjustedSevere',
  },
]

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
    const path = generatePath(WAREHOUSE.position, dest.position, noFlyZones, 6)

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
