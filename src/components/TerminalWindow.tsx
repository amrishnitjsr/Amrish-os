import { useState, useRef, useEffect } from 'react'

interface HistoryEntry {
  type: 'input' | 'output' | 'error'
  text: string
}

const COMMANDS: Record<string, string> = {
  help: `Available commands:
  help        - Show this help
  about       - About Amrish
  skills      - List skills
  projects    - Show projects
  contact     - Contact info
  clear       - Clear terminal
  date        - Show current date
  whoami      - Who is Amrish?
  ls          - List directory`,
  about: `> Amrish Yadav | Full Stack Developer & ML Enthusiast
> B.Tech CSE @ NIT Jamshedpur (2022–Present)
> MERN Stack, Socket.io, Python, Machine Learning
> Open to exciting opportunities`,
  skills: `> Languages : C, C++, JavaScript, TypeScript, Python
> Frontend  : React.js, Next.js, HTML, CSS, Tailwind, Bootstrap
> Backend   : Node.js, Express.js, Socket.io, JWT, OAuth 2.0
> Database  : MongoDB, MySQL
> ML        : Pandas, NumPy, Scikit-learn, Jupyter
> Tools     : Git, Postman, VS Code, Vercel, Render`,
  projects: `> [1] Chatify                           - Real-time social media app (MERN + Socket.io)
> [2] Social-Media-Web-App-Mern-Stack   - Full-stack MERN social media with JWT auth
> [3] Global-Logistics-Dashboard        - 3D geospatial viz (Streamlit + PyDeck)
> [4] World-Cup-Score-Predictor         - ML match score predictor (Python + sklearn)
> [5] IHPMS                            - Hospital Pharmacy Management System
> [6] ADR-MedDRA                       - AI drug reaction mapping (Streamlit + NLP)`,
  contact: `> Email    : amrishy2003@gmail.com
> Phone    : +91-9118841006
> GitHub   : github.com/amrishnitjsr
> LinkedIn : linkedin.com/in/amrishyadav
> Location : Jaunpur, Uttar Pradesh`,
  whoami: `> Amrish Yadav — Full Stack Developer & Competitive Coder
> Technical Lead @ Society of CSE, NIT Jamshedpur
> AIR 35 @ Coding Ninjas | 5-Star HackerRank | CF Rating 1268
> Turning ideas into scalable products ✨`,
  date: new Date().toLocaleString(),
  ls: `> about.exe    skills.dll    projects/
> resume.pdf    contact.bat   logs.txt
> awards/       code/         calendar.app`,
}

function TerminalWindow() {
  const [history, setHistory] = useState<HistoryEntry[]>([
    { type: 'output', text: 'Amrish OS Terminal v5.0 — Type "help" for commands' },
    { type: 'output', text: '────────────────────────────────────────────' },
  ])
  const [input, setInput] = useState('')
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [cmdIndex, setCmdIndex] = useState(-1)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const runCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()
    const newHistory: HistoryEntry[] = [
      ...history,
      { type: 'input', text: `C:\\Amrish-OS> ${cmd}` },
    ]

    if (trimmed === 'clear') {
      setHistory([{ type: 'output', text: 'Terminal cleared.' }])
      return
    }

    if (trimmed === 'date') {
      newHistory.push({ type: 'output', text: `> ${new Date().toLocaleString()}` })
    } else if (COMMANDS[trimmed]) {
      newHistory.push({ type: 'output', text: COMMANDS[trimmed] })
    } else if (trimmed === '') {
      // do nothing
    } else {
      newHistory.push({
        type: 'error',
        text: `'${cmd}' is not recognized. Type "help" for commands.`,
      })
    }

    setHistory(newHistory)
    setCmdHistory(prev => [cmd, ...prev])
    setCmdIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      runCommand(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      const nextIdx = Math.min(cmdIndex + 1, cmdHistory.length - 1)
      setCmdIndex(nextIdx)
      setInput(cmdHistory[nextIdx] ?? '')
    } else if (e.key === 'ArrowDown') {
      const nextIdx = Math.max(cmdIndex - 1, -1)
      setCmdIndex(nextIdx)
      setInput(nextIdx === -1 ? '' : cmdHistory[nextIdx])
    }
  }

  return (
    <div className="terminal-window-content" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-lines">
        {history.map((entry, i) => (
          <div
            key={i}
            className={`terminal-line terminal-line--${entry.type}`}
          >
            {entry.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="terminal-input-row">
        <span className="terminal-prompt">C:\Amrish-OS&gt;&nbsp;</span>
        <input
          ref={inputRef}
          className="terminal-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
        <span className="terminal-cursor">█</span>
      </div>
    </div>
  )
}

export default TerminalWindow
