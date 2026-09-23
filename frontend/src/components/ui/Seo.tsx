import { useMessages } from '../../i18n'

/**
 * Sets the page <title> and meta description. React 19 moves these tags
 * into <head> automatically, wherever they are rendered.
 * Leave `title` out on the homepage to use the full brand title.
 */
export function Seo({ title, description }: { title?: string; description: string }) {
  const t = useMessages()
  const fullTitle = title ? `${title}${t.meta.titleSuffix}` : t.meta.homeTitle

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
    </>
  )
}
