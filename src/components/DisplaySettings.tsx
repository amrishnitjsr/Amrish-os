import { useState } from 'react'

function DisplaySettings() {
  const [scanlines, setScanlines] = useState(true)
  const [crtGlow, setCrtGlow] = useState(true)
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)
  const [pixelFont, setPixelFont] = useState(true)
  const [colorTheme, setColorTheme] = useState<'green' | 'cyan' | 'amber'>('cyan')
  const [glitchEffect, setGlitchEffect] = useState(false)

  const themes = [
    { id: 'green', label: 'Phosphor Green', color: '#00ff41' },
    { id: 'cyan', label: 'Terminal Cyan', color: '#00d9ff' },
    { id: 'amber', label: 'Amber CRT', color: '#ffb000' },
  ] as const

  const Toggle = ({ val, onToggle }: { val: boolean; onToggle: () => void }) => (
    <button
      className={`ds-toggle ${val ? 'ds-toggle--on' : ''}`}
      onClick={onToggle}
    >
      {val ? '◼ ON' : '◻ OFF'}
    </button>
  )

  return (
    <div className="ds-content">
      <div className="terminal-header">
        <span className="prompt">C:\Amrish-OS\Control Panel&gt;</span>
        <span className="command"> display --settings</span>
      </div>

      <div className="ds-sections">
        {/* Toggles */}
        <div className="ds-group">
          <h3 className="ds-group-title">⚙ CRT EFFECTS</h3>
          <div className="ds-row">
            <span className="ds-label">Scanline Overlay</span>
            <Toggle val={scanlines} onToggle={() => setScanlines(p => !p)} />
          </div>
          <div className="ds-row">
            <span className="ds-label">CRT Edge Glow</span>
            <Toggle val={crtGlow} onToggle={() => setCrtGlow(p => !p)} />
          </div>
          <div className="ds-row">
            <span className="ds-label">Glitch Effect</span>
            <Toggle val={glitchEffect} onToggle={() => setGlitchEffect(p => !p)} />
          </div>
          <div className="ds-row">
            <span className="ds-label">Pixel Font Mode</span>
            <Toggle val={pixelFont} onToggle={() => setPixelFont(p => !p)} />
          </div>
        </div>

        {/* Sliders */}
        <div className="ds-group">
          <h3 className="ds-group-title">⚙ DISPLAY LEVELS</h3>
          <div className="ds-row ds-row--col">
            <span className="ds-label">Brightness: {brightness}%</span>
            <input
              type="range" min={40} max={150} value={brightness}
              className="ds-slider"
              onChange={e => setBrightness(Number(e.target.value))}
            />
          </div>
          <div className="ds-row ds-row--col">
            <span className="ds-label">Contrast: {contrast}%</span>
            <input
              type="range" min={60} max={160} value={contrast}
              className="ds-slider"
              onChange={e => setContrast(Number(e.target.value))}
            />
          </div>
        </div>

        {/* Theme */}
        <div className="ds-group">
          <h3 className="ds-group-title">⚙ COLOR THEME</h3>
          <div className="ds-themes">
            {themes.map(t => (
              <button
                key={t.id}
                className={`ds-theme-btn ${colorTheme === t.id ? 'active' : ''}`}
                style={{ borderColor: colorTheme === t.id ? t.color : '#333', color: t.color }}
                onClick={() => setColorTheme(t.id)}
              >
                <span className="theme-dot" style={{ background: t.color }} />
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="ds-status">
        STATUS: {scanlines ? 'CRT-ON' : 'CRT-OFF'} | BRIGHTNESS {brightness}% | THEME {colorTheme.toUpperCase()}
      </div>
    </div>
  )
}

export default DisplaySettings
