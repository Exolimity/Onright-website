import { Link } from 'react-router'
import { useMessages } from '../../i18n'
import { Icon } from '../ui/Icon'
import './CtaBand.css'

/** Closing invitation at the bottom of most pages. */
export function CtaBand() {
  const t = useMessages()

  return (
    <section className="cta-band" aria-labelledby="cta-title">
      <div className="container cta-band__inner">
        <div>
          <h2 id="cta-title" className="cta-band__title">
            {t.cta.title}
          </h2>
          <p className="cta-band__body">{t.cta.body}</p>
        </div>
        <Link className="btn btn--invert btn--lg" to="/contact">
          {t.cta.button}
          <Icon name="arrow" />
        </Link>
      </div>
    </section>
  )
}
