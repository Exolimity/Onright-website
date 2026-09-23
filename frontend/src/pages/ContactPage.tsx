import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Link } from 'react-router'
import { ApiError, submitContact } from '../api/client'
import { Icon } from '../components/ui/Icon'
import { PageHeader } from '../components/ui/PageHeader'
import { Seo } from '../components/ui/Seo'
import { useMessages } from '../i18n'
import './ContactPage.css'

type FieldName = 'name' | 'email' | 'company' | 'phone' | 'message'

type FormState = {
  name: string
  email: string
  company: string
  phone: string
  topic: string
  message: string
  website: string // honeypot
}

type Status =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'sent'; reference: string }
  | { kind: 'error'; message: string }

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
/** Dutch and international numbers: optional +, then 8–20 digits, spaces, dashes or brackets. */
const PHONE_PATTERN = /^\+?[\d\s\-()]{8,20}$/

/** Mirrors the validation attributes on the C# ContactRequest model. */
function validate(form: FormState): FieldName[] {
  const invalid: FieldName[] = []
  const name = form.name.trim()
  const email = form.email.trim()
  const phone = form.phone.trim()
  const message = form.message.trim()

  if (name.length < 2 || name.length > 80) invalid.push('name')
  if (!EMAIL_PATTERN.test(email) || email.length > 160) invalid.push('email')
  if (form.company.trim().length > 120) invalid.push('company')
  if (phone && !PHONE_PATTERN.test(phone)) invalid.push('phone')
  if (message.length < 10 || message.length > 4000) invalid.push('message')

  return invalid
}

function isFieldName(value: string): value is FieldName {
  return ['name', 'email', 'company', 'phone', 'message'].includes(value)
}

export function ContactPage() {
  const t = useMessages()
  const { contact } = t

  const emptyForm: FormState = {
    name: '',
    email: '',
    company: '',
    phone: '',
    topic: contact.form.topicOptions[0],
    message: '',
    website: '',
  }

  const [form, setForm] = useState<FormState>(emptyForm)
  const [invalid, setInvalid] = useState<FieldName[]>([])
  const [status, setStatus] = useState<Status>({ kind: 'idle' })

  const update =
    (field: keyof FormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((current) => ({ ...current, [field]: event.target.value }))
    }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const clientInvalid = validate(form)
    setInvalid(clientInvalid)
    if (clientInvalid.length > 0) {
      setStatus({ kind: 'idle' })
      return
    }

    setStatus({ kind: 'sending' })

    try {
      const result = await submitContact({
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.company.trim() || undefined,
        phone: form.phone.trim() || undefined,
        topic: form.topic,
        message: form.message.trim(),
        website: form.website,
      })
      setStatus({ kind: 'sent', reference: result.referenceId })
      setForm(emptyForm)
      setInvalid([])
    } catch (error) {
      if (!(error instanceof ApiError)) {
        // fetch itself failed: offline, DNS, server down.
        setStatus({ kind: 'error', message: contact.errors.network })
        return
      }
      if (error.status === 429) {
        setStatus({ kind: 'error', message: contact.errors.rateLimited })
        return
      }
      const serverInvalid = error.fields.filter(isFieldName)
      setInvalid(serverInvalid)
      setStatus({
        kind: 'error',
        message: serverInvalid.length > 0 ? contact.errors.fixFields : contact.errors.generic,
      })
    }
  }

  /** Props that wire a field to its error message for screen readers. */
  const errorProps = (field: FieldName) => ({
    'aria-invalid': invalid.includes(field),
    'aria-describedby': invalid.includes(field) ? `${field}-error` : undefined,
  })

  const errorText = (field: FieldName) =>
    invalid.includes(field) ? (
      <p className="field__error" id={`${field}-error`}>
        {contact.errors[field]}
      </p>
    ) : null

  return (
    <>
      <Seo title={contact.title} description={contact.description} />

      <PageHeader label={contact.header.label} title={contact.header.title}>
        <p>{contact.header.body}</p>
      </PageHeader>

      <section className="section section--tight">
        <div className="container contact">
          <aside className="contact__aside">
            <h2 className="contact__aside-title">{contact.next.title}</h2>
            <ol className="contact__steps">
              {contact.next.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </aside>

          <div className="contact__panel">
            {status.kind === 'sent' ? (
              <div className="contact__success" role="status">
                <span className="contact__success-icon">
                  <Icon name="check" size={22} />
                </span>
                <h2 className="contact__success-title">{contact.success.title}</h2>
                <p>
                  {contact.success.body} <strong>{status.reference}</strong>.
                </p>
                <button
                  type="button"
                  className="btn btn--outline"
                  onClick={() => setStatus({ kind: 'idle' })}
                >
                  {contact.success.again}
                </button>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit} noValidate>
                <div className="contact__row">
                  <div className="field">
                    <label htmlFor="name">{contact.form.name}</label>
                    <input
                      id="name"
                      value={form.name}
                      onChange={update('name')}
                      maxLength={80}
                      autoComplete="name"
                      {...errorProps('name')}
                    />
                    {errorText('name')}
                  </div>
                  <div className="field">
                    <label htmlFor="email">{contact.form.email}</label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={update('email')}
                      maxLength={160}
                      autoComplete="email"
                      {...errorProps('email')}
                    />
                    {errorText('email')}
                  </div>
                </div>

                <div className="contact__row">
                  <div className="field">
                    <label htmlFor="company">
                      {contact.form.company} <span className="field__optional">({contact.form.optional})</span>
                    </label>
                    <input
                      id="company"
                      value={form.company}
                      onChange={update('company')}
                      maxLength={120}
                      autoComplete="organization"
                      {...errorProps('company')}
                    />
                    {errorText('company')}
                  </div>
                  <div className="field">
                    <label htmlFor="phone">
                      {contact.form.phone} <span className="field__optional">({contact.form.optional})</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={update('phone')}
                      maxLength={20}
                      autoComplete="tel"
                      {...errorProps('phone')}
                    />
                    {errorText('phone')}
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="topic">{contact.form.topic}</label>
                  <select id="topic" value={form.topic} onChange={update('topic')}>
                    {contact.form.topicOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="message">{contact.form.message}</label>
                  <textarea
                    id="message"
                    rows={6}
                    value={form.message}
                    onChange={update('message')}
                    maxLength={4000}
                    placeholder={contact.form.messagePlaceholder}
                    {...errorProps('message')}
                  />
                  {errorText('message')}
                </div>

                {/* Honeypot: invisible to people, but bots fill in every field they find. */}
                <div className="contact__trap" aria-hidden="true">
                  <label htmlFor="website">{contact.form.honeypot}</label>
                  <input
                    id="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={update('website')}
                  />
                </div>

                {status.kind === 'error' && (
                  <p className="contact__alert" role="alert">
                    {status.message}
                  </p>
                )}

                <div className="contact__actions">
                  <button
                    type="submit"
                    className="btn btn--primary btn--lg"
                    disabled={status.kind === 'sending'}
                  >
                    {status.kind === 'sending' ? contact.form.sending : contact.form.submit}
                  </button>
                  <p className="contact__privacy">
                    {contact.form.privacyBefore}
                    <Link to="/privacy">{contact.form.privacyLink}</Link>
                    {contact.form.privacyAfter}
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
