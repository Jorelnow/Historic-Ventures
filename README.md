# The Property Narrative

Premium Next.js SaaS for generating luxury-grade historical property narratives.

## Stack
- Next.js 14 App Router + TypeScript
- Tailwind CSS + Lucide React
- Supabase for report data and admin pipeline
- Stripe webhook for checkout status updates
- Google Gemini Pro for narrative generation
- Resend for client delivery emails

## Core table
`reports` schema is provided in `supabase/schema.sql` with:
- `id`
- `address`
- `status` (`pending`, `researching`, `completed`)
- `raw_research_text`
- `ai_narrative_json`
- `customer_email`

## Routes
- `POST /api/generate-narrative`
- `POST /api/webhook/stripe`
- `POST /api/delivery`
- `GET /api/admin/reports`

## Admin
- `/admin/login` token-based gate (`ADMIN_DASHBOARD_TOKEN`)
- `/admin` pipeline view with context injector + SOP sidebar + finalize flow

## Run
```bash
npm install
npm run dev
```
