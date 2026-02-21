import { useState, useRef, useEffect } from 'react'

interface WindowProps {
  title: string
  icon: string
  children: React.ReactNode
  isMinimized: boolean
  zIndex: number
  defaultWidth?: number
  defaultHeight?: number
  onClose: () => void
  onMinimize: () => void
  onFocus: () => void
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 640)
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 640)
    window.addEventListener('resize', handler)
    window.addEventListener('orientationchange', handler)
    return () => {
      window.removeEventListener('resize', handler)
      window.removeEventListener('orientationchange', handler)
    }
  }, [])
  return isMobile
}

function Window({ 
  title, 
  icon, 
  children, 
  isMinimized, 
  zIndex,
  defaultWidth,
  defaultHeight,
  onClose, 
  onMinimize,
  onFocus 
}: WindowProps) {
  const SIDEBAR_W = 168
  const isMobile = useIsMobile()
  const [position, setPosition] = useState({ x: SIDEBAR_W + 20 + Math.random() * 80, y: 30 + Math.random() * 60 })
  const [isDragging, setIsDragging] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const dragOffset = useRef({ x: 0, y: 0 })
  const windowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isMaximized && !isMobile) {
        setPosition({
          x: e.clientX - dragOffset.current.x,
          y: e.clientY - dragOffset.current.y,
        })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, isMaximized, isMobile])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized || isMobile) return
    onFocus()
    setIsDragging(true)
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    }
  }

  // Touch drag support for non-mobile (tablets)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isMaximized || isMobile) return
    onFocus()
    const touch = e.touches[0]
    setIsDragging(true)
    dragOffset.current = {
      x: touch.clientX - position.x,
      y: touch.clientY - position.y,
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || isMaximized || isMobile) return
    const touch = e.touches[0]
    setPosition({
      x: touch.clientX - dragOffset.current.x,
      y: touch.clientY - dragOffset.current.y,
    })
  }

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized)
  }

  if (isMinimized) return null

  // Mobile: fullscreen window above the dock + taskbar (128px total)
  // Use --real-vh variable to avoid Android 100vh bug
  const mobileStyle = {
    position: 'fixed' as const,
    left: 0,
    top: 0,
    width: '100vw',
    height: 'calc(var(--real-vh, 1vh) * 100 - 128px)',
    zIndex,
  }

  const desktopStyle: React.CSSProperties = {
    left: isMaximized ? 168 : position.x,
    top: isMaximized ? 0 : position.y,
    width: isMaximized ? 'calc(100vw - 168px)' : (defaultWidth ?? undefined),
    height: isMaximized ? undefined : (defaultHeight ?? undefined),
    zIndex,
  }

  return (
    <div
      ref={windowRef}
      className={`window ${isMaximized && !isMobile ? 'maximized' : ''}`}
      style={isMobile ? mobileStyle : desktopStyle}
      onClick={onFocus}
    >
      <div
        className="window-titlebar"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => setIsDragging(false)}
      >
        <div className="window-title">
          <span className="window-icon">{icon}</span>
          <span>{title}</span>
        </div>
        <div className="window-controls">
          <button className="window-btn minimize" onClick={onMinimize}>─</button>
          {!isMobile && (
            <button className="window-btn maximize" onClick={toggleMaximize}>□</button>
          )}
          <button className="window-btn close" onClick={onClose}>✕</button>
        </div>
      </div>
      <div className="window-content">
        {children}
      </div>
    </div>
  )
}

export default Window
