/** Shapes returned by / sent to the ASP.NET Core API. Keep in sync with the C# models. */

export type ServiceDto = {
  id: string
  title: string
  description: string
  points: string[]
  icon: string
}

export type ContactRequestDto = {
  name: string
  email: string
  company?: string
  budget?: string
  message: string
}

export type ContactResponseDto = {
  referenceId: string
  message: string
}

/** Problem-details style error body returned on 400 responses. */
export type ApiErrorBody = {
  title?: string
  detail?: string
  errors?: Record<string, string[]>
}
