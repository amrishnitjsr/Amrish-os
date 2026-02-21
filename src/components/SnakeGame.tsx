import { useState, useEffect, useCallback, useRef } from 'react'

const COLS = 20
const ROWS = 16
const CELL = 20

type Dir = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'
type Pos = { x: number; y: number }

function randomFood(snake: Pos[]): Pos {
  let food: Pos
  do {
    food = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) }
  } while (snake.some(s => s.x === food.x && s.y === food.y))
  return food
}

const INIT_SNAKE: Pos[] = [{ x: 10, y: 8 }, { x: 9, y: 8 }, { x: 8, y: 8 }]

function SnakeGame() {
  const [snake, setSnake] = useState<Pos[]>(INIT_SNAKE)
  const [food, setFood] = useState<Pos>(randomFood(INIT_SNAKE))
  const [dir, setDir] = useState<Dir>('RIGHT')
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [running, setRunning] = useState(false)
  const [paused, setPaused] = useState(false)
  const [level, setLevel] = useState(1)

  const pausedRef = useRef(false)
  pausedRef.current = paused

  const dirRef = useRef(dir)
  dirRef.current = dir

  const reset = useCallback(() => {
    const init = INIT_SNAKE
    setSnake(init)
    setFood(randomFood(init))
    setDir('RIGHT')
    setScore(0)
    setLevel(1)
    setGameOver(false)
    setPaused(false)
    setRunning(true)
  }, [])

  useEffect(() => {
    if (!running) return
    const speed = Math.max(80, 200 - level * 15)
    const tick = setInterval(() => {
      if (pausedRef.current) return
      setSnake(prev => {
        const d = dirRef.current
        const head = prev[0]
        const newHead: Pos = {
          x: (head.x + (d === 'RIGHT' ? 1 : d === 'LEFT' ? -1 : 0) + COLS) % COLS,
          y: (head.y + (d === 'DOWN' ? 1 : d === 'UP' ? -1 : 0) + ROWS) % ROWS,
        }
        if (prev.some(s => s.x === newHead.x && s.y === newHead.y)) {
          setGameOver(true)
          setRunning(false)
          setHighScore(h => Math.max(h, score))
          return prev
        }
        const ate = newHead.x === food.x && newHead.y === food.y
        const next = ate ? [newHead, ...prev] : [newHead, ...prev.slice(0, -1)]
        if (ate) {
          setScore(s => {
            const ns = s + 10 * level
            if (ns % 50 === 0) setLevel(l => l + 1)
            return ns
          })
          setFood(randomFood(next))
        }
        return next
      })
    }, speed)
    return () => clearInterval(tick)
  }, [running, food, score, level])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault()
        if (running && !gameOver) setPaused(p => !p)
        return
      }
      const map: Record<string, Dir> = {
        ArrowUp: 'UP', ArrowDown: 'DOWN', ArrowLeft: 'LEFT', ArrowRight: 'RIGHT',
        w: 'UP', s: 'DOWN', a: 'LEFT', d: 'RIGHT',
      }
      const next = map[e.key]
      if (!next) return
      const opposites: Record<Dir, Dir> = { UP: 'DOWN', DOWN: 'UP', LEFT: 'RIGHT', RIGHT: 'LEFT' }
      if (next !== opposites[dirRef.current]) setDir(next)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [running, gameOver])

  const isSnake = (x: number, y: number) => snake.some(s => s.x === x && s.y === y)
  const isHead = (x: number, y: number) => snake[0].x === x && snake[0].y === y
  const isFood = (x: number, y: number) => food.x === x && food.y === y

  const changeDir = (next: Dir) => {
    const opposites: Record<Dir, Dir> = { UP: 'DOWN', DOWN: 'UP', LEFT: 'RIGHT', RIGHT: 'LEFT' }
    if (next !== opposites[dirRef.current]) setDir(next)
  }

  return (
    <div className="snake-wrapper">
      <div className="snake-hud">
        <div className="snake-stat"><span>SCORE</span><span className="snake-val">{score}</span></div>
        <div className="snake-stat"><span>BEST</span><span className="snake-val">{highScore}</span></div>
        <div className="snake-stat"><span>LEVEL</span><span className="snake-val">{level}</span></div>
        <div className="snake-stat"><span>LENGTH</span><span className="snake-val">{snake.length}</span></div>
        {running && !gameOver && (
          <button
            className="snake-btn snake-pause-btn"
            onPointerDown={e => { e.preventDefault(); setPaused(p => !p) }}
          >
            {paused ? '▶ RESUME' : '⏸ PAUSE'}
          </button>
        )}
      </div>

      <div className="snake-board" style={{ width: COLS * CELL, height: ROWS * CELL, position: 'relative' }}>
        {paused && !gameOver && (
          <div className="snake-overlay">
            <div>⏸ PAUSED</div>
            <button className="snake-btn" onPointerDown={e => { e.preventDefault(); setPaused(false) }}>▶ RESUME</button>
          </div>
        )}
        {gameOver && (
          <div className="snake-overlay">
            <div>GAME OVER</div>
            <div className="snake-final">Score: {score}</div>
            <button className="snake-btn" onClick={reset}>↺ PLAY AGAIN</button>
          </div>
        )}
        {!running && !gameOver && (
          <div className="snake-overlay">
            <div>🐍 SNAKE</div>
            <div className="snake-sub">Arrow Keys / WASD</div>
            <button className="snake-btn" onClick={reset}>▶ START</button>
          </div>
        )}
        {Array.from({ length: ROWS }, (_, y) =>
          Array.from({ length: COLS }, (_, x) => (
            <div
              key={`${x}-${y}`}
              className={`snake-cell ${isHead(x, y) ? 'snake-head' : isSnake(x, y) ? 'snake-body' : isFood(x, y) ? 'snake-food' : ''}`}
              style={{ left: x * CELL, top: y * CELL, width: CELL, height: CELL, position: 'absolute' }}
            />
          ))
        )}
      </div>

      <div className="snake-controls-hint">
        Arrow Keys or WASD to move
      </div>

      {/* ── On-screen D-pad (visible on touch devices) ── */}
      <div className="snake-dpad">
        <div className="snake-dpad-row">
          <button
            className="snake-dpad-btn"
            onPointerDown={e => { e.preventDefault(); changeDir('UP') }}
          >▲</button>
        </div>
        <div className="snake-dpad-row">
          <button
            className="snake-dpad-btn"
            onPointerDown={e => { e.preventDefault(); changeDir('LEFT') }}
          >◀</button>
          <div className="snake-dpad-center">●</div>
          <button
            className="snake-dpad-btn"
            onPointerDown={e => { e.preventDefault(); changeDir('RIGHT') }}
          >▶</button>
        </div>
        <div className="snake-dpad-row">
          <button
            className="snake-dpad-btn"
            onPointerDown={e => { e.preventDefault(); changeDir('DOWN') }}
          >▼</button>
        </div>
      </div>
    </div>
  )
}

export default SnakeGame
