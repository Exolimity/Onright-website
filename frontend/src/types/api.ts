/** Shapes sent to / returned by the ASP.NET Core API. Keep in sync with the C# models. */

export type ContactRequestDto = {
  name: string
  email: string
  company?: string
  phone?: string
  topic?: string
  message: string
  /** Honeypot: hidden from people, filled in by spam bots. Must be sent empty. */
  website: string
}

export type ContactResponseDto = {
  referenceId: string
}

/** Problem-details error body returned on 4xx responses. */
export type ApiErrorBody = {
  title?: string
  detail?: string
  errors?: Record<string, string[]>
}
