# Onright Digital — website

Marketing site and enquiry API for Onright Digital.

- **`frontend/`** — React 19 + TypeScript, built with Vite.
- **`backend/`** — ASP.NET Core 8 minimal API (C#).

The front end renders the whole site on its own. The API supplies the services
list and receives contact-form submissions.

---

## Prerequisites

| Tool | Version | Where to get it |
| --- | --- | --- |
| Node.js | 20.19+ or 22.12+ | <https://nodejs.org> |
| .NET SDK | 8.0 or newer | <https://dotnet.microsoft.com/download> |

Check what you have:

```bash
node -v
dotnet --version
```

---

## Running it locally

You need **two terminals** — one per half of the app.

### Terminal 1 — the C# API

```bash
cd backend
dotnet run --project OnrightDigital.Api
```

Runs on <http://localhost:5080>. Interactive API docs (Swagger) are at
<http://localhost:5080/swagger>.

### Terminal 2 — the React site

```bash
cd frontend
npm install     # first time only
npm run dev
```

Open <http://localhost:5173>.

The Vite dev server proxies every `/api/...` request through to the C# API
(see `frontend/vite.config.ts`), so the browser only ever talks to one origin
and you never hit a CORS error in development.

> The site still works with the API stopped — the services section falls back
> to the local copy in `frontend/src/data/site.ts`, and the contact form shows
> a friendly "could not reach the server" message.

---

## The API

| Method | Route | Purpose |
| --- | --- | --- |
| `GET` | `/api/health` | Liveness check. |
| `GET` | `/api/services` | List of services shown on the site. |
| `GET` | `/api/services/{id}` | A single service by slug. |
| `POST` | `/api/contact` | Submit the contact form. |

### `POST /api/contact`

```json
{
  "name": "Sam Rivers",
  "email": "sam@example.com",
  "company": "Rivers Plumbing",
  "budget": "$5,000 – $15,000",
  "message": "We need a booking system for our engineers."
}
```

Success (`200`):

```json
{
  "referenceId": "OD-260917-A1B2C3",
  "message": "Thanks for getting in touch — we will reply within two business days."
}
```

Validation failure (`400`) returns a standard problem-details body whose
`errors` object is keyed by field name — the React form reads it and shows each
message under the right input.

Try it from the command line:

```bash
curl -X POST http://localhost:5080/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Sam","email":"sam@example.com","message":"I need a website for my shop."}'
```

### Where submissions go

Enquiries are appended to `backend/OnrightDigital.Api/App_Data/contact-messages.json`.
That file is git-ignored — it is real customer data and should never be committed.

This keeps the project running with no database to install. When you outgrow
it, implement `IContactStore` against EF Core and change the one registration
line in `Program.cs`; nothing else has to change. Sending yourself an email on
each submission is the same kind of swap.

---

## Project structure

```
frontend/
  src/
    api/client.ts        fetch wrapper + typed API errors
    components/          one .tsx + matching .css per section
    data/site.ts         ALL site copy — edit here, not in the JSX
    styles/theme.css     ALL design tokens — edit here to restyle
    styles/global.css    reset, layout helpers, buttons, cards
    types/api.ts         shapes shared with the C# models

backend/OnrightDigital.Api/
  Program.cs             startup, CORS, DI registrations
  Endpoints/             route definitions, grouped per feature
  Models/                request/response shapes + validation rules
  Services/              service catalogue and contact storage
```

### Two files worth knowing about

- **`frontend/src/data/site.ts`** — every piece of text on the site. Change
  wording, services, projects, phone number and social links here.
- **`frontend/src/styles/theme.css`** — every colour, font size, radius and
  spacing step. Change `--color-accent` and the whole site follows. Dark mode
  is already wired to the visitor's OS setting.

---

## Before you go live

1. **Replace the placeholder contact details** in `frontend/src/data/site.ts`
   (`email`, `phone`, `location`, and the `social` links, which currently point at `#`).
2. **Swap the sample projects** in the same file for real client work.
3. **Add your production domain** to `Cors.AllowedOrigins` in
   `backend/OnrightDigital.Api/appsettings.json`.
4. **Point the front end at the deployed API**: copy `frontend/.env.example` to
   `frontend/.env` and set `VITE_API_BASE_URL=https://your-api-domain`.
5. **Consider spam protection** on the contact endpoint (a honeypot field or a
   CAPTCHA) before the address gets scraped.

---

## Building for production

```bash
cd frontend && npm run build     # static files land in frontend/dist/
cd backend  && dotnet publish OnrightDigital.Api -c Release -o ./publish
```

`frontend/dist/` is plain static output — it can go on any static host
(Netlify, Vercel, GitHub Pages, Azure Static Web Apps). The API publishes as a
normal ASP.NET Core app.

## Useful commands

```bash
# frontend
npm run dev          # dev server with hot reload
npm run build        # typecheck + production build
npm run typecheck    # types only, no build
npm run preview      # serve the production build locally

# backend
dotnet run --project OnrightDigital.Api     # run with hot reload via `dotnet watch run`
dotnet build                                 # compile only
```
