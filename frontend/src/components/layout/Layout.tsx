import { Outlet } from 'react-router'
import { useMessages } from '../../i18n'
import { Footer } from './Footer'
import { Header } from './Header'
import { ScrollToTop } from './ScrollToTop'

/** Frame shared by every page: skip link, header, the page itself, footer. */
export function Layout() {
  const t = useMessages()

  return (
    <>
      <ScrollToTop />
      <a className="skip-link" href="#main">
        {t.nav.skipLink}
      </a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
