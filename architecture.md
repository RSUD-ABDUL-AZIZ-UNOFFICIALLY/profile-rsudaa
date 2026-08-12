# RSUD Abdul Aziz Unofficial – Architecture Overview

This document provides a high‑level view of the **RSUD Abdul Aziz** web application. It is intended for developers who want to understand the project structure, key technologies, and how the different parts of the system interact.

## 1. Project Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Framework** | Next.js 14 (App Router) | Server‑side rendering, routing, API routes |
| **Language** | TypeScript | Static typing, better IDE support |
| **Styling** | Tailwind CSS | Utility‑first CSS, responsive design |
| **State Management** | React Context (app/context) | Global state for auth, user data, etc. |
| **HTTP Client** | Axios | REST API calls to Core API & SIMRS API |
| **Linting/Formatting** | ESLint + Prettier | Code quality |
| **Build** | Vercel / Node.js | Production build, static export |

## 2. Directory Layout

```
app/                # Next.js app router pages & components
  layout.tsx        # Root layout (global styles, providers)
  page.tsx          # Home page
  activity/         # Public activity pages
  admin-rsaa/       # Admin dashboard (CRUD, analytics)
  artikel/          # Public article pages
  ...
public/             # Static assets (images, icons, favicon)
src/                # Shared utilities, models, context
  Model/            # TypeScript interfaces for API data
  context/          # React context providers
```

### Key Directories

* **app/** – Contains all Next.js pages and components. The app router structure mirrors the URL hierarchy.
* **app/admin-rsaa/** – Admin dashboard with sections for *Kegiatan*, *Layanan*, *Pengumuman*, *Profil*, etc. Each section has its own page and component files.
* **app/Model/** – TypeScript models that describe the shape of data returned from the backend APIs.
* **app/context/** – React context providers for global state (e.g., authentication, user profile).
* **public/** – Static assets such as images, icons, and the favicon.

## 3. Core API Interaction

The frontend communicates with two external services via Axios:

1. **Core API** – Base URL from `API_URL` env variable. Handles CRUD for articles, activities, loker, maklumat pelayan, and other profile data. Endpoints are prefixed with `/api/web-profile` for authenticated routes and `/profile` for public data.
2. **SIMRS API** – Base URL from `SIMRS_URL` env variable. Provides hospital information such as doctor schedules, room availability, and media uploads. Endpoints are under `/api/cdn` for file uploads and `/api/petugas` for staff data.

All requests are performed in a consistent manner, e.g.:

```ts
import axios from 'axios';
const response = await axios.get(`${API_URL}/article`);
```

## 4. Authentication & Authorization

* Admin login is handled via `/login-admin` page.
* JWT tokens are stored in HTTP‑only cookies (handled by Next.js API routes).
* Protected routes in the admin dashboard check for a valid token before rendering.

## 5. Build & Deployment

* Development: `npm run dev` (Next.js dev server on `localhost:3000`).
* Production build: `npm run build` followed by `npm start`.
* Static export: `next export` (if needed for static hosting).
* Vercel integration is configured via the `.vercel` folder and environment variables.

## 6. Testing & Coverage

* Unit tests are written with Jest and React Testing Library.
* Coverage reports are generated in the `coverage/` directory (ignored by `.gitignore`).

## 7. Contributing

* Follow the coding style enforced by ESLint and Prettier.
* Run `npm run lint` and `npm run format` before committing.
* Pull requests should include tests where applicable.

---

This document is a living artifact and should be updated as the project evolves.
