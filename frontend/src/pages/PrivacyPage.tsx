import { PageHeader } from '../components/ui/PageHeader'
import { Seo } from '../components/ui/Seo'
import { site } from '../config/site'
import { useMessages } from '../i18n'
import './PrivacyPage.css'

export function PrivacyPage() {
  const t = useMessages()
  const { privacy } = t

  return (
    <>
      <Seo title={privacy.title} description={privacy.description} />
      <PageHeader label={privacy.updated} title={privacy.title} />

      <section className="section section--tight">
        <div className="container container--narrow privacy">
          {privacy.sections.map((section) => (
            <section key={section.heading} className="privacy__section">
              <h2 className="privacy__heading">{section.heading}</h2>
              {section.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph.replace('{kvk}', site.kvk)}</p>
              ))}
            </section>
          ))}
        </div>
      </section>
    </>
  )
}
