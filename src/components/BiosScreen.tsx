import React, { useState, useEffect, useRef } from 'react'

interface BiosScreenProps {
  onEnterPortfolio: () => void
  onPlayTetris: () => void
}

// color: matches CSS class suffix  boot-line--{color}
const bootSequence = [
  { text: '> Initializing Amrish OS Kernel...', delay: 300,  color: 'cyan'   },
  { text: '> Checking RAM.......... 640KB OK',   delay: 400,  color: 'green'  },
  { text: '> Detecting drives...... C:\\ — 500GB SSD [HEALTHY]', delay: 350, color: 'yellow' },
  { text: '> Portfolio Archive [MOUNTED]',        delay: 300,  color: 'white'  },
  { text: '> Loading modules: [React] [Node.js] [Python] [Socket.io]', delay: 450, color: 'purple' },
  { text: '> Loading tools: [VS Code] [Git] [Postman] [Vercel]',       delay: 400, color: 'cyan'   },
  { text: '> Initializing network interfaces... OK', delay: 350, color: 'green'  },
  { text: '> Starting display driver... CRT_MODE ACTIVE', delay: 350, color: 'yellow' },
  { text: '> All systems operational.',            delay: 500,  color: 'success' },
]

function BiosScreen({ onEnterPortfolio, onPlayTetris }: BiosScreenProps) {
  const [cmdLines, setCmdLines] = useState<{ text: string; color: string }[]>([])
  const [showBoot, setShowBoot] = useState(true)
  const [progress, setProgress] = useState(0)
  const [showProgress, setShowProgress] = useState(false)
  const [showWelcomeCard, setShowWelcomeCard] = useState(false)
  const [cardVisible, setCardVisible] = useState(false)
  const started = useRef(false)

  // Step 1 — print boot lines one by one (guard against StrictMode double-fire)
  useEffect(() => {
    if (started.current) return
    started.current = true
    let totalDelay = 0
    bootSequence.forEach((item, index) => {
      totalDelay += item.delay
      setTimeout(() => {
        setCmdLines(prev => [...prev, { text: item.text, color: item.color }])
        if (index === bootSequence.length - 1) {
          setTimeout(() => setShowProgress(true), 600)
        }
      }, totalDelay)
    })
  }, [])

  // Step 2 — fill loading bar
  useEffect(() => {
    if (!showProgress) return
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setShowBoot(false)
            setShowWelcomeCard(true)
            setTimeout(() => setCardVisible(true), 60)
          }, 400)
          return 100
        }
        return prev + 4
      })
    }, 50)
    return () => clearInterval(interval)
  }, [showProgress])

  return (
    <div className={`bios-screen${showWelcomeCard ? ' bios-screen--welcome' : ''}`}>

      {/* ── Boot phase ── */}
      {showBoot && (
        <div className="bios-cmd-panel">
          {cmdLines.map((line, i) => (
            <div key={i} className={`bios-line bios-line--${line.color}`}>{line.text}</div>
          ))}
          <div className="bios-cursor">_</div>
          {showProgress && (
            <div className="loading-bar-container boot-progress-bar">
              <span>LOADING </span>
              <div className="loading-bar" style={{ ['--prog' as string]: `${progress}%` } as React.CSSProperties}>
                <div className="loading-bar-fill" />
              </div>
              <span> {progress}%</span>
            </div>
          )}
        </div>
      )}

      {/* ── Welcome card (shown after boot) ── */}
      {showWelcomeCard && (
        <div className={`welcome-card${cardVisible ? ' welcome-card--visible' : ''}`}>
          <div className="welcome-name">AMRISH</div>
          <div className="welcome-subtitle">Welcome to PY-OS v5.0</div>
          <div className="welcome-tagline">
            Full Stack Developer&nbsp;•&nbsp;ML Enthusiast&nbsp;•&nbsp;NIT Jamshedpur
          </div>
          <div className="welcome-buttons">
            <button className="welcome-btn welcome-btn--primary" onClick={onEnterPortfolio}>
              <span className="welcome-btn-icon">►</span> EXPLORE PORTFOLIO
            </button>
            <button className="welcome-btn welcome-btn--secondary" onClick={onPlayTetris}>
              <span className="welcome-btn-icon">🤖</span> PLAY TETRIS
            </button>
          </div>
          <div className="welcome-footer">You can switch anytime using the taskbar</div>
        </div>
      )}

    </div>
  )
}

export default BiosScreen
