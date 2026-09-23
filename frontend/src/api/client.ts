import type { ApiErrorBody, ContactRequestDto, ContactResponseDto } from '../types/api'

/**
 * In development this is empty and Vite proxies /api to the C# backend
 * (see vite.config.ts). In production set VITE_API_BASE_URL to the deployed API.
 */
const BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '')

/** Thrown for any non-2xx response. `fields` lists the form fields the server rejected. */
export class ApiError extends Error {
  readonly status: number
  readonly fields: string[]

  constructor(message: string, status: number, fields: string[] = []) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.fields = fields
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  })

  if (!response.ok) {
    let body: ApiErrorBody = {}
    try {
      body = (await response.json()) as ApiErrorBody
    } catch {
      // No JSON body — the status code alone will have to do.
    }
    // The server keys errors by C# property name ("Email"); the form uses "email".
    const fields = Object.keys(body.errors ?? {}).map((key) => key.toLowerCase())
    throw new ApiError(body.detail ?? body.title ?? `HTTP ${response.status}`, response.status, fields)
  }

  return (await response.json()) as T
}

export function submitContact(payload: ContactRequestDto): Promise<ContactResponseDto> {
  return request<ContactResponseDto>('/api/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
