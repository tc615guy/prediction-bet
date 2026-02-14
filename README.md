# prediction.bet — Premium Domain Landing Page

A modern, high-converting landing page for selling the premium domain **prediction.bet**.

## Files

- `index.html` — Main landing page with hero, opportunity, stats, benefits, urgency, and offer form
- `contact.html` — Dedicated contact page with messaging form
- `styles.css` — All styles, animations, and responsive design
- `script.js` — Scroll animations, counters, form handling, and interactivity

## Setup: Formspree (Email Form Handler)

The contact and offer forms use **Formspree** to send emails to your inbox without exposing your email address in the source code.

### Steps to activate:

1. Go to [https://formspree.io](https://formspree.io) and create a free account
2. Create a new form and set the recipient email to `josh.lanius@gmail.com`
3. Formspree will give you a form endpoint like: `https://formspree.io/f/xYoUrCoD`
4. Replace the placeholder `https://formspree.io/f/xzaborge` in **both** files:
   - `index.html` (search for `form action`)
   - `contact.html` (search for `form action`)
5. Replace it with your actual Formspree endpoint

### Example:
```html
<form action="https://formspree.io/f/xYoUrCoD" method="POST">
```

## Deployment

This is a static site — no build step required. Simply upload the files to any web host:

- **Netlify** — Drag and drop the folder
- **Vercel** — Import the folder
- **GitHub Pages** — Push to a repo and enable Pages
- **Any traditional host** — Upload via FTP

## Features

- Fully responsive design (mobile, tablet, desktop)
- Smooth scroll animations and reveal effects
- Animated stat counters
- Glowing CTA buttons with hover effects
- Parallax-like orb background effects
- Currency formatting on offer input
- Form validation and loading states
- Success confirmation messages
- Mobile hamburger menu
- No frameworks or dependencies — pure HTML/CSS/JS
