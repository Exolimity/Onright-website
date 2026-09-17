import { about } from '../data/site'
import './About.css'

export function About() {
  return (
    <section className="section" id="about">
      <div className="container about__inner">
        <div className="about__intro">
          <span className="eyebrow">About us</span>
          <h2>{about.title}</h2>
          {about.body.map((paragraph) => (
            <p className="about__text" key={paragraph.slice(0, 24)}>
              {paragraph}
            </p>
          ))}
        </div>

        <ul className="about__values">
          {about.values.map((value) => (
            <li className="about__value" key={value.title}>
              <h3 className="about__value-title">{value.title}</h3>
              <p className="about__value-text">{value.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
