import { Link } from 'react-router'
import type { Project } from '../../i18n/nl'
import { useMessages } from '../../i18n'
import { Icon } from '../ui/Icon'
import './ProjectList.css'

export function ProjectList({ projects, showInvite = false }: { projects: Project[]; showInvite?: boolean }) {
  const t = useMessages()

  return (
    <ul className="projects">
      {projects.map((project) => (
        <li className="project" key={project.id}>
          {/* Placeholder visual until there is a real screenshot of the site. */}
          <div className="project__visual" aria-hidden="true">
            <span>{project.name.charAt(0)}</span>
          </div>
          <div className="project__body">
            <span className="label">{project.category}</span>
            <h3 className="project__name">{project.name}</h3>
            <p className="project__summary">{project.summary}</p>

            {project.quote && (
              <blockquote className="project__quote">
                <p>“{project.quote}”</p>
                {project.quoteBy && <footer>— {project.quoteBy}</footer>}
              </blockquote>
            )}

            {project.link && (
              <a className="arrow-link project__link" href={project.link} target="_blank" rel="noopener">
                {t.work.viewSite}
                <Icon name="external" size={15} />
              </a>
            )}
          </div>
        </li>
      ))}

      {showInvite && (
        <li className="project project--invite">
          <div className="project__body">
            <h3 className="project__name">{t.work.yours.title}</h3>
            <p className="project__summary">{t.work.yours.text}</p>
            <Link className="arrow-link project__link" to="/contact">
              {t.work.yours.link}
              <Icon name="arrow" size={15} />
            </Link>
          </div>
        </li>
      )}
    </ul>
  )
}
