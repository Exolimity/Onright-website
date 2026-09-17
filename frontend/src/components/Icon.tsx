type IconName = 'code' | 'mobile' | 'cart' | 'server' | 'gauge' | 'wrench' | 'check' | 'arrow'

const paths: Record<IconName, string> = {
  code: 'M8 6 2 12l6 6M16 6l6 6-6 6',
  mobile: 'M7 3h10a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1ZM11 18h2',
  cart: 'M3 4h2l2.4 11.2a1 1 0 0 0 1 .8h8.2a1 1 0 0 0 1-.8L20 8H6M9 20h.01M17 20h.01',
  server: 'M4 5h16v5H4zM4 14h16v5H4zM8 7.5h.01M8 16.5h.01',
  gauge: 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm1.5-3.5L18 6M4 19a9 9 0 1 1 16 0',
  wrench: 'M15 7a4 4 0 0 1-5.1 5.6L5 17.5 6.5 19l4.9-4.9A4 4 0 0 1 17 9l-2-2 2-2 2 2-2 2',
  check: 'm4 12 5 5L20 6',
  arrow: 'M5 12h14m-6-6 6 6-6 6',
}

type Props = {
  name: IconName
  size?: number
  className?: string
}

export function Icon({ name, size = 24, className }: Props) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={paths[name]} />
    </svg>
  )
}
