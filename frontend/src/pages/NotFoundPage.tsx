import { Link } from 'react-router'
import { Seo } from '../components/ui/Seo'
import { useMessages } from '../i18n'

export function NotFoundPage() {
  const t = useMessages()

  return (
    <>
      <Seo title={t.notFound.title} description={t.notFound.body} />
      {/* Keep 404s out of Google's index. */}
      <meta name="robots" content="noindex" />
      <section className="section">
        <div className="container container--narrow">
          <span className="label">404</span>
          <h1>{t.notFound.title}</h1>
          <p className="lead" style={{ marginTop: 'var(--space-5)' }}>
            {t.notFound.body}
          </p>
          <Link className="btn btn--primary" to="/" style={{ marginTop: 'var(--space-6)' }}>
            {t.notFound.button}
          </Link>
        </div>
      </section>
    </>
  )
}
