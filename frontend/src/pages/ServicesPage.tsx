import { CtaBand } from '../components/sections/CtaBand'
import { ProcessSection } from '../components/sections/ProcessSection'
import { ServiceList } from '../components/sections/ServiceList'
import { PageHeader } from '../components/ui/PageHeader'
import { Seo } from '../components/ui/Seo'
import { site } from '../config/site'
import { useMessages } from '../i18n'
import './ServicesPage.css'

export function ServicesPage() {
  const t = useMessages()
  const { services } = t

  return (
    <>
      <Seo title={services.title} description={services.description} />

      <PageHeader label={services.header.label} title={services.header.title}>
        <p>{services.header.body}</p>
      </PageHeader>

      <section className="section section--tight">
        <div className="container">
          <ServiceList items={services.items} detailed />
        </div>
      </section>

      <section className="section" aria-labelledby="standard-title">
        <div className="container">
          <span className="label">{services.standard.label}</span>
          <h2 id="standard-title">{services.standard.title}</h2>
          <ul className="standard">
            {services.standard.items.map((item) => (
              <li className="standard__item" key={item.title}>
                <h3 className="standard__title">{item.title}</h3>
                <p className="standard__text">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {site.showPricing && (
        <section className="section" aria-labelledby="pricing-title">
          <div className="container">
            <div className="split">
              <div>
                <span className="label">{services.pricing.label}</span>
                <h2 id="pricing-title">{services.pricing.title}</h2>
              </div>
              <p className="lead">{services.pricing.body}</p>
            </div>
            <ul className="pricing">
              {services.pricing.packages.map((pkg) => (
                <li className="pricing__package" key={pkg.name}>
                  <h3 className="pricing__name">{pkg.name}</h3>
                  <p className="pricing__price">{pkg.price}</p>
                  <p className="pricing__description">{pkg.description}</p>
                  <ul className="pricing__features">
                    {pkg.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            <p className="pricing__note">{services.pricing.note}</p>
          </div>
        </section>
      )}

      <ProcessSection />
      <CtaBand />
    </>
  )
}
