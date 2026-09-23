import { useState, type FormEvent } from 'react'
import { ApiError, submitContact } from '../api/client'
import { company, contact } from '../data/site'
import { Icon } from './Icon'
import './Contact.css'

type FormState = {
  name: string
  email: string
  company: string
  budget: string
  message: string
}

const emptyForm: FormState = {
  name: '',
  email: '',
  company: '',
  budget: contact.budgets[0],
  message: '',
}

type Status =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'sent'; reference: string }
  | { kind: 'error'; message: string }

/** Client-side checks that mirror the validation attributes on the C# model. */
function validate(form: FormState): Record<string, string> {
  const errors: Record<string, string> = {}

  if (form.name.trim().length < 2) {
    errors.name = 'Please enter your name.'
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }
  if (form.message.trim().length < 10) {
    errors.message = 'Please tell us a little more (at least 10 characters).'
  }

  return errors
}

export function Contact() {
  const [form, setForm] = useState<FormState>(emptyForm)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<Status>({ kind: 'idle' })

  const update = (field: keyof FormState) => (event: { target: { value: string } }) => {
    setForm((current) => ({ ...current, [field]: event.target.value }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setStatus({ kind: 'idle' })
      return
    }

    setStatus({ kind: 'sending' })

    try {
      const result = await submitContact({
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.company.trim() || undefined,
        budget: form.budget,
        message: form.message.trim(),
      })
      setStatus({ kind: 'sent', reference: result.referenceId })
      setForm(emptyForm)
    } catch (error) {
      if (error instanceof ApiError) {
        // Surface per-field errors the API sent back, keyed case-insensitively.
        const fieldErrors: Record<string, string> = {}
        for (const [key, messages] of Object.entries(error.fieldErrors)) {
          if (messages.length > 0) fieldErrors[key.toLowerCase()] = messages[0]
        }
        setErrors(fieldErrors)
        setStatus({
          kind: 'error',
          // When the server flagged specific fields, point at them instead of
          // repeating its generic title.
          message:
            Object.keys(fieldErrors).length > 0
              ? 'Please fix the highlighted fields and try again.'
              : error.message,
        })
      } else {
        setStatus({
          kind: 'error',
          message:
            'We could not reach the server. Please try again, or email us directly at ' +
            company.email +
            '.',
        })
      }
    }
  }

  return (
    <section className="section contact" id="contact">
      <div className="container contact__inner">
        <div className="contact__intro">
          <span className="eyebrow">Get in touch</span>
          <h2>{contact.title}</h2>
          <p className="section__intro">{contact.body}</p>

          <ul className="contact__details">
            <li>
              <span className="contact__label">Email</span>
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </li>
            <li>
              <span className="contact__label">Phone</span>
              <a href={`tel:${company.phone.replace(/[^+\d]/g, '')}`}>{company.phone}</a>
            </li>
            <li>
              <span className="contact__label">Where</span>
              <span>{company.location}</span>
            </li>
          </ul>
        </div>

        <div className="card contact__card">
          {status.kind === 'sent' ? (
            <div className="contact__success" role="status">
              <Icon name="check" size={28} />
              <h3>Thanks — your message is in.</h3>
              <p>
                We will reply within two business days. Your reference is{' '}
                <strong>{status.reference}</strong>.
              </p>
              <button
                type="button"
                className="btn btn--secondary"
                onClick={() => setStatus({ kind: 'idle' })}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form className="contact__form" onSubmit={handleSubmit} noValidate>
              <div className="contact__row">
                <div className="field">
                  <label htmlFor="name">Name *</label>
                  <input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={update('name')}
                    maxLength={80}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    autoComplete="name"
                  />
                  {errors.name && (
                    <p className="field__error" id="name-error">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="field">
                  <label htmlFor="email">Email *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={update('email')}
                    maxLength={160}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    autoComplete="email"
                  />
                  {errors.email && (
                    <p className="field__error" id="email-error">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="contact__row">
                <div className="field">
                  <label htmlFor="company">Company</label>
                  <input
                    id="company"
                    name="company"
                    value={form.company}
                    onChange={update('company')}
                    maxLength={120}
                    autoComplete="organization"
                  />
                </div>

                <div className="field">
                  <label htmlFor="budget">Budget</label>
                  <select id="budget" name="budget" value={form.budget} onChange={update('budget')}>
                    {contact.budgets.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="field">
                <label htmlFor="message">What do you want to build? *</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={update('message')}
                  maxLength={4000}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <p className="field__error" id="message-error">
                    {errors.message}
                  </p>
                )}
              </div>

              {status.kind === 'error' && (
                <p className="contact__alert" role="alert">
                  {status.message}
                </p>
              )}

              <button
                type="submit"
                className="btn btn--primary btn--lg contact__submit"
                disabled={status.kind === 'sending'}
              >
                {status.kind === 'sending' ? 'Sending…' : 'Send message'}
              </button>

              <p className="contact__note">
                We only use your details to reply to this enquiry. No lists, no spam.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
