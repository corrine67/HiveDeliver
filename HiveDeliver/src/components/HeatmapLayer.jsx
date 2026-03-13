import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet.heat'

/**
 * React-Leaflet component that renders a heatmap layer.
 * Points format: [[lat, lng, intensity], ...]
 */
function HeatmapLayer({ points, options = {} }) {
  const map = useMap()

  useEffect(() => {
    if (!points || points.length === 0) return

    const defaultOptions = {
      radius: 25,
      blur: 15,
      maxZoom: 17,
      max: 1.0,
      gradient: {
        0.0: '#00ff00',   // green = high coverage
        0.3: '#7fff00',
        0.5: '#ffff00',   // yellow = medium
        0.7: '#ff7f00',
        1.0: '#ff0000',   // red = low coverage
      },
      ...options,
    }

    const heatLayer = L.heatLayer(points, defaultOptions)
    heatLayer.addTo(map)

    return () => {
      map.removeLayer(heatLayer)
    }
  }, [map, points, options])

  return null
}

export default HeatmapLayer
