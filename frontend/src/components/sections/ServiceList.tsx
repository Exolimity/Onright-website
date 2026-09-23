import type { ServiceItem } from '../../i18n/nl'
import { Icon } from '../ui/Icon'
import './ServiceList.css'

/**
 * Services as numbered editorial rows.
 * `detailed` adds the "what's included" list (used on the Diensten page).
 */
export function ServiceList({ items, detailed = false }: { items: ServiceItem[]; detailed?: boolean }) {
  return (
    <ol className="service-list">
      {items.map((item, index) => (
        <li className="service-list__item" key={item.id} id={item.id}>
          <span className="service-list__number" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="service-list__main">
            <h3 className="service-list__title">{item.title}</h3>
            <p className="service-list__summary">{item.summary}</p>
          </div>
          {detailed && (
            <ul className="service-list__includes">
              {item.includes.map((point) => (
                <li key={point}>
                  <Icon name="check" size={16} />
                  {point}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ol>
  )
}
