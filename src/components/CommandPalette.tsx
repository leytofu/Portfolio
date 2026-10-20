import { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import portfolio from '@/data/portfolio.json'
import { HtmlIcon, TechIcon } from './icons'

export interface SearchItem {
  id: string
  title: string
  subtitle?: string
  category: 'Pages' | 'Projects' | 'Skills' | 'Actions' | "What's Next"
  icon?: 'html' | 'tech' | 'action' | 'sparkle'
  techName?: string
  action: () => void
}

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  onToggleTerminal?: () => void
  onToggleTheme?: () => void
  onOpenReadme?: () => void
}

export function CommandPalette({
  isOpen,
  onClose,
  onToggleTerminal,
  onToggleTheme,
  onOpenReadme,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [isOpen])

  // Build searchable items
  const allItems: SearchItem[] = useMemo(() => {
    const items: SearchItem[] = []

    // 1. Pages
    items.push({
      id: 'page-home',
      title: 'Home (index.html)',
      subtitle: 'Hero, introduction, about summary, featured work',
      category: 'Pages',
      icon: 'html',
        action: () => {
          navigate('/skills')
          onClose()
        },
    })
    items.push({
      id: 'page-about',
      title: 'About (about.html)',
      subtitle: 'Experience, education, background & timeline',
      category: 'Pages',
      icon: 'html',
      action: () => {
        navigate('/about')
        onClose()
      },
    })
    items.push({
      id: 'page-projects',
      title: 'Projects (projects.html)',
      subtitle: 'Browse all shipped applications & repositories',
      category: 'Pages',
      icon: 'html',
      action: () => {
        navigate('/projects')
        onClose()
      },
    })
    items.push({
      id: 'page-skills',
      title: 'Skills (skills.html)',
      subtitle: 'Technologies, frameworks & tools I work with',
      category: 'Pages',
      icon: 'html',
      action: () => {
        navigate('/skills')
        onClose()
      },
    })
    items.push({
      id: 'page-contact',
      title: 'Contact (contact.html)',
      subtitle: 'Direct email, socials & collaboration channels',
      category: 'Pages',
      icon: 'html',
      action: () => {
        navigate('/contact')
        onClose()
      },
    })

    // 2. Projects
    portfolio.projects.forEach((p) => {
      items.push({
        id: `project-${p.id}`,
        title: p.name,
        subtitle: `${p.techStack || p.tech.join(' • ')} — ${p.tagline}`,
        category: 'Projects',
        icon: 'sparkle',
        action: () => {
          navigate(`/projects/${p.id}`)
          onClose()
        },
      })
    })

    // 3. Skills
    portfolio.coreTech.forEach((tech) => {
      items.push({
        id: `skill-${tech.name}`,
        title: tech.name,
        subtitle: `Core tech stack skill (${tech.type})`,
        category: 'Skills',
        icon: 'tech',
        techName: tech.name,
        action: () => {
          navigate('/#skills')
          onClose()
        },
      })
    })

    // 4. Actions
    items.push({
      id: 'action-terminal',
      title: 'Terminal: Toggle Integrated Terminal Panel',
      subtitle: 'Open bottom interactive VS Code bash shell (Ctrl+`)',
      category: 'Actions',
      icon: 'action',
      action: () => {
        onToggleTerminal?.()
        onClose()
      },
    })

    items.push({
      id: 'action-theme',
      title: 'Preferences: Toggle Color Theme (Light / Dark)',
      subtitle: 'Switch between VS Code dark and light theme palettes',
      category: 'Actions',
      icon: 'action',
      action: () => {
        onToggleTheme?.()
        onClose()
      },
    })

    items.push({
      id: 'action-readme',
      title: 'File: Open README.md Documentation',
      subtitle: 'Read portfolio project specification & stack details',
      category: 'Actions',
      icon: 'action',
      action: () => {
        onOpenReadme?.()
        onClose()
      },
    })

    return items
  }, [navigate, onClose, onToggleTerminal, onToggleTheme, onOpenReadme])

  // Contextual "What's Next" recommendations based on query
  const recommendations: SearchItem[] = useMemo(() => {
    const q = query.toLowerCase().trim()
    const recs: SearchItem[] = []

    if (!q || q === 'home' || q === 'index') {
      recs.push({
        id: 'rec-projects',
        title: "What's Next → Explore Featured Projects",
        subtitle: 'View Laravel Food Reservation, IslaSafe, and Local AI',
        category: "What's Next",
        icon: 'sparkle',
        action: () => {
          navigate('/projects')
          onClose()
        },
      })
      recs.push({
        id: 'rec-skills',
        title: "What's Next → Inspect Technical Skills",
        subtitle: 'Laravel, React, TypeScript, MySQL, Python, GGUF',
        category: "What's Next",
        icon: 'tech',
        techName: 'React',
        action: () => {
          navigate('/skills')
          onClose()
        },
      })
      recs.push({
        id: 'rec-terminal',
        title: "What's Next → Launch Integrated Terminal",
        subtitle: 'Run interactive CLI commands (whoami, skills, cat stack)',
        category: "What's Next",
        icon: 'action',
        action: () => {
          onToggleTerminal?.()
          onClose()
        },
      })
      recs.push({
        id: 'rec-contact',
        title: "What's Next → Contact Me",
        subtitle: 'Send an email or connect on LinkedIn/GitHub',
        category: "What's Next",
        icon: 'action',
        action: () => {
          navigate('/contact')
          onClose()
        },
      })
    } else if (q.includes('about') || q.includes('bio') || q.includes('edu')) {
      recs.push({
        id: 'rec-work',
        title: "What's Next → See Built Projects",
        subtitle: 'Review source code and project highlights',
        category: "What's Next",
        icon: 'sparkle',
        action: () => {
          navigate('/projects')
          onClose()
        },
      })
      recs.push({
        id: 'rec-contact-2',
        title: "What's Next → Reach Out",
        subtitle: 'Get in touch for internships or collaboration',
        category: "What's Next",
        icon: 'action',
        action: () => {
          navigate('/contact')
          onClose()
        },
      })
    } else if (q.includes('proj') || q.includes('work') || q.includes('app')) {
      recs.push({
        id: 'rec-github',
        title: "What's Next → Visit GitHub Profile",
        subtitle: 'github.com/leytofu — See all repositories and commits',
        category: "What's Next",
        icon: 'action',
        action: () => {
          window.open('https://github.com/leytofu', '_blank')
          onClose()
        },
      })
      recs.push({
        id: 'rec-contact-3',
        title: "What's Next → Discuss a Project",
        subtitle: 'Have an idea? Send a direct message',
        category: "What's Next",
        icon: 'action',
        action: () => {
          navigate('/contact')
          onClose()
        },
      })
    }

    return recs
  }, [query, navigate, onClose, onToggleTerminal])

  // Filtered list
  const filteredItems = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) {
      return [...recommendations, ...allItems.slice(0, 7)]
    }

    const matches = allItems.filter((item) => {
      return (
        item.title.toLowerCase().includes(q) ||
        item.subtitle?.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      )
    })

    return [...recommendations, ...matches]
  }, [query, recommendations, allItems])

  // Keep selected index in bounds
  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length))
      scrollIntoView((selectedIndex + 1) % filteredItems.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length))
      scrollIntoView((selectedIndex - 1 + filteredItems.length) % filteredItems.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const item = filteredItems[selectedIndex]
      if (item) item.action()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      onClose()
    }
  }

  const scrollIntoView = (index: number) => {
    if (!listRef.current) return
    const el = listRef.current.children[index] as HTMLElement | undefined
    if (el) {
      el.scrollIntoView({ block: 'nearest' })
    }
  }

  if (!isOpen) return null

  return (
    <div className="cmd-backdrop" onClick={onClose}>
      <div
        className="cmd-palette"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="cmd-input-wrap">
          <svg
            className="cmd-input-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            className="cmd-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type 'home', 'projects', 'skills', 'terminal' or search anything..."
            aria-label="Command search palette"
          />
          {query && (
            <button
              type="button"
              className="cmd-clear-btn"
              onClick={() => setQuery('')}
              title="Clear search"
            >
              ✕
            </button>
          )}
          <span className="cmd-shortcut-tag">ESC to close</span>
        </div>

        {/* Results List */}
        <div ref={listRef} className="cmd-results" role="listbox">
          {filteredItems.length === 0 ? (
            <div className="cmd-empty">
              <p>No matching commands, files or projects found.</p>
              <p className="cmd-empty-tip">
                Tip: Try typing "home", "about", "projects", "skills", or "terminal"
              </p>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex
              return (
                <div
                  key={item.id}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => item.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`cmd-item ${isSelected ? 'cmd-item--selected' : ''}`}
                >
                  <div className="cmd-item__icon-box">
                    {item.icon === 'html' && <HtmlIcon />}
                    {item.icon === 'tech' && item.techName && (
                      <TechIcon name={item.techName} />
                    )}
                    {item.icon === 'sparkle' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    )}
                    {item.icon === 'action' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="4 17 10 11 4 5" />
                        <line x1="12" y1="19" x2="20" y2="19" />
                      </svg>
                    )}
                    {!item.icon && <HtmlIcon />}
                  </div>

                  <div className="cmd-item__info">
                    <div className="cmd-item__title-row">
                      <span className="cmd-item__title">{item.title}</span>
                      <span className={`cmd-category-tag cmd-category-tag--${item.category.replace(/[^a-z]/gi, '').toLowerCase()}`}>
                        {item.category}
                      </span>
                    </div>
                    {item.subtitle && (
                      <span className="cmd-item__subtitle">{item.subtitle}</span>
                    )}
                  </div>

                  <span className="cmd-item__enter-hint">↵ Enter</span>
                </div>
              )
            })
          )}
        </div>

        {/* Footer info bar */}
        <div className="cmd-footer">
          <div className="cmd-footer__left">
            <span>↑↓ to navigate</span>
            <span>•</span>
            <span>↵ to select</span>
            <span>•</span>
            <span>esc to dismiss</span>
          </div>
          <div className="cmd-footer__right">
            <span>Portfolio Quick Open</span>
          </div>
        </div>
      </div>
    </div>
  )
}
