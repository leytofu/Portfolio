import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import portfolio from '@/data/portfolio.json'
import { setTheme } from '@/hooks/useTheme'

interface OutputLine {
  id: string
  type: 'prompt' | 'text' | 'error' | 'success' | 'info'
  content: string
  reveal?: boolean
}

interface TerminalPanelProps {
  isOpen: boolean
  onClose: () => void
  onToggleTheme?: () => void
}

const WHOAMI_OUTPUT = `${portfolio.hero.name} — ${portfolio.hero.role}\n${portfolio.hero.bio}\nLocation: ${portfolio.hero.location} | Status: ${portfolio.hero.status}`

export function TerminalPanel({ isOpen, onClose, onToggleTheme }: TerminalPanelProps) {
  const [activeTab, setActiveTab] = useState<'terminal' | 'problems' | 'output' | 'debug'>('terminal')
  const [inputVal, setInputVal] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [lines, setLines] = useState<OutputLine[]>([
    {
      id: 'welcome-1',
      type: 'info',
      content: 'VS Code Integrated Terminal — v1.98.0 (bash)',
    },
    {
      id: 'welcome-2',
      type: 'text',
      content: `Welcome to ${portfolio.hero.name}'s developer terminal! Type 'help' to see available commands.`,
    },
  ])

  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const introPlayedRef = useRef(false)

  useEffect(() => {
    if (isOpen && activeTab === 'terminal') {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen, activeTab])

  // The first time the panel opens, type `whoami` and print its result
  // automatically. It only runs once so reopening keeps the user's history.
  useEffect(() => {
    if (!isOpen || introPlayedRef.current) return

    const command = 'whoami'
    const timers: number[] = []
    let cancelled = false

    const schedule = (fn: () => void, delay: number) => {
      timers.push(window.setTimeout(fn, delay))
    }

    setInputVal('')
    setIsTyping(true)

    const typeCommand = (index: number) => {
      if (cancelled) return
      setInputVal(command.slice(0, index))

      if (index < command.length) {
        schedule(() => typeCommand(index + 1), 95)
        return
      }

      // "Press Enter": echo the command and reveal the output.
      schedule(() => {
        if (cancelled) return
        setLines((prev) => [
          ...prev,
          { id: 'intro-cmd', type: 'prompt', content: `$ ${command}` },
          { id: 'intro-out', type: 'success', content: WHOAMI_OUTPUT, reveal: true },
        ])
        setInputVal('')
        setIsTyping(false)
        introPlayedRef.current = true
      }, 360)
    }

    schedule(() => typeCommand(1), 320)

    return () => {
      cancelled = true
      timers.forEach((timer) => window.clearTimeout(timer))
      setInputVal('')
      setIsTyping(false)
    }
  }, [isOpen])

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [lines])

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim()
    const args = trimmed.split(' ').filter(Boolean)
    const primary = args[0]?.toLowerCase() ?? ''

    const newLines: OutputLine[] = [
      ...lines,
      { id: `cmd-${Date.now()}`, type: 'prompt', content: `$ ${trimmed}` },
    ]

    if (!trimmed) {
      setLines(newLines)
      return
    }

    setHistory((prev) => [...prev, trimmed])
    setHistoryIndex(-1)

    switch (primary) {
      case 'help':
        newLines.push({
          id: `out-${Date.now()}-1`,
          type: 'info',
          content: 'AVAILABLE CLI COMMANDS:',
        })
        newLines.push({
          id: `out-${Date.now()}-2`,
          type: 'text',
          content: `  whoami              Print bio and details for ${portfolio.hero.name}
  ls                  List directory files and folders
  cat <file>          Print file contents (e.g., 'cat README.md', 'cat stack.txt')
  skills              Display technical stack breakdown
  projects            List featured applications & GitHub repositories
  open <page>         Navigate to page (home, about, projects, skills, contact)
  theme [light|dark]  Switch color palette
  contact             Show email and social profiles
  cv                  Request CV copy
  date                Print current timestamp
  clear               Clear terminal buffer
  exit                Close the terminal panel
  help                Display this manual`,
        })
        break

      case 'whoami':
        newLines.push({
          id: `out-${Date.now()}`,
          type: 'success',
          content: WHOAMI_OUTPUT,
        })
        break

      case 'ls':
        newLines.push({
          id: `out-${Date.now()}`,
          type: 'text',
          content: 'index.html    about.html    projects.html    contact.html    README.md    stack.txt    portfolio.json',
        })
        break

      case 'cat': {
        const target = args[1]?.toLowerCase()
        if (!target) {
          newLines.push({ id: `err-${Date.now()}`, type: 'error', content: 'cat: missing file argument. Try "cat README.md" or "cat stack.txt"' })
        } else if (target === 'readme.md' || target === 'readme') {
          newLines.push({ id: `out-${Date.now()}`, type: 'text', content: `# ${portfolio.hero.name} — Portfolio\n${portfolio.hero.about || portfolio.hero.bio}` })
        } else if (target === 'stack.txt' || target === 'stack') {
          newLines.push({ id: `out-${Date.now()}`, type: 'text', content: 'Laravel 12 · PHP · React · TypeScript · MySQL · Python · PyTorch · Tailwind CSS' })
        } else if (target === 'portfolio.json') {
          newLines.push({ id: `out-${Date.now()}`, type: 'text', content: JSON.stringify(portfolio.hero, null, 2) })
        } else {
          newLines.push({ id: `err-${Date.now()}`, type: 'error', content: `cat: ${args[1]}: No such file or directory` })
        }
        break
      }

      case 'skills':
        portfolio.skills.forEach((group, idx) => {
          newLines.push({
            id: `out-sk-${Date.now()}-${idx}`,
            type: 'info',
            content: `[${group.category}] ${group.items.join(', ')}`,
          })
        })
        break

      case 'projects':
        portfolio.projects.forEach((p, idx) => {
          newLines.push({
            id: `out-pj-${Date.now()}-${idx}`,
            type: 'text',
            content: `• ${p.name} (${p.period}) — ${p.tagline}\n  Source: ${p.url}`,
          })
        })
        break

      case 'open': {
        const dest = args[1]?.toLowerCase()
        if (!dest || dest === 'home' || dest === 'index.html') {
          navigate('/')
          newLines.push({ id: `out-${Date.now()}`, type: 'success', content: 'Navigated to Home (index.html)' })
        } else if (dest === 'about' || dest === 'about.html') {
          navigate('/about')
          newLines.push({ id: `out-${Date.now()}`, type: 'success', content: 'Navigated to About (about.html)' })
        } else if (dest === 'projects' || dest === 'projects.html') {
          navigate('/projects')
          newLines.push({ id: `out-${Date.now()}`, type: 'success', content: 'Navigated to Projects (projects.html)' })
        } else if (dest === 'contact' || dest === 'contact.html') {
          navigate('/contact')
          newLines.push({ id: `out-${Date.now()}`, type: 'success', content: 'Navigated to Contact (contact.html)' })
        } else if (dest === 'skills' || dest === 'skills.html') {
          navigate('/skills')
          newLines.push({ id: `out-${Date.now()}`, type: 'success', content: 'Navigated to Skills (skills.html)' })
        } else {
          newLines.push({ id: `err-${Date.now()}`, type: 'error', content: `open: unknown page '${args[1]}'. Choose: home, about, projects, skills, contact` })
        }
        break
      }

      case 'theme': {
        const targetTheme = args[1]?.toLowerCase()
        if (targetTheme === 'toggle' || !targetTheme) {
          onToggleTheme?.()
          newLines.push({ id: `out-${Date.now()}`, type: 'success', content: 'Theme toggled!' })
        } else if (targetTheme === 'light' || targetTheme === 'dark') {
          setTheme(targetTheme)
          newLines.push({ id: `out-${Date.now()}`, type: 'success', content: `Theme updated to ${targetTheme}!` })
        } else {
          newLines.push({ id: `err-${Date.now()}`, type: 'error', content: 'Usage: theme [light|dark|toggle]' })
        }
        break
      }

      case 'contact':
      case 'email':
        newLines.push({
          id: `out-${Date.now()}`,
          type: 'text',
          content: `Email: ${portfolio.hero.email}\nGitHub: https://github.com/leytofu\nLinkedIn: https://linkedin.com/in/charlie-boyles`,
        })
        break

      case 'cv':
        window.location.href = `mailto:${portfolio.hero.email}?subject=CV Request`
        newLines.push({ id: `out-${Date.now()}`, type: 'success', content: 'Opening email client for CV request...' })
        break

      case 'date':
        newLines.push({ id: `out-${Date.now()}`, type: 'text', content: new Date().toString() })
        break

      case 'pwd':
        newLines.push({ id: `out-${Date.now()}`, type: 'text', content: '/home/charlie/my-portfolio' })
        break

      case 'echo':
        newLines.push({ id: `out-${Date.now()}`, type: 'text', content: args.slice(1).join(' ') })
        break

      case 'clear':
        setLines([])
        return

      case 'exit':
      case 'quit':
        onClose()
        return

      default:
        newLines.push({
          id: `err-${Date.now()}`,
          type: 'error',
          content: `bash: ${primary}: command not found. Type 'help' for available commands.`,
        })
        break
    }

    setLines(newLines)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isTyping) return

    if (e.key === 'Enter') {
      e.preventDefault()
      executeCommand(inputVal)
      setInputVal('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length === 0) return
      const nextIdx = historyIndex + 1
      if (nextIdx < history.length) {
        setHistoryIndex(nextIdx)
        setInputVal(history[history.length - 1 - nextIdx] ?? '')
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1
        setHistoryIndex(nextIdx)
        setInputVal(history[history.length - 1 - nextIdx] ?? '')
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setInputVal('')
      }
    }
  }

  if (!isOpen) return null

  return (
    <div className={`term-panel ${isMaximized ? 'term-panel--maximized' : ''}`}>
      {/* Header Tab Bar */}
      <div className="term-panel__header">
        <div className="term-panel__tabs">
          <button
            type="button"
            onClick={() => setActiveTab('problems')}
            className={`term-panel__tab ${activeTab === 'problems' ? 'term-panel__tab--active' : ''}`}
          >
            PROBLEMS <span className="term-badge">0</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('output')}
            className={`term-panel__tab ${activeTab === 'output' ? 'term-panel__tab--active' : ''}`}
          >
            OUTPUT
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('debug')}
            className={`term-panel__tab ${activeTab === 'debug' ? 'term-panel__tab--active' : ''}`}
          >
            DEBUG CONSOLE
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('terminal')}
            className={`term-panel__tab ${activeTab === 'terminal' ? 'term-panel__tab--active' : ''}`}
          >
            TERMINAL
          </button>
        </div>

        {/* Right Controls */}
        <div className="term-panel__actions">
          <span className="term-panel__shell-name">1: bash</span>
          <button
            type="button"
            onClick={() => setLines([])}
            title="Clear Terminal (trash)"
            className="term-panel__btn"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => setIsMaximized(!isMaximized)}
            title={isMaximized ? 'Restore Size' : 'Maximize Panel'}
            className="term-panel__btn"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {isMaximized ? (
                <polyline points="4 14 10 14 10 20 20 10 14 10 14 4" />
              ) : (
                <polyline points="15 3 21 3 21 9 9 21 3 21 3 15" />
              )}
            </svg>
          </button>
          <button
            type="button"
            onClick={onClose}
            title="Close Panel"
            className="term-panel__btn term-panel__btn--close"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Body Area */}
      <div
        ref={bodyRef}
        className="term-panel__body"
        onClick={() => inputRef.current?.focus()}
      >
        {activeTab === 'problems' && (
          <div className="term-panel__placeholder">
            <p className="term-success">✓ No problems have been detected in the workspace.</p>
          </div>
        )}

        {activeTab === 'output' && (
          <div className="term-panel__placeholder term-panel__placeholder--log">
            <p>[Info  - 12:00:00 AM] Portfolio build client initialized successfully.</p>
            <p>[Info  - 12:00:01 AM] Vite dev server ready at http://localhost:5173/</p>
          </div>
        )}

        {activeTab === 'debug' && (
          <div className="term-panel__placeholder term-panel__placeholder--log">
            <p>&gt; Debugger attached (Node v22.0.0).</p>
          </div>
        )}

        {activeTab === 'terminal' && (
          <div className="term-lines">
            {lines.map((line) => (
              <div
                key={line.id}
                className={`term-line term-line--${line.type}${line.reveal ? ' term-line--reveal' : ''}`}
              >
                {line.type === 'prompt' ? (
                  <span className="term-prompt">{line.content}</span>
                ) : (
                  <pre className="term-output">{line.content}</pre>
                )}
              </div>
            ))}

            {/* Active Prompt Line */}
            <div className="term-input-line">
              <span className="term-prompt-prefix">charlie@portfolio:~$</span>
              <input
                ref={inputRef}
                type="text"
                className={`term-input${isTyping ? ' term-input--typing' : ''}`}
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                readOnly={isTyping}
                aria-busy={isTyping}
                aria-label="Terminal command input"
                spellCheck={false}
                autoComplete="off"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
