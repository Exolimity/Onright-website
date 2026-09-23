/**
 * Dutch text for the whole website.
 *
 * Edit wording here — components never contain text of their own.
 * The shape of this object is the `Messages` type: any future translation
 * (en.ts, de.ts, …) must provide exactly the same keys, and TypeScript will
 * tell you when one is missing.
 */

export type TitledText = { title: string; text: string }

export type ServiceItem = {
  id: string
  title: string
  summary: string
  includes: string[]
}

export type PricingPackage = {
  name: string
  price: string
  description: string
  features: string[]
}

export type Project = {
  id: string
  name: string
  category: string
  summary: string
  /** Leave empty until the client agrees to be linked. */
  link: string
  /** Leave empty until the client gives a quote. */
  quote: string
  quoteBy: string
}

export type PrivacySection = { heading: string; paragraphs: string[] }

export const nl = {
  meta: {
    titleSuffix: ' — Onright Digital',
    homeTitle: 'Onright Digital — Websites voor ondernemers in Noord-Limburg',
  },

  nav: {
    home: 'Home',
    services: 'Diensten',
    work: 'Werk',
    about: 'Over ons',
    contact: 'Contact',
    cta: 'Kennismaken',
    openMenu: 'Menu openen',
    closeMenu: 'Menu sluiten',
    skipLink: 'Direct naar de inhoud',
    mainLabel: 'Hoofdmenu',
  },

  home: {
    description:
      'Onright Digital maakt heldere, snelle websites voor ondernemers in Belfeld, Venlo en Noord-Limburg. Persoonlijk contact en duidelijke afspraken vooraf.',
    hero: {
      eyebrow: 'Webstudio uit Belfeld',
      titleBefore: 'Websites die ',
      titleEmphasis: 'werken',
      titleAfter: ' voor uw bedrijf.',
      body: 'Onright Digital maakt heldere, snelle websites voor ondernemers in Belfeld, Venlo en de rest van Noord-Limburg. Persoonlijk, overzichtelijk en afgestemd op wat uw klanten zoeken.',
      primaryCta: 'Plan een kennismaking',
      secondaryCta: 'Bekijk onze diensten',
      facts: ['Persoonlijk contact', 'Duidelijke afspraken vooraf', 'Goed vindbaar in Google'],
    },
    intro: {
      label: 'Onze aanpak',
      title: 'Een goede website hoeft niet ingewikkeld te zijn.',
      body: 'Voor de meeste ondernemers is een website geen doel op zich, maar een manier om gevonden te worden en nieuwe klanten te krijgen. Daarom houden wij het overzichtelijk: een website die er verzorgd uitziet, snel laadt en precies vertelt wat u doet.',
    },
    promises: [
      {
        title: 'Eén vast aanspreekpunt',
        text: 'U heeft direct contact met degene die aan uw website werkt. Geen callcenter, geen doorverbinden.',
      },
      {
        title: 'Duidelijk vooraf',
        text: 'Voordat we beginnen, weet u wat u krijgt, wat het kost en wanneer het klaar is.',
      },
      {
        title: 'Gemaakt om gevonden te worden',
        text: 'Snel, geschikt voor mobiel en zo opgebouwd dat Google begrijpt wat u aanbiedt.',
      },
    ] as TitledText[],
    servicesTeaser: {
      label: 'Diensten',
      title: 'Waarmee wij u kunnen helpen',
      link: 'Alle diensten bekijken',
    },
    workTeaser: {
      label: 'Werk',
      title: 'Recent opgeleverd',
      link: 'Bekijk ons werk',
    },
  },

  process: {
    label: 'Werkwijze',
    title: 'Van eerste gesprek tot livegang',
    body: 'Een helder traject in vier stappen. U weet op elk moment waar we staan.',
    steps: [
      {
        title: 'Kennismaking',
        text: 'We bespreken uw bedrijf, uw klanten en wat de website moet opleveren. Vrijblijvend en zonder verplichtingen.',
      },
      {
        title: 'Voorstel',
        text: 'U ontvangt een helder voorstel met de inhoud, de planning en de kosten. Pas als u akkoord bent, gaan we aan de slag.',
      },
      {
        title: 'Ontwerp en bouw',
        text: 'We ontwerpen en bouwen uw website en laten tussentijds zien hoe het wordt, zodat u kunt bijsturen.',
      },
      {
        title: 'Livegang en nazorg',
        text: 'We zetten de website online en blijven daarna bereikbaar voor vragen en aanpassingen.',
      },
    ] as TitledText[],
  },

  services: {
    title: 'Diensten',
    description:
      'Nieuwe websites, vernieuwing van bestaande websites en aanpassingen voor ondernemers in Belfeld, Venlo en Noord-Limburg.',
    header: {
      label: 'Diensten',
      title: 'Websites voor ondernemers in de regio',
      body: 'Of u nu nog geen website heeft of uw huidige site toe is aan vernieuwing: wij zorgen voor een website die bij uw bedrijf past en die u met trots laat zien.',
    },
    items: [
      {
        id: 'nieuwe-website',
        title: 'Een nieuwe website',
        summary: 'Voor ondernemers die nog geen website hebben, of die opnieuw willen beginnen.',
        includes: [
          'Ontwerp dat past bij uw bedrijf',
          'Teksten en structuur die uw klanten begrijpen',
          'Contactformulier en basisvindbaarheid in Google',
          'Geschikt voor telefoon, tablet en computer',
        ],
      },
      {
        id: 'website-vernieuwen',
        title: 'Uw website vernieuwen',
        summary: 'Voor websites die verouderd zijn, traag laden of slecht werken op een telefoon.',
        includes: [
          'Beoordeling van uw huidige website',
          'Een nieuw, rustig en modern ontwerp',
          'Bestaande inhoud overzichtelijk opnieuw ingedeeld',
          'Zorgvuldige overstap, zonder verlies van vindbaarheid',
        ],
      },
      {
        id: 'aanpassingen',
        title: 'Aanpassingen en onderhoud',
        summary: 'Voor ondernemers die hun website actueel willen houden, zonder er zelf naar om te hoeven kijken.',
        includes: [
          "Teksten, foto's en openingstijden bijwerken",
          "Nieuwe pagina's toevoegen",
          'Controleren of alles goed blijft werken',
          'Snel antwoord op uw vragen',
        ],
      },
    ] as ServiceItem[],
    standard: {
      label: 'Altijd inbegrepen',
      title: 'Wat elke website standaard heeft',
      items: [
        { title: 'Geschikt voor elk scherm', text: 'Uw website ziet er goed uit op telefoon, tablet en computer.' },
        { title: 'Snel en veilig', text: 'Korte laadtijden en een beveiligde verbinding (https).' },
        { title: 'Vindbaar in Google', text: 'Een nette opbouw, duidelijke paginatitels en een focus op uw regio.' },
        { title: 'Privacy op orde', text: 'Geen onnodige tracking en een privacyverklaring volgens de AVG.' },
        { title: 'Contactformulier', text: 'Aanvragen van bezoekers komen direct bij u binnen.' },
        { title: 'Uitleg bij oplevering', text: 'U weet hoe uw website in elkaar zit en bij wie u terechtkunt.' },
      ] as TitledText[],
    },
    // Hidden until site.showPricing is true. Fill in real prices before enabling.
    pricing: {
      label: 'Tarieven',
      title: 'Heldere prijzen',
      body: 'Elke website is anders, maar u weet altijd vooraf waar u aan toe bent.',
      note: 'Alle prijzen zijn exclusief btw.',
      packages: [
        {
          name: 'Basis',
          price: '€ —',
          description: 'Een compacte website voor een sterke eerste indruk.',
          features: ["Tot 5 pagina's", 'Contactformulier', 'Basisvindbaarheid in Google'],
        },
        {
          name: 'Uitgebreid',
          price: '€ —',
          description: 'Voor bedrijven met meer diensten of meer te vertellen.',
          features: ["Tot 10 pagina's", 'Uitgebreide vindbaarheid', 'Hulp bij teksten'],
        },
        {
          name: 'Onderhoud',
          price: '€ — per maand',
          description: 'Uw website actueel, zonder omkijken.',
          features: ['Kleine aanpassingen', 'Controle en updates', 'Snel antwoord op vragen'],
        },
      ] as PricingPackage[],
    },
  },

  work: {
    title: 'Werk',
    description: 'Websites die Onright Digital heeft gemaakt voor ondernemers.',
    header: {
      label: 'Werk',
      title: 'Recent opgeleverd',
      body: 'Een selectie van websites die wij hebben gebouwd. Wilt u meer weten over een project? Neem gerust contact op.',
    },
    viewSite: 'Website bekijken',
    projects: [
      {
        id: 'risico-veiligheid',
        // TODO: replace with the business name once the client agrees.
        name: 'Adviesbureau in risico en veiligheid',
        category: 'Zakelijke dienstverlening',
        // TODO: add a few concrete details about what you built.
        summary:
          'Een website voor een adviesbureau dat organisaties adviseert over risico’s en veiligheid. Zakelijk en rustig vormgegeven, zodat bezoekers snel zien wie het bureau is en waarmee het kan helpen.',
        link: '',
        quote: '',
        quoteBy: '',
      },
    ] as Project[],
    yours: {
      title: 'Uw website hier?',
      text: 'Wij maken graag kennis met uw bedrijf.',
      link: 'Neem contact op',
    },
  },

  about: {
    title: 'Over ons',
    description:
      'Onright Digital is een webstudio uit Belfeld die websites maakt voor ondernemers in Venlo en Noord-Limburg.',
    header: {
      label: 'Over ons',
      title: 'Een webstudio uit Belfeld',
    },
    paragraphs: [
      'Onright Digital is een kleine webstudio uit Belfeld. Wij maken websites voor ondernemers in Venlo en omgeving, zoals winkels, dienstverleners en zzp’ers.',
      'Wij vinden dat een goede website niet ingewikkeld hoeft te voelen. U krijgt een website die klopt, heldere uitleg en een aanspreekpunt dat u gewoon kunt bereiken.',
      'Onright Digital groeit. Wij breiden onze kennis en diensten voortdurend uit, zodat we ondernemers ook in de toekomst goed kunnen blijven helpen.',
    ],
    valuesTitle: 'Waar wij voor staan',
    values: [
      {
        title: 'Rust en overzicht',
        text: 'Een website die helder is voor uw bezoekers, en een traject dat helder is voor u.',
      },
      {
        title: 'Afspraak is afspraak',
        text: 'Wat we vooraf afspreken, leveren we. Verandert er iets, dan hoort u dat meteen.',
      },
      {
        title: 'Dichtbij',
        text: 'Wij zijn gevestigd in Belfeld en werken graag voor ondernemers uit de eigen regio.',
      },
    ] as TitledText[],
    area: {
      label: 'Werkgebied',
      title: 'Actief in Noord-Limburg',
      text: 'Wij werken vanuit Belfeld voor ondernemers in de omgeving. Bent u verder weg gevestigd? Ook dan helpen wij u graag; veel gaat tegenwoordig prima online.',
      places: ['Belfeld', 'Venlo', 'Tegelen', 'Blerick', 'Reuver', 'Beesel', 'Kessel'],
    },
  },

  contact: {
    title: 'Contact',
    description:
      'Neem contact op met Onright Digital voor een vrijblijvende kennismaking over uw website.',
    header: {
      label: 'Contact',
      title: 'Laten we kennismaken',
      body: 'Vertel ons kort over uw bedrijf en wat u zoekt. Wij reageren binnen twee werkdagen met een persoonlijk antwoord.',
    },
    next: {
      title: 'Wat gebeurt er na uw bericht?',
      steps: [
        'Wij lezen uw bericht en reageren binnen twee werkdagen.',
        'We plannen een vrijblijvend gesprek over uw wensen.',
        'U ontvangt een helder voorstel, zonder verplichtingen.',
      ],
    },
    form: {
      name: 'Naam',
      email: 'E-mailadres',
      company: 'Bedrijfsnaam',
      phone: 'Telefoonnummer',
      topic: 'Waar kunnen wij u mee helpen?',
      topicOptions: [
        'Een nieuwe website',
        'Mijn website vernieuwen',
        'Aanpassingen of onderhoud',
        'Iets anders',
      ],
      message: 'Uw bericht',
      messagePlaceholder: 'Vertel kort iets over uw bedrijf en wat u zoekt.',
      optional: 'optioneel',
      honeypot: 'Laat dit veld leeg',
      submit: 'Verstuur bericht',
      sending: 'Bezig met versturen…',
      privacyBefore: 'Wij gebruiken uw gegevens alleen om op uw bericht te reageren. Lees meer in onze ',
      privacyLink: 'privacyverklaring',
      privacyAfter: '.',
    },
    errors: {
      name: 'Vul uw naam in (2 tot 80 tekens).',
      email: 'Vul een geldig e-mailadres in.',
      company: 'De bedrijfsnaam mag maximaal 120 tekens lang zijn.',
      phone: 'Vul een geldig telefoonnummer in.',
      message: 'Vertel iets meer over uw vraag (minimaal 10 tekens).',
      fixFields: 'Controleer de gemarkeerde velden en probeer het opnieuw.',
      rateLimited:
        'U heeft kort na elkaar meerdere berichten verstuurd. Probeer het over een paar minuten opnieuw.',
      network:
        'Uw bericht kon niet worden verstuurd. Controleer uw internetverbinding en probeer het opnieuw.',
      generic: 'Er ging iets mis bij het versturen. Probeer het later opnieuw.',
    },
    success: {
      title: 'Bedankt voor uw bericht',
      body: 'Wij reageren binnen twee werkdagen. Uw referentienummer is',
      again: 'Nog een bericht versturen',
    },
  },

  cta: {
    title: 'Benieuwd wat wij voor uw bedrijf kunnen betekenen?',
    body: 'Plan een vrijblijvende kennismaking. U zit nergens aan vast.',
    button: 'Neem contact op',
  },

  footer: {
    tagline: 'Heldere websites voor ondernemers in Noord-Limburg.',
    navTitle: 'Menu',
    infoTitle: 'Gegevens',
    kvk: 'KvK',
    btw: 'Btw-id',
    privacy: 'Privacyverklaring',
    rights: 'Alle rechten voorbehouden.',
  },

  notFound: {
    title: 'Pagina niet gevonden',
    body: 'De pagina die u zoekt bestaat niet (meer). Via het menu vindt u vast wat u zoekt.',
    button: 'Naar de homepage',
  },

  // TODO: have this checked before going live — it is a sensible starting point, not legal advice.
  // "{kvk}" is replaced with the KvK number from src/config/site.ts.
  privacy: {
    title: 'Privacyverklaring',
    description: 'Hoe Onright Digital omgaat met uw persoonsgegevens.',
    updated: 'Laatst bijgewerkt: september 2026',
    sections: [
      {
        heading: 'Wie wij zijn',
        paragraphs: [
          'Onright Digital is gevestigd in Belfeld en ingeschreven bij de Kamer van Koophandel onder nummer {kvk}. Wij zijn verantwoordelijk voor de verwerking van persoonsgegevens zoals beschreven in deze verklaring.',
        ],
      },
      {
        heading: 'Welke gegevens wij verwerken',
        paragraphs: [
          'Wanneer u het contactformulier invult, ontvangen wij uw naam, e-mailadres en bericht, en, als u die invult, uw bedrijfsnaam en telefoonnummer.',
        ],
      },
      {
        heading: 'Waarom wij deze gegevens gebruiken',
        paragraphs: [
          'Wij gebruiken uw gegevens uitsluitend om op uw aanvraag te reageren en, als u dat wilt, een voorstel voor u te maken. Wij gebruiken uw gegevens niet voor nieuwsbrieven of reclame en verkopen ze nooit aan anderen.',
        ],
      },
      {
        heading: 'Hoe lang wij gegevens bewaren',
        paragraphs: [
          'Wij bewaren uw aanvraag niet langer dan nodig. Komt er geen samenwerking tot stand, dan verwijderen wij uw gegevens uiterlijk twaalf maanden na ons laatste contact.',
        ],
      },
      {
        heading: 'Met wie wij gegevens delen',
        paragraphs: [
          'Om aanvragen snel te kunnen beantwoorden, ontvangen wij een melding per e-mail en een korte melding via de berichtendienst Telegram. Die korte melding bevat alleen uw naam en het onderwerp van uw aanvraag.',
          'Daarnaast worden gegevens opgeslagen bij de partij die onze website host. Wij delen uw gegevens niet met anderen, tenzij de wet ons daartoe verplicht.',
        ],
      },
      {
        heading: 'Cookies',
        paragraphs: [
          'Deze website gebruikt geen tracking- of advertentiecookies. Lettertypen worden vanaf onze eigen server geladen, zodat er bij uw bezoek geen gegevens naar derden gaan.',
        ],
      },
      {
        heading: 'Beveiliging',
        paragraphs: [
          'Wij nemen passende maatregelen om uw gegevens te beschermen, zoals een beveiligde verbinding (https) en beperkte toegang tot aanvragen.',
        ],
      },
      {
        heading: 'Uw rechten',
        paragraphs: [
          'U heeft het recht om uw gegevens in te zien, te laten corrigeren of te laten verwijderen. Stuur daarvoor een bericht via het contactformulier.',
          'Bent u het niet eens met hoe wij met uw gegevens omgaan? Dan kunt u een klacht indienen bij de Autoriteit Persoonsgegevens.',
        ],
      },
    ] as PrivacySection[],
  },
}

export type Messages = typeof nl
