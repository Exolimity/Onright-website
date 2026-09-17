import { process } from '../data/site'
import './Process.css'

export function Process() {
  return (
    <section className="section section--alt" id="process">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">How we work</span>
          <h2>A process with no black boxes</h2>
          <p className="section__intro">
            You always know what stage your project is at, what happens next and what it costs.
          </p>
        </div>

        <ol className="process__list">
          {process.map((item) => (
            <li className="process__item" key={item.step}>
              <span className="process__step">{item.step}</span>
              <h3 className="process__title">{item.title}</h3>
              <p className="process__text">{item.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
