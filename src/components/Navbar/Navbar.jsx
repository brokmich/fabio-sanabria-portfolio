import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useTheme, THEME_INFO } from '../../context/ThemeContext'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'ABOUT',      href: '#about',      icon: '📜' },
  { label: 'EXPERIENCE', href: '#experience', icon: '⚔️'  },
  { label: 'SKILLS',     href: '#skills',     icon: '⭐'  },
  { label: 'PROJECTS',   href: '#projects',   icon: '🗺️'  },
  { label: 'CONTACT',    href: '#contact',    icon: '✉️'  },
]

export default function Navbar() {
  const { theme, cycleTheme } = useTheme()
  const time = THEME_INFO[theme]

  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [active,    setActive]    = useState('')
  const [hovered,   setHovered]   = useState(null)
  const [sparkling, setSparkling] = useState(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleNavClick = (href, label) => {
    setActive(href)
    setMenuOpen(false)
    setSparkling(label)
    setTimeout(() => setSparkling(null), 700)
  }

  return (
    <>
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__inner">

        <a href="#" className="navbar__logo" onClick={() => setActive('')}>
          <span className="navbar__logo-star">✦</span>
          <span className="navbar__logo-text">FASV</span>
        </a>

        <button className="navbar__time-badge" onClick={cycleTheme} title="Change time of day">
          <span>{time.emoji}</span>
          <span className="navbar__time-label">{time.label}</span>
        </button>

        <ul className="navbar__links">
          {NAV_LINKS.map(({ label, href, icon }) => {
            const isActive    = active === href
            const isHovered   = hovered === label
            const isSparkling = sparkling === label

            return (
              <li key={href} className="navbar__item">
                <a
                  href={href}
                  className={`navbar__link${isActive ? ' navbar__link--active' : ''}`}
                  onMouseEnter={() => setHovered(label)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => handleNavClick(href, label)}
                >
                  <span
                    className={`navbar__link-icon${isHovered || isActive ? ' navbar__link-icon--show' : ''}`}
                    aria-hidden="true"
                  >
                    {icon}
                  </span>
                  <span className="navbar__link-text">{label}</span>
                  {isSparkling && (
                    <span className="navbar__sparkle" aria-hidden="true">✦</span>
                  )}
                </a>
                {isHovered && (
                  <div className="navbar__tooltip" role="tooltip">
                    {icon} {label}
                  </div>
                )}
              </li>
            )
          })}
        </ul>

        <button className="navbar__time-badge navbar__time-badge--mobile" onClick={cycleTheme} title="Change time of day">
          <span>{time.emoji}</span>
          <span className="navbar__time-label">{time.label}</span>
        </button>

        <button
          className={`navbar__hamburger${menuOpen ? ' navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

    </nav>

    {createPortal(
        <div className={`navbar__mobile${menuOpen ? ' navbar__mobile--open' : ''}`}>
          <div className="navbar__mobile-header">
            <span className="navbar__mobile-title">MENU</span>
            <button className="navbar__mobile-close" onClick={() => setMenuOpen(false)} aria-label="Close">✕</button>
          </div>
          <ul>
            {NAV_LINKS.map(({ label, href, icon }) => (
              <li key={href}>
                <a
                  href={href}
                  className={`navbar__mobile-link${active === href ? ' navbar__mobile-link--active' : ''}`}
                  onClick={() => handleNavClick(href, label)}
                >
                  <span className="navbar__mobile-icon">{icon}</span>
                  <span>{label}</span>
                  <span className="navbar__mobile-arrow">▶</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="navbar__mobile-footer">
            <button className="navbar__time-badge" onClick={cycleTheme} title="Change time of day">
              <span>{time.emoji}</span>
              <span className="navbar__time-label">{time.label}</span>
            </button>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
