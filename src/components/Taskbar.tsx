import { useState, useEffect } from 'react'

interface WindowState {
  id: string
  title: string
  icon: string
  isMinimized: boolean
}

interface TaskbarProps {
  windows: WindowState[]
  onWindowClick: (id: string) => void
}

function Taskbar({ windows, onWindowClick }: TaskbarProps) {
  const [time, setTime] = useState(new Date())
  const [showStartMenu, setShowStartMenu] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="taskbar">
      <button 
        className="start-button"
        onClick={() => setShowStartMenu(!showStartMenu)}
      >
        <span className="start-icon">⚡</span>
        <span className="start-text">START</span>
      </button>

      {showStartMenu && (
        <div className="start-menu">
          <div className="start-menu-header">
            <span className="start-menu-title">Amrish OS v5.0</span>
          </div>
          <div className="start-menu-items">
            <button onClick={() => { onWindowClick('terminal'); setShowStartMenu(false); }}>💻 Terminal.exe</button>
            <button onClick={() => { onWindowClick('files'); setShowStartMenu(false); }}>📁 File Explorer</button>
            <button onClick={() => { onWindowClick('projects'); setShowStartMenu(false); }}>🗂️ Projects/</button>
            <button onClick={() => { onWindowClick('logs'); setShowStartMenu(false); }}>📋 System Logs</button>
            <button onClick={() => { onWindowClick('about'); setShowStartMenu(false); }}>👤 About.exe</button>
            <button onClick={() => { onWindowClick('skills'); setShowStartMenu(false); }}>⚙️ Skills.dll</button>
            <button onClick={() => { onWindowClick('radar'); setShowStartMenu(false); }}>📡 Skill Radar</button>
            <button onClick={() => { onWindowClick('awards'); setShowStartMenu(false); }}>🏆 Awards/</button>
            <button onClick={() => { onWindowClick('resume'); setShowStartMenu(false); }}>📄 Resume.pdf</button>
            <button onClick={() => { onWindowClick('code'); setShowStartMenu(false); }}>💻 GitHub Repos</button>
            <button onClick={() => { onWindowClick('display'); setShowStartMenu(false); }}>🖥️ Display Settings</button>
            <button onClick={() => { onWindowClick('tetris'); setShowStartMenu(false); }}>🎮 Tetris.exe</button>
            <button onClick={() => { onWindowClick('snake'); setShowStartMenu(false); }}>🐍 Snake.py</button>
            <button onClick={() => { onWindowClick('calendar'); setShowStartMenu(false); }}>📅 Calendar.app</button>
            <button onClick={() => { onWindowClick('contact'); setShowStartMenu(false); }}>📧 Contact.bat</button>
            <button onClick={() => { onWindowClick('editor'); setShowStartMenu(false); }}>✏️ Code Editor</button>
          </div>
        </div>
      )}

      <div className="taskbar-windows">
        {windows.map(window => (
          <button
            key={window.id}
            className={`taskbar-window ${window.isMinimized ? 'minimized' : 'active'}`}
            onClick={() => onWindowClick(window.id)}
          >
            <span className="taskbar-icon">{window.icon}</span>
            <span className="taskbar-title">{window.title}</span>
          </button>
        ))}
      </div>

      <div className="taskbar-tray">
        <div className="tray-icons">
          <span title="Network">📶</span>
          <span title="Volume">🔊</span>
        </div>
        <div className="taskbar-clock">
          <div className="clock-time">{formatTime(time)}</div>
          <div className="clock-date">{formatDate(time)}</div>
        </div>
      </div>
    </div>
  )
}

export default Taskbar
