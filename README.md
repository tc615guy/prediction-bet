# Prediction.bet

A premium, single-page site for Prediction.bet that positions the domain as a seven-figure brand for prediction markets, decentralized betting, and AI forecasting.

## Features

- **Live Visit Counter**: Tracks unique visitors with 24-hour deduplication using Supabase
- **Contact Form**: Minimal form for serious inquiries
- **Smooth Animations**: Framer Motion animations for a premium feel
- **Dark Theme**: Cinematic, minimalist design with black background and white/gold accents
- **Mobile-First**: Responsive design optimized for all devices

## Tech Stack

- Next.js 14+ (App Router) + TypeScript
- Tailwind CSS
- Framer Motion
- Supabase (Postgres) for visit counter

## Setup

1. **Install dependencies**:
   ```bash
   npm install
   # or
   pnpm install
   ```

2. **Set up environment variables**:
   Create a `.env.local` file with:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
   SENDGRID_API_KEY=your_sendgrid_api_key_here
   ```

3. **Set up Supabase database**:
   Run the following SQL in your Supabase SQL editor:
   ```sql
   create table if not exists visit_daily (
     day date primary key,
     total bigint not null default 0
   );

   create table if not exists visit_fingerprints (
     day date not null,
     fp  text not null,
     primary key (day, fp)
   );

   create table if not exists visit_events (
     id bigserial primary key,
     ts timestamptz not null default now(),
     ip inet,
     ua text
   );

   alter table visit_daily enable row level security;
   alter table visit_fingerprints enable row level security;
   alter table visit_events enable row level security;

   create or replace function increment_visit_total(p_day date)
   returns void
   language plpgsql
   as $$
   begin
     insert into visit_daily(day, total) values (p_day, 1)
     on conflict (day) do update set total = visit_daily.total + 1;
   end;
   $$;
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. **Open** [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### **Deploy to Vercel**

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit - Prediction.bet website"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "New Project"
   - Import your `prediction-bet` repository
   - Vercel will auto-detect Next.js settings

3. **Add Environment Variables in Vercel**:
   - Go to Project Settings → Environment Variables
   - Add these variables:
     - `NEXT_PUBLIC_SUPABASE_URL` = your_supabase_url
     - `SUPABASE_SERVICE_ROLE_KEY` = your_service_role_key
     - `SENDGRID_API_KEY` = your_sendgrid_api_key

4. **Deploy**:
   - Click "Deploy"
   - Vercel will build and deploy automatically
   - Your site will be live at `https://prediction-bet.vercel.app`

### **Custom Domain (Optional)**
- Add your custom domain `prediction.bet` in Vercel
- Update DNS records as instructed by Vercel

## Testing

### Visit Counter
- Load the homepage → number appears and increments
- Refresh within 24h → number should not increment (cookie guard)
- Open in another browser/device → should increment again (new cookie)

### Supabase Verification
- Check `visit_daily` table increments for today
- Check `visit_fingerprints` has a row for (day, fp)
- Check `visit_events` logs ip/ua rows

### Contact Form
- Submit contact form → check server logs for payload

## Security Notes

- Service Role Key is server-only; never exposed in client bundles
- API route runs on server; SUPABASE_SERVICE_ROLE_KEY not imported in client components
- Bot filtering prevents crawlers from inflating visit counts
- IP fingerprinting prevents duplicate counts from same user

## Project Structure

```
/
├── app/
│   ├── components/
│   │   └── VisitCounter.tsx
│   ├── api/
│   │   ├── visits/
│   │   │   └── route.ts
│   │   └── contact/
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   └── og.png
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```
