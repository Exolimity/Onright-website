/**
 * All site copy lives here.
 * Edit this file to change wording, services, contact details or nav links —
 * the components read from it, so you never have to hunt through JSX.
 */

export const company = {
  name: 'Onright Digital',
  tagline: 'Websites and apps, built right.',
  /** TODO: replace the placeholders below with your real details. */
  email: 'hello@onrightdigital.com',
  phone: '+1 (000) 000-0000',
  location: 'Remote — working with clients worldwide',
  social: [
    { label: 'LinkedIn', href: '#' },
    { label: 'GitHub', href: '#' },
    { label: 'Instagram', href: '#' },
  ],
} as const

export const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
] as const

export const hero = {
  eyebrow: 'Web & app development',
  title: 'We build the software your business runs on.',
  body: 'Onright Digital designs, builds and maintains fast, reliable websites, web apps and mobile apps — and we keep growing our services as our clients do.',
  primaryCta: { label: 'Start a project', href: '#contact' },
  secondaryCta: { label: 'See our services', href: '#services' },
  stats: [
    { value: 'Web', label: 'Sites & stores' },
    { value: 'Apps', label: 'Web & mobile' },
    { value: 'API', label: 'Backends & integrations' },
  ],
}

export type Service = {
  id: string
  title: string
  description: string
  /** Short bullet list of what is actually delivered. */
  points: string[]
  icon: 'code' | 'mobile' | 'cart' | 'server' | 'gauge' | 'wrench'
}

/**
 * Fallback service list. The app fetches the live list from the C# API at
 * GET /api/services and falls back to this if the API is not running.
 */
export const services: Service[] = [
  {
    id: 'websites',
    title: 'Business websites',
    description:
      'Marketing sites that load fast, read well on a phone and are easy for you to update.',
    points: ['Responsive design', 'SEO fundamentals', 'Content management'],
    icon: 'code',
  },
  {
    id: 'web-apps',
    title: 'Custom web applications',
    description:
      'Dashboards, booking systems, portals — software shaped around how your business actually works.',
    points: ['React front ends', 'C# / .NET back ends', 'Role-based access'],
    icon: 'gauge',
  },
  {
    id: 'ecommerce',
    title: 'E-commerce',
    description:
      'Online stores with a checkout that converts and an admin you can run without a developer.',
    points: ['Payment integration', 'Inventory & orders', 'Analytics setup'],
    icon: 'cart',
  },
  {
    id: 'mobile',
    title: 'Mobile apps',
    description:
      'Cross-platform apps for iOS and Android that share one codebase and one design language.',
    points: ['iOS & Android', 'Offline-friendly', 'App store releases'],
    icon: 'mobile',
  },
  {
    id: 'apis',
    title: 'APIs & integrations',
    description:
      'The plumbing between your systems: clean APIs, third-party integrations and data that stays in sync.',
    points: ['REST APIs', 'Third-party integrations', 'Database design'],
    icon: 'server',
  },
  {
    id: 'care',
    title: 'Support & maintenance',
    description:
      'We stay on after launch — updates, monitoring, fixes and the small improvements that add up.',
    points: ['Hosting & deployment', 'Security updates', 'Ongoing improvements'],
    icon: 'wrench',
  },
]

export const process = [
  {
    step: '01',
    title: 'Discover',
    description:
      'We start with a conversation about the problem, your users and what success looks like — before anyone writes code.',
  },
  {
    step: '02',
    title: 'Design',
    description:
      'Wireframes and a visual direction you sign off on, so there are no surprises when the build starts.',
  },
  {
    step: '03',
    title: 'Build',
    description:
      'We develop in short cycles and show you working software as it goes, not a demo at the very end.',
  },
  {
    step: '04',
    title: 'Launch & grow',
    description:
      'We handle deployment, then keep measuring and improving once real people are using it.',
  },
]

export type Project = {
  id: string
  name: string
  category: string
  summary: string
  tags: string[]
}

/** TODO: replace with real client work as you complete projects. */
export const projects: Project[] = [
  {
    id: 'project-1',
    name: 'Booking platform',
    category: 'Web application',
    summary:
      'A scheduling and payments portal that replaced a spreadsheet-and-phone-calls process for a service business.',
    tags: ['React', 'C# / .NET', 'SQL Server'],
  },
  {
    id: 'project-2',
    name: 'Retail storefront',
    category: 'E-commerce',
    summary:
      'A product catalogue and checkout rebuilt for speed, cutting page load time and lifting mobile conversions.',
    tags: ['React', 'Payments', 'CMS'],
  },
  {
    id: 'project-3',
    name: 'Field service app',
    category: 'Mobile',
    summary:
      'A mobile app that lets on-site teams capture jobs offline and sync automatically when back in coverage.',
    tags: ['Mobile', 'REST API', 'Offline sync'],
  },
]

export const about = {
  title: 'A small team that treats your project like our own',
  body: [
    'Onright Digital started with a simple idea: most businesses do not need more software, they need the right software, built properly and explained in plain language.',
    'We are a web and app development studio, and we are expanding — adding services as our clients ask for them, from design and integrations through to ongoing support.',
  ],
  values: [
    {
      title: 'Built right, not just fast',
      description:
        'Clean, tested code you or another developer can pick up later. No lock-in, no mystery.',
    },
    {
      title: 'Plain language',
      description:
        'You get straight answers about scope, cost and trade-offs — no jargon used as a smokescreen.',
    },
    {
      title: 'In it for the long run',
      description:
        'We would rather have ten clients we support for years than a hundred one-off builds.',
    },
  ],
}

export const contact = {
  title: 'Tell us what you want to build',
  body: 'Send a few lines about your project and we will get back to you within two business days with honest feedback on scope, timeline and budget.',
  budgets: [
    'Not sure yet',
    'Under $5,000',
    '$5,000 – $15,000',
    '$15,000 – $50,000',
    '$50,000+',
  ],
}
