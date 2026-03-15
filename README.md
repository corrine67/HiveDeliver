# HiveDeliver

HiveDeliver is a frontend simulation of an AI-powered swarm drone delivery platform for SME last-mile logistics.

The app demonstrates decentralized swarm coordination, adaptive routing behavior, and real-time operational visibility using mock data.

## Highlights

- Authenticated app shell with role-aware navigation
- Landing, auth, operations, and analytics pages
- Multi-language UI via react-i18next (`en`, `ms`, `ta`, `zh`)
- Dark/light mode support
- Rich Live Drone Map with simulation controls

## Live Drone Map Features

- Warehouse marker, destination markers, and active drone markers
- Route simulation with no-fly zone detours
- Weather indicators and weather-aware route styling
- Drone-to-drone communication mesh (nearby link lines)
- Animated communication signals to visualize network traffic
- Swarm adaptive alerts panel (moved out of map canvas)
- Right-rail compact legend and priority context cards
- Swarm Coordination Status panel below the map
- Optional heatmap overlay from simulated coverage history

## Main Pages

- Public landing (`/`)
- Login (`/login`) and sign-up (`/signup`, alias `/register`)
- Home (`/home`)
- Delivery Dashboard (`/dashboard`)
- Live Drone Map (`/map`)
- Create Delivery Order (`/order`)
- Delivery History (`/history`)
- Saved Addresses (`/addresses`)
- Notifications (`/notifications`)
- Swarm Intelligence (`/intelligence`)
- Analytics (`/analytics`)
- Fleet Management (`/fleet`)

## Tech Stack

- React + Vite
- Material UI
- React Router
- React Leaflet + Leaflet
- Recharts
- React Icons

## Folder Layout

Frontend app root is nested:

```text
HiveDeliver/
	src/
		components/
		contexts/
		data/
		hooks/
		i18n/
		pages/
```

## Getting Started

1. Install dependencies

```bash
cd HiveDeliver
npm install
```

2. Start development server

```bash
npm run dev -- --host
```

3. Build for production

```bash
npm run build
```

4. Lint

```bash
npm run lint
```

## Notes

- This is a frontend-only demo; all data is mocked.
- Simulation behavior is timer-driven and deterministic enough for UI demos.
- If the default port is occupied, Vite may move from `5173` to another port such as `5174`.