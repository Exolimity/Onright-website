import type { ReactNode } from 'react'
import './PageHeader.css'

/** The opening block at the top of every inner page. */
export function PageHeader({
  label,
  title,
  children,
}: {
  label: string
  title: string
  children?: ReactNode
}) {
  return (
    <header className="page-header">
      <div className="container">
        <span className="label">{label}</span>
        <h1 className="page-header__title">{title}</h1>
        {children && <div className="page-header__body">{children}</div>}
      </div>
    </header>
  )
}
