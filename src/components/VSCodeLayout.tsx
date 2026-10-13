import { useState, useMemo, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import portfolio from '@/data/portfolio.json'
import { ThemeToggle } from '@/components/ThemeToggle'
import { CommandPalette } from '@/components/CommandPalette'
import { TerminalPanel } from '@/components/TerminalPanel'
import { HtmlIcon, CssIcon, TailwindIcon, VscodeIcon } from './icons'
import { useResumeAvailable } from '@/hooks/useResumeAvailable'

interface TabItem {
  id: string
  label: string
  path: string
}

const TABS: TabItem[] = [
  { id: 'index', label: 'index.html', path: '/' },
  { id: 'about', label: 'about.html', path: '/about' },
  { id: 'projects', label: 'projects.html', path: '/projects' },
  { id: 'skills', label: 'skills.html', path: '/skills' },
  { id: 'resume', label: 'resume.html', path: '/resume' },
  { id: 'contact', label: 'contact.html', path: '/contact' },
]

export function VSCodeLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeActivity, setActiveActivity] = useState<'explorer' | 'search' | 'git' | 'settings'>('explorer')
  const [closedTabIds, setClosedTabIds] = useState<string[]>([])
  const [showReadmeModal, setShowReadmeModal] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [terminalOpen, setTerminalOpen] = useState(false)
  const resumeStatus = useResumeAvailable()
  const resumeReady = resumeStatus === 'ready'

  // Find active tab from current pathname
  const currentTab = TABS.find((t) => {
    if (t.path === '/') return location.pathname === '/'
    return location.pathname.startsWith(t.path)
  })

  // Derive open tabs
  const openTabIds = useMemo(() => {
    const ids = TABS.filter((t) => !closedTabIds.includes(t.id)).map((t) => t.id)
    if (currentTab && !ids.includes(currentTab.id)) ids.push(currentTab.id)
    return ids
  }, [closedTabIds, currentTab])

  const closeTab = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation()
    setClosedTabIds((prev) => (prev.includes(tabId) ? prev : [...prev, tabId]))
    if (currentTab?.id === tabId) {
      const remaining = openTabIds.filter((id) => id !== tabId)
      const fallbackTab = TABS.find((t) => remaining.includes(t.id))
      navigate(fallbackTab ? fallbackTab.path : '/')
    }
  }

  const toggleTheme = () => {
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light'
    const nextTheme = isDark ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', nextTheme)
    document.documentElement.classList.toggle('dark', nextTheme === 'dark')
    try {
      localStorage.setItem('theme', nextTheme)
    } catch {
      /* storage unavailable */
    }
  }

  // Global Keyboard Shortcuts: Ctrl+P/Ctrl+K (search), Ctrl+` (terminal)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isModKey = e.ctrlKey || e.metaKey

      if (isModKey && (e.key === 'p' || e.key === 'k' || e.key === 'P' || e.key === 'K')) {
        e.preventDefault()
        setSearchOpen(true)
      } else if (isModKey && e.key === '`') {
        e.preventDefault()
        setTerminalOpen((prev) => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleMenuAction = (menu: string, item: string) => {
    switch (item) {
      case 'Go to File':
      case 'Find':
        setSearchOpen(true)
        break
      case 'Toggle Terminal':
        setTerminalOpen((prev) => !prev)
        break
      case 'New Terminal':
        setTerminalOpen(true)
        break
      case 'Toggle Explorer':
      case 'Explorer':
        setActiveActivity('explorer')
        setSidebarOpen((prev) => !prev)
        break
      case 'Toggle Theme':
        toggleTheme()
        break
      case 'Download CV':
        window.location.href = `mailto:${portfolio.hero.email}?subject=CV Request`
        break
      case 'README':
        setShowReadmeModal(true)
        break
      case 'Home':
        navigate('/')
        break
      case 'About':
        navigate('/about')
        break
      case 'Projects':
        navigate('/projects')
        break
      case 'Skills':
        navigate('/skills')
        break
      case 'Contact':
        navigate('/contact')
        break
      default:
        console.info(`Menu action triggered: ${menu} > ${item}`)
        break
    }
  }

  return (
    <div className="vscode-window">
      {/* ================= 1. WINDOW TITLE BAR ================= */}
      <header className="titlebar">
        {/* Left Menu Items */}
        <div className="titlebar__left">
          <div className="titlebar__logo">
            <VscodeIcon className="titlebar__logo-icon" />
          </div>

          <nav className="titlebar__menu" aria-label="Editor Menu">
            {/* File Menu */}
            <div className="menu-dropdown">
              <button type="button" className="titlebar__menu-item">File</button>
              <div className="menu-dropdown__content">
                <button onClick={() => handleMenuAction('File', 'Go to File')}>Go to File… <span className="menu-shortcut">Ctrl+P</span></button>
                <button onClick={() => handleMenuAction('File', 'Home')}>Open Home Page</button>
                <button onClick={() => handleMenuAction('File', 'About')}>Open About Page</button>
                <button onClick={() => handleMenuAction('File', 'Projects')}>Open Projects Page</button>
                <button onClick={() => handleMenuAction('File', 'Skills')}>Open Skills Page</button>
                <button onClick={() => handleMenuAction('File', 'Contact')}>Open Contact Page</button>
                <hr />
                <button onClick={() => handleMenuAction('File', 'Download CV')}>Download CV / Resume</button>
              </div>
            </div>

            <button type="button" className="titlebar__menu-item">Edit</button>
            <button type="button" className="titlebar__menu-item">Selection</button>

            {/* View Menu */}
            <div className="menu-dropdown">
              <button type="button" className="titlebar__menu-item">View</button>
              <div className="menu-dropdown__content">
                <button onClick={() => handleMenuAction('View', 'Explorer')}>Explorer</button>
                <button onClick={() => handleMenuAction('View', 'Toggle Explorer')}>Toggle Sidebar <span className="menu-shortcut">Ctrl+B</span></button>
                <button onClick={() => handleMenuAction('View', 'Toggle Theme')}>Toggle Color Theme</button>
              </div>
            </div>

            <button type="button" className="titlebar__menu-item">Go</button>
            <button type="button" className="titlebar__menu-item">Run</button>

            {/* Terminal Menu */}
            <div className="menu-dropdown">
              <button type="button" className="titlebar__menu-item">Terminal</button>
              <div className="menu-dropdown__content">
                <button onClick={() => handleMenuAction('Terminal', 'New Terminal')}>New Terminal</button>
                <button onClick={() => handleMenuAction('Terminal', 'Toggle Terminal')}>Toggle Terminal Panel <span className="menu-shortcut">Ctrl+`</span></button>
              </div>
            </div>

            {/* Help Menu */}
            <div className="menu-dropdown">
              <button type="button" className="titlebar__menu-item">Help</button>
              <div className="menu-dropdown__content">
                <button onClick={() => handleMenuAction('Help', 'README')}>Documentation (README.md)</button>
                <button onClick={() => setSearchOpen(true)}>Command Palette / Search <span className="menu-shortcut">Ctrl+P</span></button>
              </div>
            </div>
          </nav>
        </div>

        {/* Center Window Title / Quick Open Search Trigger */}
        <button
          type="button"
          onClick={() => setSearchOpen(true)}
          title="Search files, projects & commands (Ctrl+P)"
          className="titlebar__center titlebar__center--btn"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <span>Search files, projects, skills, or type a command…</span>
          <span className="cmd-ctrl-tag">Ctrl+P</span>
        </button>

        {/* Right Controls */}
        <div className="titlebar__right">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title="Toggle Sidebar"
            className="titlebar__toggle"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M9 3v18" />
            </svg>
          </button>
          <div className="titlebar__win-controls">
            <button type="button" className="titlebar__win-control">─</button>
            <button type="button" className="titlebar__win-control">▢</button>
            <button type="button" className="titlebar__win-control titlebar__win-control--close">✕</button>
          </div>
        </div>
      </header>

      {/* ================= MAIN WORKSPACE BODY ================= */}
      <div className="workspace">

        {/* ================= 2. LEFT ACTIVITY BAR ================= */}
        <aside className="activitybar">
          <div className="activitybar__top">
            {/* Explorer */}
            <button
              type="button"
              onClick={() => {
                setActiveActivity('explorer')
                setSidebarOpen(!sidebarOpen)
              }}
              title="Explorer (Ctrl+Shift+E)"
              className={`activity-btn ${
                activeActivity === 'explorer' && sidebarOpen ? 'activity-btn--active' : ''
              }`}
            >
              {activeActivity === 'explorer' && sidebarOpen && (
                <span className="activity-btn__indicator" />
              )}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                <polyline points="13 2 13 9 20 9" />
              </svg>
            </button>

            {/* Search & Quick Open */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              title="Search & Quick Open (Ctrl+P)"
              className={`activity-btn ${activeActivity === 'search' ? 'activity-btn--active' : ''}`}
            >
              {activeActivity === 'search' && <span className="activity-btn__indicator" />}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>

            {/* Source Control */}
            <a
              href="https://github.com/leytofu"
              target="_blank"
              rel="noreferrer"
              title="Source Control (GitHub)"
              className="activity-btn"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <line x1="6" y1="3" x2="6" y2="15" />
                <circle cx="18" cy="6" r="3" />
                <circle cx="6" cy="18" r="3" />
                <path d="M18 9a9 9 0 0 1-9 9" />
              </svg>
              <span className="activity-btn__badge" />
            </a>

            {/* Extensions */}
            <button
              type="button"
              onClick={() => setShowReadmeModal(true)}
              title="README & Documentation"
              className="activity-btn"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
              </svg>
            </button>
          </div>

          <div className="activitybar__bottom">
            <a href={`mailto:${portfolio.hero.email}`} title="Account Contact" className="activity-avatar">
              leych
            </a>
            <button
              type="button"
              onClick={() => navigate('/contact')}
              title="Settings & Contact"
              className="activity-btn"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>
          </div>
        </aside>

        {/* ================= 3. FILE EXPLORER SIDEBAR ================= */}
        <aside className={`explorer ${sidebarOpen ? 'explorer--open' : ''}`}>
          <div className="explorer__title">
            <span>EXPLORER</span>
            <span className="explorer__actions">•••</span>
          </div>

          <div className="explorer__tree">
            <div className="explorer__project">
              <div className="explorer__project-name">
                <span className="explorer__caret">∨</span>
                <span>MY-PORTFOLIO</span>
              </div>

              <div className="explorer__children">
                {/* assets folder */}
                <div>
                  <button type="button" className="explorer__folder">
                    <span className="explorer__folder-arrow">∨</span>
                    <span>assets</span>
                  </button>
                  <div className="explorer__sub">
                    <button type="button" className="explorer__folder">
                      <span className="explorer__folder-arrow">∨</span>
                      <span>css</span>
                    </button>
                    <div className="explorer__sub">
                      <div className="explorer__file">
                        <CssIcon />
                        <span>style.css</span>
                      </div>
                      <div className="explorer__file">
                        <TailwindIcon />
                        <span>tailwind.css</span>
                      </div>
                    </div>
{/*
                    <button type="button" className="explorer__folder">
                      <span className="explorer__folder-arrow">&gt;</span>
                      <span>js</span>
                    </button>
*/}
                    <button type="button" className="explorer__folder">
                      <span className="explorer__folder-arrow">&gt;</span>
                      <span>images</span>
                    </button>
                  </div>
                </div>

                {/* pages folder */}
                <div>
                  <button type="button" className="explorer__folder">
                    <span className="explorer__folder-arrow">∨</span>
                    <span>pages</span>
                  </button>
                  
                  <div className="explorer__sub">
                    {TABS.map((tab) => {
                      const isActive = currentTab?.id === tab.id
                      return (
                        <Link
                          key={tab.id}
                          to={tab.path}
                          onClick={() => {
                            if (window.innerWidth < 768) setSidebarOpen(false)
                          }}
                          className={`explorer__link ${
                            isActive ? 'explorer__link--active' : ''
                          }`}
                        >
                          <HtmlIcon />
                          <span>{tab.label}</span>
                        </Link>
                      )
                    })}
                  </div>
                </div>

                {/* README.md */}
                <button
                  type="button"
                  onClick={() => setShowReadmeModal(true)}
                  className="explorer__file explorer__file--readme"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="explorer__readme-icon">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  <span>README.md</span>
                </button>
              </div>
            </div>

            <div className="explorer__sections">
              <button type="button" className="explorer__section">
                <span>&gt;</span> OUTLINE
              </button>
              <button type="button" className="explorer__section">
                <span>&gt;</span> TIMELINE
              </button>
            </div>
          </div>
        </aside>

        {/* ================= 4. EDITOR CONTAINER ================= */}
        <main className="editor">
          
          {/* Top Editor Tab Bar */}
          <div className="tabbar">
            <div className="tabbar__tabs">
              {TABS.filter((t) => openTabIds.includes(t.id)).map((tab) => {
                const isActive = currentTab?.id === tab.id
                return (
                  <div
                    key={tab.id}
                    onClick={() => navigate(tab.path)}
                    className={`tab ${isActive ? 'tab--active' : ''}`}
                  >
                    <HtmlIcon />
                    <span>{tab.label}</span>
                    <button
                      type="button"
                      onClick={(e) => closeTab(e, tab.id)}
                      className="tab__close"
                    >
                      ✕
                    </button>
                  </div>
                )
              })}
            </div>

            <div className="tabbar__crumb">
              <span>pages</span>
              <span>&gt;</span>
              <span className="current">{currentTab?.label || 'index.html'}</span>
            </div>
          </div>

          {/* ================= INTERNAL NAV BAR INSIDE EDITOR ================= */}
          <header className="inner-nav">
            {/* Logo */}
            <Link to="/" className="inner-nav__logo">
              <span className="lt">&lt;/&gt;</span>
              <span className="fn">{portfolio.hero.firstName}</span>
              <span className="ln">{portfolio.hero.lastName}</span>
            </Link>

            {/* Desktop Links */}
            <nav className="inner-nav__links" aria-label="Editor Inner Navigation">
              {portfolio.navLinks.map((link) => {
                const [pathOnly, hashOnly] = link.url.split('#')
                const basePath = pathOnly || '/'
                const targetHash = hashOnly ? `#${hashOnly}` : ''
                const active =
                  location.pathname === basePath &&
                  (!targetHash ? location.hash === '' : location.hash === targetHash)
                return (
                  <Link
                    key={link.id}
                    to={link.url}
                    className={`inner-nav__link ${active ? 'inner-nav__link--active' : ''}`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>

            {/* Download CV + Theme Switcher + Hamburger */}
            <div className="inner-nav__actions">
              <Link to="/resume" className={`btn-cv ${resumeReady ? '' : 'btn-cv--ghost'}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>Download CV</span>
              </Link>

              <button
                type="button"
                onClick={() => setTerminalOpen(!terminalOpen)}
                title="Toggle Integrated Terminal (Ctrl+`)"
                className="term-toggle-btn"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="4 17 10 11 4 5" />
                  <line x1="12" y1="19" x2="20" y2="19" />
                </svg>
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
                className="hamburger"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {mobileMenuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
              </button>
            </div>
          </header>

          {/* Mobile Nav Overlay */}
          {mobileMenuOpen && (
            <nav className="mobile-nav">
              {portfolio.navLinks.map((link) => (
                <Link
                  key={link.id}
                  to={link.url}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}

          {/* ================= MAIN SCROLLABLE VIEWPORT ================= */}
          <div id="editor-scroll-container" className="editor__scroll">
            {children}
          </div>

          {/* ================= 6. INTEGRATED TERMINAL PANEL ================= */}
          <TerminalPanel
            isOpen={terminalOpen}
            onClose={() => setTerminalOpen(false)}
            onToggleTheme={toggleTheme}
          />
        </main>
      </div>

      {/* ================= 5. BOTTOM STATUS BAR ================= */}
      <footer className="statusbar">
        {/* Left Git & Status */}
        <div className="statusbar__left">
          <a href="https://github.com/leytofu" target="_blank" rel="noreferrer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="6" y1="3" x2="6" y2="15" />
              <circle cx="18" cy="6" r="3" />
              <circle cx="6" cy="18" r="3" />
              <path d="M18 9a9 9 0 0 1-9 9" />
            </svg>
            <span>main*</span>
          </a>
          <span className="statusbar__sep">|</span>
          <div className="statusbar__problems">
            <span>⊗ 0</span>
            <span>⚠ 0</span>
          </div>

          {/* Quick Terminal Trigger */}
          <button
            type="button"
            onClick={() => setTerminalOpen(!terminalOpen)}
            className="statusbar-term-btn"
            title="Toggle Terminal (Ctrl+`)"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="4 17 10 11 4 5" />
              <line x1="12" y1="19" x2="20" y2="19" />
            </svg>
            <span>Terminal</span>
          </button>
        </div>

        {/* Center Tagline */}
        <div className="statusbar__center">
          <span>© 2025 {portfolio.hero.name}. All rights reserved.</span>
          <span className="statusbar__sep">•</span>
          <span className="tagline">Code • Build • Improve</span>
        </div>

        {/* Right Line Specs */}
        <div className="statusbar__right">
          <span>✓✓Prettier</span>
          <span className="spaces">⏱︎Today: 1h 7m</span>
          <span>UTF-8</span>
          <span>LF</span>
          <span className="lang">HTML</span>
          <span className="bell">🔔</span>
        </div>
      </footer>

      {/* ================= 7. COMMAND PALETTE / QUICK OPEN ================= */}
      <CommandPalette
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onToggleTerminal={() => setTerminalOpen(true)}
        onToggleTheme={toggleTheme}
        onOpenReadme={() => setShowReadmeModal(true)}
      />

      {/* ================= README MODAL ================= */}
      {showReadmeModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal__head">
              <div className="modal__head-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                <h3>README.md — {portfolio.hero.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowReadmeModal(false)}
                className="modal__close"
              >
                ✕
              </button>
            </div>

            <div className="modal__body">
              <h1># {portfolio.hero.name} — Portfolio Dashboard</h1>
              <p>{portfolio.hero.bio}</p>
              <p>{portfolio.hero.about}</p>

              <h2>## Core Stack</h2>
              <ul>
                <li>Laravel 12 & PHP</li>
                <li>React & TypeScript</li>
                <li>MySQL & PostgreSQL</li>
                <li>Python & GGUF Local LLMs</li>
                <li>Tailwind CSS & MapLibre GL</li>
              </ul>

              <h2>## Featured Projects</h2>
              {portfolio.projects.map((p) => (
                <div key={p.id} className="modal__proj">
                  <h4>{p.name}</h4>
                  <p>{p.tagline}</p>
                </div>
              ))}
            </div>

            <div className="modal__foot">
              <button
                type="button"
                onClick={() => setShowReadmeModal(false)}
                className="modal__btn-primary"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
