import { Card, CardContent, Typography } from '@mui/material'

function SwarmNetworkMini() {
  return (
    <Card className="hover-lift" sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 1.4 }}>
          Swarm Communication Mesh
        </Typography>
        <svg viewBox="0 0 360 210" width="100%" height="210" role="img" aria-label="Drone mesh diagram">
          <defs>
            <linearGradient id="swarmLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#14b8a6" />
            </linearGradient>
          </defs>

          <line x1="180" y1="34" x2="70" y2="92" stroke="url(#swarmLine)" strokeWidth="2" />
          <line x1="180" y1="34" x2="290" y2="90" stroke="url(#swarmLine)" strokeWidth="2" />
          <line x1="70" y1="92" x2="76" y2="172" stroke="url(#swarmLine)" strokeWidth="2" />
          <line x1="290" y1="90" x2="286" y2="172" stroke="url(#swarmLine)" strokeWidth="2" />
          <line x1="76" y1="172" x2="180" y2="136" stroke="url(#swarmLine)" strokeWidth="2" />
          <line x1="286" y1="172" x2="180" y2="136" stroke="url(#swarmLine)" strokeWidth="2" />

          <circle className="pulse-dot" cx="180" cy="34" r="14" fill="#0f766e" />
          <circle className="pulse-dot" cx="70" cy="92" r="12" fill="#0ea5e9" />
          <circle className="pulse-dot" cx="290" cy="90" r="12" fill="#f97316" />
          <circle className="pulse-dot" cx="180" cy="136" r="13" fill="#0891b2" />
          <circle className="pulse-dot" cx="76" cy="172" r="11" fill="#22c55e" />
          <circle className="pulse-dot" cx="286" cy="172" r="11" fill="#14b8a6" />

          <text x="180" y="39" textAnchor="middle" fontSize="10" fill="#ffffff">
            AI
          </text>
          <text x="70" y="96" textAnchor="middle" fontSize="9" fill="#ffffff">
            H1
          </text>
          <text x="290" y="94" textAnchor="middle" fontSize="9" fill="#ffffff">
            H2
          </text>
          <text x="180" y="140" textAnchor="middle" fontSize="9" fill="#ffffff">
            H3
          </text>
          <text x="76" y="176" textAnchor="middle" fontSize="9" fill="#ffffff">
            H4
          </text>
          <text x="286" y="176" textAnchor="middle" fontSize="9" fill="#ffffff">
            H5
          </text>
        </svg>
      </CardContent>
    </Card>
  )
}

export default SwarmNetworkMini
