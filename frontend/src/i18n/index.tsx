import { createContext, useContext, useEffect, type ReactNode } from 'react'
import { nl, type Messages } from './nl'

/**
 * Every language the site supports. To add English:
 *   1. copy nl.ts to en.ts and translate the strings
 *      (TypeScript will flag any key you forget — en must match the Messages type)
 *   2. add it here:  const dictionaries = { nl, en }
 *   3. pass the chosen locale to <I18nProvider> (e.g. from a language switcher)
 */
const dictionaries = { nl } satisfies Record<string, Messages>

export type Locale = keyof typeof dictionaries

export const defaultLocale: Locale = 'nl'

const I18nContext = createContext<Messages>(dictionaries[defaultLocale])

export function I18nProvider({
  locale = defaultLocale,
  children,
}: {
  locale?: Locale
  children: ReactNode
}) {
  // Keep <html lang> in sync so screen readers and search engines use the right language.
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  return <I18nContext.Provider value={dictionaries[locale]}>{children}</I18nContext.Provider>
}

/** Returns the full text dictionary for the current language. */
export function useMessages(): Messages {
  return useContext(I18nContext)
}
