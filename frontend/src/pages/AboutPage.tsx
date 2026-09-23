import { CtaBand } from '../components/sections/CtaBand'
import { PageHeader } from '../components/ui/PageHeader'
import { Seo } from '../components/ui/Seo'
import { useMessages } from '../i18n'
import './AboutPage.css'

export function AboutPage() {
  const t = useMessages()
  const { about } = t

  return (
    <>
      <Seo title={about.title} description={about.description} />

      <PageHeader label={about.header.label} title={about.header.title} />

      <section className="section section--tight">
        <div className="container">
          <div className="about__story">
            {about.paragraphs.map((paragraph, index) => (
              <p key={index} className={index === 0 ? 'about__first' : undefined}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt" aria-labelledby="values-title">
        <div className="container">
          <h2 id="values-title">{about.valuesTitle}</h2>
          <ul className="values">
            {about.values.map((value, index) => (
              <li className="values__item" key={value.title}>
                <span className="values__number" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="values__title">{value.title}</h3>
                <p className="values__text">{value.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="area-title">
        <div className="container">
          <div className="split">
            <div>
              <span className="label">{about.area.label}</span>
              <h2 id="area-title">{about.area.title}</h2>
            </div>
            <div>
              <p className="lead">{about.area.text}</p>
              <ul className="area">
                {about.area.places.map((place) => (
                  <li key={place}>{place}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
