import { projects } from '../data/site'
import './Work.css'

export function Work() {
  return (
    <section className="section" id="work">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow">Selected work</span>
          <h2>Projects we have shipped</h2>
          <p className="section__intro">
            A sample of the kinds of problems we solve. Ask us for a walkthrough of anything here.
          </p>
        </div>

        <ul className="work__grid">
          {projects.map((project) => (
            <li key={project.id}>
              <article className="card card--interactive work__card">
                <div className="work__thumb" aria-hidden="true">
                  <span>{project.name.charAt(0)}</span>
                </div>
                <p className="work__category">{project.category}</p>
                <h3>{project.name}</h3>
                <p className="work__summary">{project.summary}</p>
                <ul className="work__tags">
                  {project.tags.map((tag) => (
                    <li key={tag} className="work__tag">
                      {tag}
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
