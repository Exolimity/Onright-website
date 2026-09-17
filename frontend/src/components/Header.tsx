import { useEffect, useState } from 'react'
import { company, navLinks } from '../data/site'
import './Header.css'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu on Escape so keyboard users are never trapped.
  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
      <div className="container header__inner">
        <a className="header__brand" href="#top" onClick={() => setMenuOpen(false)}>
          <span className="header__mark" aria-hidden="true">
            O
          </span>
          <span className="header__name">{company.name}</span>
        </a>

        <nav className={`header__nav${menuOpen ? ' header__nav--open' : ''}`} aria-label="Main">
          <ul className="header__list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a className="header__link" href={link.href} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </a>
              </li>
            ))}
            <li className="header__cta-mobile">
              <a className="btn btn--primary" href="#contact" onClick={() => setMenuOpen(false)}>
                Get in touch
              </a>
            </li>
          </ul>
        </nav>

        <a className="btn btn--primary header__cta" href="#contact">
          Get in touch
        </a>

        <button
          type="button"
          className="header__toggle"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={`header__bars${menuOpen ? ' header__bars--open' : ''}`} aria-hidden="true" />
        </button>
      </div>
    </header>
  )
}
