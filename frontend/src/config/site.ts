/**
 * Site settings that are the same in every language.
 * Translatable text lives in src/i18n/ — not here.
 */
export const site = {
  name: 'Onright Digital',

  /** Shown in the footer and used for local search. */
  location: {
    city: 'Belfeld',
    region: 'Noord-Limburg',
  },

  /**
   * Dutch law: registered businesses must show their KvK number on their website.
   * TODO: fill in your KvK number (and BTW-id if you want to show it).
   */
  kvk: '00000000',
  btw: '',

  /**
   * Pricing is built but hidden until you decide on prices.
   * Set to true and fill in the packages in src/i18n/nl.ts (services.pricing).
   */
  showPricing: false,
} as const
