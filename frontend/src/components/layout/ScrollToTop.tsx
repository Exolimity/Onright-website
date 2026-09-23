import { useEffect } from 'react'
import { useLocation } from 'react-router'

/** A new page should start at the top, like a normal website — not where the last one was scrolled to. */
export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
