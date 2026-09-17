import { useEffect, useState } from 'react'
import { fetchServices } from '../api/client'
import { services as fallbackServices, type Service } from '../data/site'
import { Icon } from './Icon'
import './Services.css'

const iconNames = ['code', 'mobile', 'cart', 'server', 'gauge', 'wrench'] as const
type IconName = (typeof iconNames)[number]

function toIconName(value: string): IconName {
  return (iconNames as readonly string[]).includes(value) ? (value as IconName) : 'code'
}

export function Services() {
  // Start with the local list so the section renders instantly, then replace it
  // with whatever the C# API returns. If the API is down, the local list stands.
  const [items, setItems] = useState<Service[]>(fallbackServices)

  useEffect(() => {
    const controller = new AbortController()

    fetchServices(controller.signal)
      .then((data) => {
        if (data.length > 0) {
          setItems(
            data.map((dto) => ({
              id: dto.id,
              title: dto.title,
              description: dto.description,
              points: dto.points,
              icon: toIconName(dto.icon),
            })),
          )
        }
      })
      .catch(() => {
        // API unavailable (e.g. backend not running) — keep the fallback content.
      })

    return () => controller.abort()
  }, [])

  return (
    <section className="section section--alt" id="services">
      <div className="container">
        <div className="section__head section__head--center">
          <span className="eyebrow">What we do</span>
          <h2>Everything needed to get your product live</h2>
          <p className="section__intro">
            We start with web and app development and keep expanding — if it runs in a browser or on
            a phone, we can build and look after it.
          </p>
        </div>

        <ul className="services__grid">
          {items.map((service) => (
            <li key={service.id}>
              <article className="card card--interactive services__card">
                <span className="services__icon">
                  <Icon name={service.icon} size={22} />
                </span>
                <h3>{service.title}</h3>
                <p className="services__text">{service.description}</p>
                <ul className="services__points">
                  {service.points.map((point) => (
                    <li key={point}>
                      <Icon name="check" size={16} className="services__check" />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
