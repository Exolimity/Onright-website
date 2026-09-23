import { useMessages } from '../../i18n'
import './ProcessSection.css'

export function ProcessSection() {
  const t = useMessages()

  return (
    <section className="section section--alt" aria-labelledby="process-title">
      <div className="container">
        <div className="split">
          <div>
            <span className="label">{t.process.label}</span>
            <h2 id="process-title">{t.process.title}</h2>
          </div>
          <p className="lead">{t.process.body}</p>
        </div>

        <ol className="process">
          {t.process.steps.map((step, index) => (
            <li className="process__step" key={step.title}>
              <span className="process__number" aria-hidden="true">
                {index + 1}
              </span>
              <h3 className="process__title">{step.title}</h3>
              <p className="process__text">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
