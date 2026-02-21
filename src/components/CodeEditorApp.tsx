import { useState, useRef } from 'react'

/* ─── Language configs ─────────────────────────────────── */
/* Wandbox compiler names — free, no API key, CORS-friendly */
const LANGS = [
  {
    label: 'C++',
    compiler: 'gcc-head',
    boilerplate: `#include <bits/stdc++.h>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
  },
  {
    label: 'C',
    compiler: 'gcc-c-head',
    boilerplate: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
  },
  {
    label: 'Python',
    compiler: 'cpython-3.12.0',
    boilerplate: `name = input("Enter your name: ")
print(f"Hello, {name}!")`,
  },
  {
    label: 'JavaScript',
    compiler: 'nodejs-20.5.0',
    boilerplate: `// Node.js
console.log("Hello, World!");`,
  },
  {
    label: 'Java',
    compiler: 'openjdk-head',
    boilerplate: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  },
  {
    label: 'Go',
    compiler: 'go-1.21.0',
    boilerplate: `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`,
  },
  {
    label: 'Rust',
    compiler: 'rust-1.71.0',
    boilerplate: `fn main() {
    println!("Hello, World!");
}`,
  },
]

interface WandboxResult {
  
  status?: string
  program_output?: string
  program_error?: string
  compiler_error?: string
  compiler_output?: string
}

async function runCode(compiler: string, code: string, stdin: string): Promise<WandboxResult> {
  const res = await fetch('https://wandbox.org/api/compile.json', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ compiler, code, stdin }),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

/* ─── Component ────────────────────────────────────────── */
function CodeEditorApp() {
  const [langIdx, setLangIdx] = useState(0)
  const [code, setCode] = useState(LANGS[0].boilerplate)
  const [stdin, setStdin] = useState('')
  const [output, setOutput] = useState<string | null>(null)
  const [running, setRunning] = useState(false)
  const [compileErr, setCompileErr] = useState<string | null>(null)
  const [showStdin, setShowStdin] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const lang = LANGS[langIdx]

  const changeLang = (idx: number) => {
    setLangIdx(idx)
    setCode(LANGS[idx].boilerplate)
    setOutput(null)
    setCompileErr(null)
  }

  const handleRun = async () => {
    if (running) return
    setRunning(true)
    setOutput(null)
    setCompileErr(null)
    try {
      const result = await runCode(lang.compiler, code, stdin)
      const out = (result.program_output ?? '') + (result.program_error ?? '')
      const cErr = (result.compiler_error ?? '') || (result.compiler_output ?? '')
      if (cErr) setCompileErr(cErr)
      setOutput(out || (cErr ? '' : '(no output)'))
    } catch (e: unknown) {
      setCompileErr(`Failed to reach compiler: ${e instanceof Error ? e.message : String(e)}`)
    } finally {
      setRunning(false)
    }
  }

  /* Tab key inserts spaces instead of moving focus */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const ta = e.currentTarget
      const start = ta.selectionStart
      const end = ta.selectionEnd
      const newVal = code.substring(0, start) + '    ' + code.substring(end)
      setCode(newVal)
      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = start + 4
      })
    }
  }

  const lineCount = code.split('\n').length

  return (
    <div className="ce-root">
      {/* ── Top bar ── */}
      <div className="ce-topbar">
        <span className="ce-title">💻 Code Editor</span>
        <div className="ce-lang-tabs">
          {LANGS.map((l, i) => (
            <button
              key={l.compiler}
              className={`ce-lang-tab ${i === langIdx ? 'ce-lang-tab--active' : ''}`}
              onClick={() => changeLang(i)}
            >
              {l.label}
            </button>
          ))}
        </div>
        <div className="ce-actions">
          <button
            className="ce-stdin-toggle"
            onClick={() => setShowStdin(s => !s)}
            title="Toggle stdin input"
          >
            {showStdin ? '▲ stdin' : '▼ stdin'}
          </button>
          <button
            className={`ce-run-btn ${running ? 'ce-run-btn--loading' : ''}`}
            onClick={handleRun}
            disabled={running}
          >
            {running ? '⏳ Running…' : '▶ Run'}
          </button>
        </div>
      </div>

      {/* ── Editor area ── */}
      <div className="ce-editor-area">
        {/* Line numbers */}
        <div className="ce-line-nums" aria-hidden="true">
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i} className="ce-line-num">{i + 1}</div>
          ))}
        </div>
        {/* Code textarea */}
        <textarea
          ref={textareaRef}
          className="ce-textarea"
          value={code}
          onChange={e => setCode(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          title={`${lang.label} code editor`}
          aria-label={`${lang.label} code editor`}
        />
      </div>

      {/* ── Stdin ── */}
      {showStdin && (
        <div className="ce-stdin-area">
          <div className="ce-pane-label">📥 stdin (input)</div>
          <textarea
            className="ce-stdin-textarea"
            value={stdin}
            onChange={e => setStdin(e.target.value)}
            placeholder="Enter program input here…"
            spellCheck={false}
          />
        </div>
      )}

      {/* ── Output ── */}
      <div className="ce-output-area">
        <div className="ce-pane-label">
          📤 output
          {(output !== null || compileErr !== null) && (
            <button className="ce-clear-btn" onClick={() => { setOutput(null); setCompileErr(null) }}>✕ clear</button>
          )}
        </div>
        <div className="ce-output-body">
          {running && <span className="ce-running-dots">compiling &amp; running<span className="ce-dot-anim">...</span></span>}
          {!running && output === null && compileErr === null && (
            <span className="ce-placeholder">Press ▶ Run to execute your code</span>
          )}
          {compileErr && <pre className="ce-output-err">⚠ {compileErr}</pre>}
          {output !== null && !running && <pre className="ce-output-ok">{output}</pre>}
        </div>
      </div>
    </div>
  )
}

export default CodeEditorApp
