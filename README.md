# Portfolio (React + Express + Nodemailer)

A modern portfolio with CSS Modules + Framer Motion on frontend.

## What Changed
- Single-page anchor flow (`#home`, `#about`, `#skills`, `#projects`, `#contact`) so navbar links always work.
- Frontend sections use static local data (no backend fetch for projects/skills).
- Backend is now contact-email only using Nodemailer.
- Removed unwanted skill entries: `Redux Toolkit`, `Next.js`, `Firebase`, `Netlify`, `Claude`, `Cursor`, `TypeScript`.

## Structure
```text
my-portfolio/
├─ frontend/
│  ├─ public/
│  │  ├─ assets/
│  │  ├─ manifest.webmanifest
│  │  └─ sw.js
│  ├─ src/
│  │  ├─ components/
│  │  │  ├─ common/
│  │  │  ├─ layout/
│  │  │  └─ sections/
│  │  ├─ context/
│  │  ├─ data/content.js
│  │  ├─ services/api.js
│  │  ├─ styles/App.module.css
│  │  ├─ App.jsx
│  │  ├─ index.css
│  │  └─ main.jsx
│  ├─ .env.example
│  └─ package.json
├─ backend/
│  ├─ src/
│  │  ├─ config/env.js
│  │  ├─ controllers/contact.controller.js
│  │  ├─ middlewares/
│  │  ├─ routes/
│  │  ├─ services/contact.service.js
│  │  └─ validators/contact.validator.js
│  ├─ .env.example
│  ├─ package.json
│  └─ server.js
└─ legacy-static/
```

## Frontend Setup
```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

## Backend Setup (Nodemailer)
```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

Set these in `backend/.env`:
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `MAIL_FROM`
- `MAIL_TO`

## API
- `POST /api/contact` -> sends contact email to your inbox
- `GET /api/health`
