import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Window from './Window'
import About from './About'
import Skills from './Skills'
import Projects from './Projects'
import Contact from './Contact'
import Taskbar from './Taskbar'
import TerminalWindow from './TerminalWindow'
import FileExplorer from './FileExplorer'
import Logs from './Logs'
import RadarChart from './RadarChart'
import Awards from './Awards'
import Resume from './Resume'
import CodeViewer from './CodeViewer'
import CodeEditorApp from './CodeEditorApp'
import DisplaySettings from './DisplaySettings'
import TetrisGame from './TetrisGame'
import SnakeGame from './SnakeGame'
import CalendarApp from './CalendarApp'

interface WindowState {
  id: string
  title: string
  icon: string
  component: React.ReactNode
  isMinimized: boolean
  zIndex: number
  defaultWidth?: number
  defaultHeight?: number
}

const menuItems = [
  { id: 'terminal', title: 'Terminal', emoji: '>_' },
  { id: 'files',    title: 'Files',    emoji: '📁' },
  { id: 'projects', title: 'Projects', emoji: '🗂️' },
  { id: 'logs',     title: 'Logs',     emoji: '📋' },
  { id: 'about',    title: 'About',    emoji: '👤' },
  { id: 'skills',   title: 'Skills',   emoji: '⚙️' },
  { id: 'radar',    title: 'Radar',    emoji: '📡' },
  { id: 'awards',   title: 'Awards',   emoji: '🏆' },
  { id: 'resume',   title: 'Resume',   emoji: '📄' },
  { id: 'code',     title: 'Code',     emoji: '💻' },
  { id: 'display',  title: 'Display',  emoji: '🖥️' },
  { id: 'tetris',   title: 'Tetris',   emoji: '🎮' },
  { id: 'snake',    title: 'Python',   emoji: '🐍' },
  { id: 'calendar', title: 'Calendar', emoji: '📅' },
  { id: 'contact',  title: 'Contact',  emoji: '📧' },
  { id: 'editor',   title: 'Editor',   emoji: '✏️' },
]

const windowConfig: Record<string, { title: string; icon: string; defaultWidth?: number; defaultHeight?: number }> = {
  terminal: { title: 'Terminal.exe',      icon: '💻' },
  files:    { title: 'File Explorer',     icon: '📁' },
  projects: { title: 'Projects/',         icon: '🗂️' },
  logs:     { title: 'System Logs',       icon: '📋' },
  about:    { title: 'About.exe',         icon: '👤' },
  skills:   { title: 'Skills.dll',        icon: '⚙️' },
  radar:    { title: 'Skill Radar',       icon: '📡' },
  awards:   { title: 'Awards/',           icon: '🏆' },
  resume:   { title: 'Resume.pdf',        icon: '📄' },
  code:     { title: 'GitHub Repos',      icon: '💻' },
  display:  { title: 'Display Settings',  icon: '🖥️' },
  tetris:   { title: 'Tetris.exe',        icon: '🎮' },
  snake:    { title: 'Snake.py',          icon: '🐍' },
  calendar: { title: 'Calendar.app',      icon: '📅' },
  contact:  { title: 'Contact.bat',       icon: '📧' },
  editor:   { title: 'Code Editor',       icon: '✏️', defaultWidth: 820, defaultHeight: 560 },
}

function componentFor(id: string): React.ReactNode {
  switch (id) {
    case 'terminal':  return <TerminalWindow />
    case 'files':     return <FileExplorer />
    case 'projects':  return <Projects />
    case 'logs':      return <Logs />
    case 'about':     return <About />
    case 'skills':    return <Skills />
    case 'radar':     return <RadarChart />
    case 'awards':    return <Awards />
    case 'resume':    return <Resume />
    case 'code':      return <CodeViewer />
    case 'display':   return <DisplaySettings />
    case 'tetris':    return <TetrisGame />
    case 'snake':     return <SnakeGame />
    case 'calendar':  return <CalendarApp />
    case 'contact':   return <Contact />
    case 'editor':    return <CodeEditorApp />
    default: return null
  }
}

function Desktop({ initialWindow }: { initialWindow?: string }) {
  const [windows, setWindows] = useState<WindowState[]>([])
  const [maxZIndex, setMaxZIndex] = useState(1)

  // Auto-open a window on first mount (e.g. Tetris from welcome screen)
  useEffect(() => {
    if (initialWindow) openWindow(initialWindow)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const openWindow = (id: string) => {
    const existing = windows.find(w => w.id === id)
    if (existing) {
      bringToFront(id)
      if (existing.isMinimized) {
        setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: false } : w))
      }
      return
    }
    const cfg = windowConfig[id]
    if (!cfg) return
    const newWindow: WindowState = {
      id,
      title: cfg.title,
      icon: cfg.icon,
      component: componentFor(id),
      isMinimized: false,
      zIndex: maxZIndex + 1,
      defaultWidth: cfg.defaultWidth,
      defaultHeight: cfg.defaultHeight,
    }
    setMaxZIndex(prev => prev + 1)
    setWindows(prev => [...prev, newWindow])
  }

  const closeWindow = (id: string) => setWindows(prev => prev.filter(w => w.id !== id))

  const minimizeWindow = (id: string) =>
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w))

  const bringToFront = (id: string) => {
    setMaxZIndex(prev => prev + 1)
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: maxZIndex + 1 } : w))
  }

  return (
    <div className="desktop">
      {/* ── Retro Sidebar ── */}
      <aside className="retro-sidebar">
        <div className="retro-sidebar-brand">
          <div className="brand-logo">Amrish<span className="brand-dash"> </span>OS</div>
          <div className="brand-sub">v5.0</div>
        </div>

        <div className="retro-icons-grid">
          {menuItems.map(item => (
            <motion.button
              key={item.id}
              className="retro-icon-btn"
              onClick={() => openWindow(item.id)}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.93 }}
              title={item.title}
            >
              <span className="retro-icon-glyph">{item.emoji}</span>
              <span className="retro-icon-label">{item.title}</span>
            </motion.button>
          ))}
        </div>

        <div className="retro-sidebar-footer">
          <span className="footer-dot" />
          <span className="footer-status">ONLINE</span>
        </div>
      </aside>

      {/* ── Open Windows ── */}
      {windows.map(win => (
        <Window
          key={win.id}
          title={win.title}
          icon={win.icon}
          isMinimized={win.isMinimized}
          zIndex={win.zIndex}
          defaultWidth={win.defaultWidth}
          defaultHeight={win.defaultHeight}
          onClose={() => closeWindow(win.id)}
          onMinimize={() => minimizeWindow(win.id)}
          onFocus={() => bringToFront(win.id)}
        >
          {win.component}
        </Window>
      ))}

      <Taskbar windows={windows} onWindowClick={openWindow} />
    </div>
  )
}

export default Desktop

