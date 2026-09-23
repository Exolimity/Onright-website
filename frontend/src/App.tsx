import { Route, Routes } from 'react-router'
import { Layout } from './components/layout/Layout'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { ServicesPage } from './pages/ServicesPage'
import { WorkPage } from './pages/WorkPage'

/**
 * Every page on the site. URLs are Dutch because that is what Dutch visitors
 * (and Google) expect. When adding a language, prefix routes, e.g. /en/services.
 */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="diensten" element={<ServicesPage />} />
        <Route path="werk" element={<WorkPage />} />
        <Route path="over-ons" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
