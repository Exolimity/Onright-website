import { hero } from '../data/site'
import { Icon } from './Icon'
import './Hero.css'

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__glow" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__content">
          <span className="eyebrow">{hero.eyebrow}</span>
          <h1>{hero.title}</h1>
          <p className="hero__body">{hero.body}</p>

          <div className="hero__actions">
            <a className="btn btn--primary btn--lg" href={hero.primaryCta.href}>
              {hero.primaryCta.label}
              <Icon name="arrow" size={18} />
            </a>
            <a className="btn btn--secondary btn--lg" href={hero.secondaryCta.href}>
              {hero.secondaryCta.label}
            </a>
          </div>

          <dl className="hero__stats">
            {hero.stats.map((stat) => (
              <div className="hero__stat" key={stat.label}>
                <dt className="hero__stat-value">{stat.value}</dt>
                <dd className="hero__stat-label">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="hero__window">
            <div className="hero__window-bar">
              <span /> <span /> <span />
            </div>
            <pre className="hero__code">
              <code>
                {`// onright.build.ts
export const project = {
  goal: "ship something useful",
  stack: ["React", "C#", ".NET"],
  status: "in progress",
}

await team.build(project)
// → launched ✓`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}
