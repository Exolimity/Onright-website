import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { site } from '../../config/site'
import { useMessages } from '../../i18n'
import './Header.css'

export function Header() {
  const t = useMessages()
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { to: '/diensten', label: t.nav.services },
    { to: '/werk', label: t.nav.work },
    { to: '/over-ons', label: t.nav.about },
    { to: '/contact', label: t.nav.contact },
  ]

  // Close the mobile menu whenever the page changes.
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // …and on Escape, so keyboard users are never stuck in it.
  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <header className="header">
      <div className="container header__inner">
        <Link className="header__brand" to="/">
          {site.name}
        </Link>

        <nav
          id="main-nav"
          className={`header__nav${menuOpen ? ' header__nav--open' : ''}`}
          aria-label={t.nav.mainLabel}
        >
          <ul className="header__list">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink className="header__link" to={link.to}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <Link className="btn btn--primary header__cta" to="/contact">
          {t.nav.cta}
        </Link>

        <button
          type="button"
          className="header__toggle"
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={`header__bars${menuOpen ? ' header__bars--open' : ''}`} aria-hidden="true" />
        </button>
      </div>
    </header>
  )
}
