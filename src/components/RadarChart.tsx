const skills = [
  { label: 'React', value: 95 },
  { label: 'TypeScript', value: 88 },
  { label: 'Node.js', value: 85 },
  { label: 'Python', value: 80 },
  { label: 'CSS/Tailwind', value: 92 },
  { label: 'MongoDB', value: 75 },
  { label: 'PostgreSQL', value: 72 },
  { label: 'Docker', value: 65 },
]

function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
  const rad = ((angle - 90) * Math.PI) / 180
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  }
}

function RadarChart() {
  const cx = 200
  const cy = 200
  const maxR = 150
  const n = skills.length

  const axes = skills.map((_, i) => {
    const angle = (360 / n) * i
    const end = polarToCartesian(cx, cy, maxR, angle)
    return { angle, end }
  })

  const rings = [0.25, 0.5, 0.75, 1].map(factor => {
    const r = maxR * factor
    const points = skills.map((_, i) => {
      const angle = (360 / n) * i
      return polarToCartesian(cx, cy, r, angle)
    })
    return points.map(p => `${p.x},${p.y}`).join(' ')
  })

  const dataPoints = skills.map((skill, i) => {
    const angle = (360 / n) * i
    const r = (skill.value / 100) * maxR
    return polarToCartesian(cx, cy, r, angle)
  })
  const polyPoints = dataPoints.map(p => `${p.x},${p.y}`).join(' ')

  return (
    <div className="radar-content">
      <div className="radar-header">
        <span className="prompt">C:\Amrish-OS&gt;</span>
        <span className="command"> radar --skills</span>
      </div>
      <div className="radar-wrapper">
        <svg viewBox="0 0 400 400" className="radar-svg">
          {/* Grid rings */}
          {rings.map((pts, i) => (
            <polygon
              key={i}
              points={pts}
              fill="none"
              stroke="rgba(0, 217, 255, 0.2)"
              strokeWidth="1"
            />
          ))}

          {/* Axis lines */}
          {axes.map((ax, i) => (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={ax.end.x}
              y2={ax.end.y}
              stroke="rgba(0, 217, 255, 0.25)"
              strokeWidth="1"
            />
          ))}

          {/* Data polygon */}
          <polygon
            points={polyPoints}
            fill="rgba(0, 217, 255, 0.15)"
            stroke="#00d9ff"
            strokeWidth="2"
          />

          {/* Data dots */}
          {dataPoints.map((pt, i) => (
            <circle key={i} cx={pt.x} cy={pt.y} r={5} fill="#00ff41" stroke="#00d9ff" strokeWidth="1.5" />
          ))}

          {/* Labels */}
          {axes.map((ax, i) => {
            const labelPt = polarToCartesian(cx, cy, maxR + 22, ax.angle)
            return (
              <text
                key={i}
                x={labelPt.x}
                y={labelPt.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#ffd700"
                fontSize="11"
                fontFamily="'Press Start 2P', cursive"
              >
                {skills[i].label}
              </text>
            )
          })}
        </svg>
      </div>

      {/* Bar legend */}
      <div className="radar-legend">
        {skills.map((skill, i) => (
          <div key={i} className="radar-bar-item">
            <span className="radar-bar-label">{skill.label}</span>
            <div className="radar-bar-track">
              <div
                className="radar-bar-fill"
                style={{ width: `${skill.value}%` }}
              />
            </div>
            <span className="radar-bar-val">{skill.value}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RadarChart
