import { useState, useEffect } from 'react'

interface LogEntry {
  time: string
  level: 'INFO' | 'WARN' | 'ERROR' | 'SUCCESS'
  message: string
}

const initialLogs: LogEntry[] = [
  { time: '08:00:01', level: 'INFO', message: 'Amrish OS v5.0 booted successfully' },
  { time: '08:00:02', level: 'SUCCESS', message: 'Portfolio loaded — all modules OK' },
  { time: '08:01:15', level: 'INFO', message: 'User session started' },
  { time: '08:02:30', level: 'INFO', message: 'About.exe opened by user' },
  { time: '08:03:10', level: 'SUCCESS', message: 'Skills.dll loaded — 10 skills found' },
  { time: '08:04:22', level: 'INFO', message: 'Projects/ mounted — 4 entries listed' },
  { time: '08:05:00', level: 'WARN', message: 'Contact.bat: SMTP not configured' },
  { time: '08:06:45', level: 'INFO', message: 'FileExplorer opened' },
  { time: '08:07:11', level: 'SUCCESS', message: 'Radar.dll: Chart rendered' },
  { time: '08:08:03', level: 'ERROR', message: 'Tetris.exe: High score reset (new game)' },
  { time: '08:09:20', level: 'INFO', message: 'Terminal.exe: Session active' },
  { time: '08:10:00', level: 'SUCCESS', message: 'Calendar sync complete' },
]

function Logs() {
  const [logs, setLogs] = useState<LogEntry[]>(initialLogs)
  const [filter, setFilter] = useState<'ALL' | 'INFO' | 'WARN' | 'ERROR' | 'SUCCESS'>('ALL')

  useEffect(() => {
    const levels: LogEntry['level'][] = ['INFO', 'SUCCESS', 'WARN', 'ERROR']
    const messages = [
      'Heartbeat ping OK',
      'Memory usage: 42%',
      'Cache cleared',
      'Background process idle',
      'Network latency: 8ms',
    ]
    const interval = setInterval(() => {
      const now = new Date().toLocaleTimeString('en-GB', { hour12: false })
      const level = levels[Math.floor(Math.random() * levels.length)]
      const message = messages[Math.floor(Math.random() * messages.length)]
      setLogs(prev => [...prev.slice(-30), { time: now, level, message }])
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const filtered = filter === 'ALL' ? logs : logs.filter(l => l.level === filter)

  const levelClass = (level: string) => {
    switch (level) {
      case 'INFO': return 'log-info'
      case 'WARN': return 'log-warn'
      case 'ERROR': return 'log-error'
      case 'SUCCESS': return 'log-success'
      default: return ''
    }
  }

  return (
    <div className="logs-window">
      <div className="logs-toolbar">
        {(['ALL', 'INFO', 'SUCCESS', 'WARN', 'ERROR'] as const).map(f => (
          <button
            key={f}
            className={`log-filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
        <button className="log-filter-btn clear-btn" onClick={() => setLogs([])}>
          CLEAR
        </button>
      </div>
      <div className="logs-body">
        {filtered.map((log, i) => (
          <div key={i} className={`log-entry ${levelClass(log.level)}`}>
            <span className="log-time">[{log.time}]</span>
            <span className="log-level">[{log.level}]</span>
            <span className="log-msg">{log.message}</span>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="log-empty">No log entries for this level.</div>
        )}
      </div>
    </div>
  )
}

export default Logs
