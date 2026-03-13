import { Card, CardContent, Typography, Stack, Box, Chip } from '@mui/material'

function SwarmNetworkMini() {
  return (
    <Card className="hover-lift glow-card" sx={{ height: '100%', borderRadius: 3 }}>
      <CardContent sx={{ p: 2.5 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Swarm Communication Mesh
          </Typography>
          <Chip
            label="Connected"
            size="small"
            sx={{
              bgcolor: 'rgba(34,197,94,0.08)',
              color: '#22c55e',
              fontWeight: 700,
              fontSize: '0.65rem',
              border: '1px solid rgba(34,197,94,0.15)',
            }}
          />
        </Stack>
        <svg viewBox="0 0 360 210" width="100%" height="210" role="img" aria-label="Drone mesh diagram">
          <defs>
            <linearGradient id="swarmLine1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.6" />
            </linearGradient>
            <linearGradient id="swarmLine2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0.5" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Connection lines */}
          <line x1="180" y1="34" x2="70" y2="92" stroke="url(#swarmLine1)" strokeWidth="2" strokeDasharray="6 3">
            <animate attributeName="stroke-dashoffset" from="0" to="-18" dur="2s" repeatCount="indefinite" />
          </line>
          <line x1="180" y1="34" x2="290" y2="90" stroke="url(#swarmLine1)" strokeWidth="2" strokeDasharray="6 3">
            <animate attributeName="stroke-dashoffset" from="0" to="-18" dur="2.2s" repeatCount="indefinite" />
          </line>
          <line x1="70" y1="92" x2="76" y2="172" stroke="url(#swarmLine2)" strokeWidth="2" strokeDasharray="6 3">
            <animate attributeName="stroke-dashoffset" from="0" to="-18" dur="1.8s" repeatCount="indefinite" />
          </line>
          <line x1="290" y1="90" x2="286" y2="172" stroke="url(#swarmLine2)" strokeWidth="2" strokeDasharray="6 3">
            <animate attributeName="stroke-dashoffset" from="0" to="-18" dur="2.4s" repeatCount="indefinite" />
          </line>
          <line x1="76" y1="172" x2="180" y2="136" stroke="url(#swarmLine1)" strokeWidth="2" strokeDasharray="6 3">
            <animate attributeName="stroke-dashoffset" from="0" to="-18" dur="2.1s" repeatCount="indefinite" />
          </line>
          <line x1="286" y1="172" x2="180" y2="136" stroke="url(#swarmLine1)" strokeWidth="2" strokeDasharray="6 3">
            <animate attributeName="stroke-dashoffset" from="0" to="-18" dur="1.9s" repeatCount="indefinite" />
          </line>
          {/* Cross connections */}
          <line x1="70" y1="92" x2="286" y2="172" stroke="url(#swarmLine2)" strokeWidth="1" strokeDasharray="4 4" opacity="0.3">
            <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="3s" repeatCount="indefinite" />
          </line>
          <line x1="290" y1="90" x2="76" y2="172" stroke="url(#swarmLine2)" strokeWidth="1" strokeDasharray="4 4" opacity="0.3">
            <animate attributeName="stroke-dashoffset" from="0" to="-16" dur="3.2s" repeatCount="indefinite" />
          </line>

          {/* Nodes with glow */}
          <circle className="pulse-dot" cx="180" cy="34" r="16" fill="#0f766e" filter="url(#glow)" />
          <circle className="pulse-dot" cx="70" cy="92" r="13" fill="#0ea5e9" filter="url(#glow)" />
          <circle className="pulse-dot" cx="290" cy="90" r="13" fill="#f97316" filter="url(#glow)" />
          <circle className="pulse-dot" cx="180" cy="136" r="14" fill="#0891b2" filter="url(#glow)" />
          <circle className="pulse-dot" cx="76" cy="172" r="12" fill="#22c55e" filter="url(#glow)" />
          <circle className="pulse-dot" cx="286" cy="172" r="12" fill="#14b8a6" filter="url(#glow)" />

          {/* Labels */}
          <text x="180" y="39" textAnchor="middle" fontSize="11" fill="#ffffff" fontWeight="700">
            AI
          </text>
          <text x="70" y="97" textAnchor="middle" fontSize="10" fill="#ffffff" fontWeight="700">
            H1
          </text>
          <text x="290" y="95" textAnchor="middle" fontSize="10" fill="#ffffff" fontWeight="700">
            H2
          </text>
          <text x="180" y="141" textAnchor="middle" fontSize="10" fill="#ffffff" fontWeight="700">
            H3
          </text>
          <text x="76" y="177" textAnchor="middle" fontSize="10" fill="#ffffff" fontWeight="700">
            H4
          </text>
          <text x="286" y="177" textAnchor="middle" fontSize="10" fill="#ffffff" fontWeight="700">
            H5
          </text>
        </svg>
      </CardContent>
    </Card>
  )
}

export default SwarmNetworkMini
