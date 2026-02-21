import { useState, useEffect } from 'react'
import BiosScreen from './components/BiosScreen'
import Desktop from './components/Desktop'

// Fix Android 100vh bug: set --real-vh CSS variable to actual visible height
function useViewportFix() {
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--real-vh', `${vh}px`)
    }
    setVh()
    window.addEventListener('resize', setVh)
    window.addEventListener('orientationchange', setVh)
    return () => {
      window.removeEventListener('resize', setVh)
      window.removeEventListener('orientationchange', setVh)
    }
  }, [])
}

function App() {
  useViewportFix()
  const [showDesktop, setShowDesktop] = useState(false)
  const [initialWindow, setInitialWindow] = useState<string | undefined>(undefined)

  const handleEnterPortfolio = () => {
    setInitialWindow(undefined)
    setShowDesktop(true)
  }

  const handlePlayTetris = () => {
    setInitialWindow('tetris')
    setShowDesktop(true)
  }

  return (
    <div className="app">
      {!showDesktop ? (
        <BiosScreen onEnterPortfolio={handleEnterPortfolio} onPlayTetris={handlePlayTetris} />
      ) : (
        <Desktop initialWindow={initialWindow} />
      )}
      <div className="crt-overlay"></div>
      <div className="scanlines"></div>
    </div>
  )
}

export default App
