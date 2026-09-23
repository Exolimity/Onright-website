import { Link } from 'react-router'
import { site } from '../../config/site'
import { useMessages } from '../../i18n'
import './Footer.css'

export function Footer() {
  const t = useMessages()

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Link className="footer__name" to="/">
            {site.name}
          </Link>
          <p className="footer__tagline">{t.footer.tagline}</p>
        </div>

        <nav className="footer__col" aria-label={t.footer.navTitle}>
          <h2 className="footer__heading">{t.footer.navTitle}</h2>
          <ul>
            <li><Link to="/diensten">{t.nav.services}</Link></li>
            <li><Link to="/werk">{t.nav.work}</Link></li>
            <li><Link to="/over-ons">{t.nav.about}</Link></li>
            <li><Link to="/contact">{t.nav.contact}</Link></li>
          </ul>
        </nav>

        <div className="footer__col">
          <h2 className="footer__heading">{t.footer.infoTitle}</h2>
          <ul>
            <li>
              {site.location.city}, {site.location.region}
            </li>
            <li>
              {t.footer.kvk} {site.kvk}
            </li>
            {site.btw && (
              <li>
                {t.footer.btw} {site.btw}
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="container">
        <div className="footer__bottom">
          <p>
            © {new Date().getFullYear()} {site.name}. {t.footer.rights}
          </p>
          <Link to="/privacy">{t.footer.privacy}</Link>
        </div>
      </div>
    </footer>
  )
}
