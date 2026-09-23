import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router'
import '@fontsource/instrument-serif/400.css'
import '@fontsource/instrument-serif/400-italic.css'
import '@fontsource-variable/inter'
import App from './App'
import { I18nProvider } from './i18n'
import './styles/global.css'

const container = document.getElementById('root')

if (!container) {
  throw new Error('Root element #root was not found in index.html')
}

// Normal builds use clean URLs (/diensten). VITE_ROUTER=hash switches to /#/diensten,
// which only exists for previewing the site on hosts that can't route every URL to index.html.
const Router = import.meta.env.VITE_ROUTER === 'hash' ? HashRouter : BrowserRouter

createRoot(container).render(
  <StrictMode>
    <I18nProvider>
      <Router>
        <App />
      </Router>
    </I18nProvider>
  </StrictMode>,
)
