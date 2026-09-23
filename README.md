# Onright Digital — website

Website for Onright Digital, a web studio in Belfeld (Noord-Limburg).
Dutch first, built so more languages can be added later.

- **`frontend/`** — React 19 + TypeScript + React Router, built with Vite.
- **`backend/`** — ASP.NET Core 8 minimal API (C#): receives the contact form,
  saves each enquiry, and alerts you by email and Telegram.

| URL | Page |
| --- | --- |
| `/` | Home |
| `/diensten` | Services |
| `/werk` | Portfolio |
| `/over-ons` | About |
| `/contact` | Contact form |
| `/privacy` | Privacy statement (required under the AVG/GDPR) |

---

## Running it locally

Prerequisites: **Node.js** 20.19+ (or 22.12+) and the **.NET 8 SDK**.

```bash
# Terminal 1 — the C# API (http://localhost:5080, API docs at /swagger)
cd backend
dotnet run --project OnrightDigital.Api

# Terminal 2 — the website (http://localhost:5173)
cd frontend
npm install        # first time only
npm run dev
```

Vite forwards every `/api/...` request to the C# API, so the browser only talks
to one address during development.

---

## Where to change things

| I want to change… | Edit |
| --- | --- |
| Any text on the site | `frontend/src/i18n/nl.ts` |
| KvK number, location, show/hide prices | `frontend/src/config/site.ts` |
| Colours, fonts, spacing | `frontend/src/styles/theme.css` |
| Validation rules | `backend/OnrightDigital.Api/Models/ContactRequest.cs` (and the mirror in `frontend/src/pages/ContactPage.tsx`) |

### When the logo is ready

Set `--color-accent` (and `--color-accent-hover`) in `theme.css` to the logo
colour. Buttons and highlights follow. Replace `frontend/public/favicon.svg`
and swap the text wordmark in `components/layout/Header.tsx` for the logo image.

### Showing prices

Fill in the packages under `services.pricing` in `nl.ts`, then set
`showPricing: true` in `config/site.ts`.

### Your uncle's project

Once he agrees, fill in `name`, `link`, `quote` and `quoteBy` for the project in
`nl.ts` (`work.projects`). The link and quote appear automatically when filled.
Replace the placeholder letter with a screenshot when you have one.

### Adding a language (e.g. English)

1. Copy `frontend/src/i18n/nl.ts` to `en.ts` and translate the strings.
   It must satisfy the `Messages` type, so TypeScript flags any key you miss.
2. Register it in `frontend/src/i18n/index.tsx`: `const dictionaries = { nl, en }`.
3. Add routes with a language prefix (`/en/services`) in `App.tsx` and pass the
   locale to `<I18nProvider>`. Add a language switcher to the header.

---

## Contact form: how it works

1. The visitor submits the form. The browser checks the fields first for instant feedback.
2. `POST /api/contact` validates again (the server's rules are the real ones),
   saves the enquiry to `backend/OnrightDigital.Api/App_Data/contact-messages.json`,
   and immediately answers with a reference number such as `OD-260923-4F1A2B`.
3. A background worker (`Notifications/NotificationDispatcher.cs`) then sends:
   - **email**: the full enquiry. Hit *Reply* to answer the customer directly.
   - **Telegram**: a short alert with only reference, name and topic.
     Telegram is outside the EU, so personal details stay out of it.

A failing notification never breaks the form: the enquiry is already saved and
the error is logged.

`App_Data/` is git-ignored because it holds real customer data.

### Spam protection

- **Honeypot**: a hidden `website` field. People never see it; bots fill it in.
  Those submissions get a fake "success" and are silently dropped.
- **Rate limit**: 5 enquiries per visitor (IP address) per 10 minutes, then `429`.

### Switching on notifications

Both are **off** by default. Secrets (passwords, bot token) must never go in
`appsettings.json`. Store them with .NET user-secrets on your machine and in
environment variables on a server.

**Telegram (phone alerts)**

1. In Telegram, message **@BotFather**, send `/newbot`, and copy the token it gives you.
2. Send any message to your new bot.
3. Open `https://api.telegram.org/bot<TOKEN>/getUpdates` in a browser and copy
   `"chat":{"id": …}`. That is your chat id.
4. Configure:

```bash
cd backend/OnrightDigital.Api
dotnet user-secrets set "Notifications:Telegram:Enabled" "true"
dotnet user-secrets set "Notifications:Telegram:BotToken" "123456:ABC..."
dotnet user-secrets set "Notifications:Telegram:ChatId" "987654321"
```

**Email**

Use the SMTP details from your email provider (once you have a domain, your
hosting provider gives you these). With Gmail, create an *app password* first.

```bash
dotnet user-secrets set "Notifications:Email:Enabled" "true"
dotnet user-secrets set "Notifications:Email:Host" "smtp.gmail.com"
dotnet user-secrets set "Notifications:Email:Port" "587"
dotnet user-secrets set "Notifications:Email:Username" "you@gmail.com"
dotnet user-secrets set "Notifications:Email:Password" "your-app-password"
dotnet user-secrets set "Notifications:Email:From" "Onright Digital website <you@gmail.com>"
dotnet user-secrets set "Notifications:Email:To" "you@gmail.com"
```

On startup the API logs which channels are enabled. If a channel is switched on
but half-configured, the app refuses to start and says what is missing.

On a server, use environment variables with double underscores instead,
e.g. `Notifications__Telegram__BotToken=...`.

> `System.Net.Http.HttpClient` logging is set to `Warning` in `appsettings.json`
> on purpose: at `Information` level it logs full request URLs, and the
> Telegram URL contains your bot token.

---

## Before going live

- [ ] KvK number in `frontend/src/config/site.ts`
- [ ] Have the privacy statement (`privacy` in `nl.ts`) checked. It's a sensible starting point, not legal advice. The 12-month retention period is a proposal.
- [ ] Your uncle's project details (or keep it anonymous)
- [ ] A domain (tip: `onrightdigital.nl`) and a business email address
- [ ] Production domain added to `Cors:AllowedOrigins` in `appsettings.json`
- [ ] `VITE_API_BASE_URL` set in `frontend/.env` if the API runs on a different domain
- [ ] Notifications switched on (see above)

## Deployment notes

- `npm run build` outputs static files to `frontend/dist/`. The site uses clean URLs
  (`/diensten`), so the host must serve `index.html` for unknown paths
  (Netlify: `_redirects` with `/* /index.html 200`; Vercel and Azure Static Web
  Apps have an equivalent "SPA fallback" setting).
- The API publishes as a normal ASP.NET Core app:
  `dotnet publish OnrightDigital.Api -c Release -o ./publish`.
  Behind a reverse proxy, enable forwarded headers so the rate limiter sees real
  visitor IPs instead of the proxy's.

---

## When the site grows

| When… | Change |
| --- | --- |
| You offer more services (webshops, apps) | Add an item to `services.items` in `nl.ts`. For SEO, give each important service its own page (`/diensten/webshop`). |
| You want to rank in more towns | Add location pages (`/website-laten-maken-venlo`) with genuinely local content. Don't copy-paste the same text for each town; Google ignores that. |
| You have several projects | Give each project a case-study page with screenshots, the client's goal and the result. |
| You want to write articles | Add a blog (Markdown files, or a headless CMS such as Sanity or Strapi) so you can publish without touching code. |
| You get many enquiries | Replace the JSON file with a database (EF Core + SQLite or SQL Server) behind the same `IContactStore` interface, and add a small admin page to view them. |
| Google traffic matters a lot | Pre-render pages at build time (e.g. React Router framework mode, or a static-site generator). Crawlers then get full HTML without running JavaScript. |
| Someone else will edit texts | Move the content from `nl.ts` into a CMS. |
| You want statistics | Use privacy-friendly analytics (Plausible, or self-hosted Umami). No cookie banner needed, unlike Google Analytics. |
