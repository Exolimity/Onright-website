import type {
  ApiErrorBody,
  ContactRequestDto,
  ContactResponseDto,
  ServiceDto,
} from '../types/api'

/**
 * In development this is empty and Vite proxies /api to the C# backend
 * (see vite.config.ts). In production set VITE_API_BASE_URL to the deployed API.
 */
const BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '')

/** Thrown for any non-2xx response, carrying field errors when the API sends them. */
export class ApiError extends Error {
  readonly status: number
  readonly fieldErrors: Record<string, string[]>

  constructor(message: string, status: number, fieldErrors: Record<string, string[]> = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.fieldErrors = fieldErrors
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
      // Response had no JSON body — fall through to the generic message.
    }
    throw new ApiError(
      body.detail ?? body.title ?? `Request failed (${response.status})`,
      response.status,
      body.errors ?? {},
    )
  }

  if (response.status === 204) {
    return undefined as T
  }

  return (await response.json()) as T
}

export function fetchServices(signal?: AbortSignal): Promise<ServiceDto[]> {
  return request<ServiceDto[]>('/api/services', { signal })
}

export function submitContact(payload: ContactRequestDto): Promise<ContactResponseDto> {
  return request<ContactResponseDto>('/api/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
