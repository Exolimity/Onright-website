import { company, navLinks } from '../data/site'
import './Footer.css'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__name">{company.name}</span>
          <p className="footer__tagline">{company.tagline}</p>
        </div>

        <nav className="footer__nav" aria-label="Footer">
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>

        <ul className="footer__social">
          {company.social.map((item) => (
            <li key={item.label}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </div>

      <div className="container footer__bottom">
        <p>
          © {new Date().getFullYear()} {company.name}. All rights reserved.
        </p>
        <p>
          <a href={`mailto:${company.email}`}>{company.email}</a>
        </p>
      </div>
    </footer>
  )
}
