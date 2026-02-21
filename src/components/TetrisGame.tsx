import { useState, useEffect, useCallback, useRef } from 'react'

const COLS = 10
const ROWS = 20
const EMPTY = 0

const TETROMINOES = [
  { shape: [[1,1,1,1]], color: '#00d9ff' },                           // I
  { shape: [[1,1],[1,1]], color: '#ffd700' },                          // O
  { shape: [[0,1,0],[1,1,1]], color: '#9d00ff' },                     // T
  { shape: [[1,0],[1,0],[1,1]], color: '#ff6b35' },                   // L
  { shape: [[0,1],[0,1],[1,1]], color: '#00ff41' },                   // J
  { shape: [[0,1,1],[1,1,0]], color: '#ff4040' },                     // S
  { shape: [[1,1,0],[0,1,1]], color: '#ff80ab' },                     // Z
]

function emptyGrid() {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(EMPTY))
}

function rotate(matrix: number[][]): number[][] {
  return matrix[0].map((_, c) => matrix.map(row => row[c]).reverse())
}

function randomPiece() {
  const t = TETROMINOES[Math.floor(Math.random() * TETROMINOES.length)]
  return { shape: t.shape, color: t.color, x: 3, y: 0 }
}

type Piece = { shape: number[][]; color: string; x: number; y: number }

function TetrisGame() {
  const [grid, setGrid] = useState(emptyGrid())
  const [piece, setPiece] = useState<Piece>(randomPiece())
  const [score, setScore] = useState(0)
  const [lines, setLines] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [running, setRunning] = useState(false)
  const [level, setLevel] = useState(1)
  const pieceRef = useRef(piece)
  const gridRef = useRef(grid)

  pieceRef.current = piece
  gridRef.current = grid

  const isValid = useCallback((p: Piece, g: number[][]) => {
    return p.shape.every((row, dr) =>
      row.every((cell, dc) => {
        if (!cell) return true
        const nx = p.x + dc
        const ny = p.y + dr
        return nx >= 0 && nx < COLS && ny >= 0 && ny < ROWS && !g[ny][nx]
      })
    )
  }, [])

  const place = useCallback((p: Piece, g: number[][]): number[][] => {
    const next = g.map(r => [...r])
    p.shape.forEach((row, dr) =>
      row.forEach((cell, dc) => {
        if (cell) next[p.y + dr][p.x + dc] = 1
      })
    )
    return next
  }, [])

  const clearLines = useCallback((g: number[][]): { g: number[][]; count: number } => {
    const kept = g.filter(row => row.some(c => !c))
    const count = ROWS - kept.length
    const newRows = Array.from({ length: count }, () => Array(COLS).fill(EMPTY))
    return { g: [...newRows, ...kept], count }
  }, [])

  const lockPiece = useCallback(() => {
    const p = pieceRef.current
    const g = gridRef.current
    if (!isValid(p, g)) { setGameOver(true); setRunning(false); return }
    const placed = place(p, g)
    const { g: cleared, count } = clearLines(placed)
    setGrid(cleared)
    setLines(prev => prev + count)
    setScore(prev => prev + count * 100 * level)
    setLevel(() => Math.floor(lines / 10) + 1)
    const next = randomPiece()
    if (!isValid(next, cleared)) { setGameOver(true); setRunning(false) }
    else setPiece(next)
  }, [isValid, place, clearLines, level, lines])

  useEffect(() => {
    if (!running) return
    const speed = Math.max(100, 600 - level * 50)
    const id = setInterval(() => {
      const p = pieceRef.current
      const moved = { ...p, y: p.y + 1 }
      if (isValid(moved, gridRef.current)) setPiece(moved)
      else lockPiece()
    }, speed)
    return () => clearInterval(id)
  }, [running, isValid, lockPiece, level])

  useEffect(() => {
    if (!running) return
    const onKey = (e: KeyboardEvent) => {
      const p = pieceRef.current
      const g = gridRef.current
      if (e.key === 'ArrowLeft') {
        const moved = { ...p, x: p.x - 1 }
        if (isValid(moved, g)) setPiece(moved)
      } else if (e.key === 'ArrowRight') {
        const moved = { ...p, x: p.x + 1 }
        if (isValid(moved, g)) setPiece(moved)
      } else if (e.key === 'ArrowUp') {
        const rotated = { ...p, shape: rotate(p.shape) }
        if (isValid(rotated, g)) setPiece(rotated)
      } else if (e.key === 'ArrowDown') {
        const moved = { ...p, y: p.y + 1 }
        if (isValid(moved, g)) setPiece(moved)
        else lockPiece()
      } else if (e.key === ' ') {
        let dropped = { ...p }
        while (isValid({ ...dropped, y: dropped.y + 1 }, g)) dropped.y++
        setPiece(dropped)
        lockPiece()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [running, isValid, lockPiece])

  const display = grid.map(r => [...r])
  if (!gameOver) {
    piece.shape.forEach((row, dr) =>
      row.forEach((cell, dc) => {
        if (cell) {
          const y = piece.y + dr
          const x = piece.x + dc
          if (y >= 0 && y < ROWS && x >= 0 && x < COLS) display[y][x] = 2
        }
      })
    )
  }

  const restart = () => {
    setGrid(emptyGrid())
    setPiece(randomPiece())
    setScore(0)
    setLines(0)
    setLevel(1)
    setGameOver(false)
    setRunning(true)
  }

  return (
    <div className="tetris-wrapper">
      <div className="tetris-info">
        <div className="tetris-stat"><span>SCORE</span><span className="tetris-val">{score}</span></div>
        <div className="tetris-stat"><span>LINES</span><span className="tetris-val">{lines}</span></div>
        <div className="tetris-stat"><span>LEVEL</span><span className="tetris-val">{level}</span></div>
        <div className="tetris-controls">
          {!running && !gameOver && (
            <button className="tetris-btn" onClick={() => setRunning(true)}>▶ START</button>
          )}
          {running && (
            <button className="tetris-btn" onClick={() => setRunning(false)}>⏸ PAUSE</button>
          )}
          {!running && lines > 0 && !gameOver && (
            <button className="tetris-btn" onClick={() => setRunning(true)}>▶ RESUME</button>
          )}
          {gameOver && (
            <button className="tetris-btn tetris-btn--red" onClick={restart}>↺ RESTART</button>
          )}
          {(running || lines > 0) && !gameOver && (
            <button className="tetris-btn tetris-btn--outline" onClick={restart}>↺ RESET</button>
          )}
        </div>
        <div className="tetris-keys">
          <div>← → : Move</div>
          <div>↑ : Rotate</div>
          <div>↓ : Soft Drop</div>
          <div>Space: Hard Drop</div>
        </div>
      </div>

      <div className="tetris-board">
        {gameOver && (
          <div className="tetris-overlay">
            <div>GAME OVER</div>
            <div className="tetris-final-score">Score: {score}</div>
          </div>
        )}
        {!running && !gameOver && score === 0 && (
          <div className="tetris-overlay tetris-overlay--start">
            <div>TETRIS</div>
            <div className="tetris-sub">Press START</div>
          </div>
        )}
        {display.map((row, r) => (
          <div key={r} className="tetris-row">
            {row.map((cell, c) => (
              <div
                key={c}
                className={`tetris-cell ${cell === 2 ? 'tetris-cell--active' : cell === 1 ? 'tetris-cell--locked' : ''}`}
                style={cell === 2 ? { background: piece.color, boxShadow: `0 0 6px ${piece.color}` } : undefined}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default TetrisGame
