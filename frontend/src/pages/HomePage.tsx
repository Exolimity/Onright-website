import { Link } from 'react-router'
import { CtaBand } from '../components/sections/CtaBand'
import { ProcessSection } from '../components/sections/ProcessSection'
import { ProjectList } from '../components/sections/ProjectList'
import { ServiceList } from '../components/sections/ServiceList'
import { Icon } from '../components/ui/Icon'
import { Seo } from '../components/ui/Seo'
import { useMessages } from '../i18n'
import './HomePage.css'

export function HomePage() {
  const t = useMessages()
  const { hero } = t.home

  return (
    <>
      <Seo description={t.home.description} />

      <section className="hero">
        <div className="container">
          <span className="label">{hero.eyebrow}</span>
          <h1 className="hero__title">
            {hero.titleBefore}
            <em>{hero.titleEmphasis}</em>
            <span className="hero__title-end">{hero.titleAfter}</span>
          </h1>

          <div className="hero__bottom">
            <p className="hero__body">{hero.body}</p>
            <div className="hero__actions">
              <Link className="btn btn--primary btn--lg" to="/contact">
                {hero.primaryCta}
                <Icon name="arrow" />
              </Link>
              <Link className="btn btn--outline btn--lg" to="/diensten">
                {hero.secondaryCta}
              </Link>
            </div>
          </div>

          <ul className="hero__facts">
            {hero.facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="intro-title">
        <div className="container">
          <div className="split">
            <div>
              <span className="label">{t.home.intro.label}</span>
              <h2 id="intro-title">{t.home.intro.title}</h2>
            </div>
            <p className="lead">{t.home.intro.body}</p>
          </div>

          <ul className="promises">
            {t.home.promises.map((promise) => (
              <li className="promises__item" key={promise.title}>
                <h3 className="promises__title">{promise.title}</h3>
                <p className="promises__text">{promise.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="services-title">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="label">{t.home.servicesTeaser.label}</span>
              <h2 id="services-title">{t.home.servicesTeaser.title}</h2>
            </div>
            <Link className="arrow-link" to="/diensten">
              {t.home.servicesTeaser.link}
              <Icon name="arrow" size={15} />
            </Link>
          </div>
          <ServiceList items={t.services.items} />
        </div>
      </section>

      <ProcessSection />

      <section className="section" aria-labelledby="work-title">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="label">{t.home.workTeaser.label}</span>
              <h2 id="work-title">{t.home.workTeaser.title}</h2>
            </div>
            <Link className="arrow-link" to="/werk">
              {t.home.workTeaser.link}
              <Icon name="arrow" size={15} />
            </Link>
          </div>
          <ProjectList projects={t.work.projects} showInvite />
        </div>
      </section>

      <CtaBand />
    </>
  )
}
