# Thyreon Front-End

**Thyreon** is a Next.js-based web application that provides a centralized dashboard for WordPress site management. Built for freelancers, agencies, and site owners, it offers an intuitive interface to monitor, maintain, and secure multiple WordPress installations.

---

## Live Demo

> **[thyreon.vercel.app](https://thyreon.vercel.app)**

---

## Overview

This is the front-end application for the Thyreon platform, providing:

- **User Interface** for managing multiple WordPress sites
- **Dashboard** with real-time monitoring and analytics
- **Authentication** via Clerk (OAuth, magic links, email/password)
- **Role-Based Access Control** (Admin, Premium, Pro, Lite)
- **Subscription Management** with Stripe integration
- **GraphQL Integration** with the Thyreon back-end API

### Related Repositories

- **[Back-End API](https://github.com/jordachewd/WPGuard-BackEnd)** -- NestJS server with GraphQL, PostgreSQL, and Prisma
- **[WordPress Plugin](https://github.com/jordachewd/WPGuard-Client)** -- Client plugin for WordPress sites

---

## Tech Stack

| Category           | Technology                                   |
| ------------------ | -------------------------------------------- |
| **Framework**      | Next.js 16 (App Router)                      |
| **Language**       | TypeScript 5.8                               |
| **Runtime**        | React 19                                     |
| **Authentication** | Clerk (JWT sessions, RBAC)                   |
| **GraphQL Client** | Apollo Client 4                              |
| **UI Framework**   | Material UI (MUI) 7                          |
| **Data Tables**    | MUI X Data Grid 8                            |
| **Charts**         | MUI X Charts 8                               |
| **Styling**        | Tailwind CSS 4 + Emotion + Styled Components |
| **Icons**          | Bootstrap Icons                              |
| **State**          | Zustand 5 + Apollo Cache                     |
| **Real-time**      | Socket.IO Client                             |
| **Payments**       | Stripe.js                                    |
| **Linting**        | ESLint 9 + typescript-eslint                 |
| **Dead Code**      | Knip                                         |

---

## Project Structure

```
src/
  app/
    (public)/          # Landing page, sign-in, sign-up
    (app)/             # Authenticated user area (dashboard, sites, plans, account, ...)
    (admin)/           # Admin area (admin panel, transactions)
    401/ / 404/        # Error pages
    layout.tsx         # Root layout (Clerk + MUI + Apollo providers)
  components/
    layout/            # Admin frame, sidebar, header, providers, wrappers
    sections/          # Feature sections (admin, app, public, common)
    shared/            # Reusable UI (Logo, PlanCard, CheckoutBtn, ToggleTheme, ...)
  constants/
    api/               # API URL and environment constants
    graphql/           # All GraphQL queries and mutations (sites, users, transactions)
    layout/            # Navigation config, Clerk appearance, sidebar slots
    demo-data/         # Demo/seed data for development
    sites/ / users/    # Field definitions and defaults
    table/             # Data grid column definitions and toolbar config
  context/
    AdminAuthContext    # Role-based auth state (isAdmin, isPro, isPremium, isLite)
    AdminUiContext      # Sidebar toggle and alert message state
  lib/
    actions/           # Server actions (checkout, user fetching)
    api/               # Apollo Client, Clerk auth headers, GraphQL fetcher, POST utility
    hooks/             # Custom hooks (sites, users, plans, sockets, transactions)
    stores/            # Zustand stores (dialog state, page state for sites and users)
    utils/             # Helpers (password gen, date formatting, avatar initials, ...)
  styles/              # CSS modules (layout, sections, shared)
  themes/              # MUI theme config (palette light/dark, components, base)
  types/               # TypeScript type definitions (account, layout, plans, sites, users, ...)
```

---

## Routes

### Public

| Path       | Description                                            |
| ---------- | ------------------------------------------------------ |
| `/`        | Landing page (Hero, Features, HowItWorks, Plans, FAQs) |
| `/sign-in` | Clerk sign-in                                          |
| `/sign-up` | Clerk sign-up                                          |

### App (authenticated)

| Path             | Description                                                                                                |
| ---------------- | ---------------------------------------------------------------------------------------------------------- |
| `/dashboard`     | User dashboard                                                                                             |
| `/sites`         | Sites list with data table                                                                                 |
| `/sites/[id]`    | Single site view with tabbed parallel routes (Info, Health, Reports, Backups, Security, Updates, Settings) |
| `/account`       | Account overview (hero, billing, sites)                                                                    |
| `/plans`         | Subscription plans                                                                                         |
| `/notifications` | User notifications                                                                                         |
| `/settings`      | App settings and theme toggle                                                                              |
| `/faqs`          | Frequently asked questions                                                                                 |
| `/users`         | User management (admin-visible)                                                                            |
| `/users/[id]`    | Single user detail                                                                                         |

### Admin

| Path                  | Description                    |
| --------------------- | ------------------------------ |
| `/admin`              | Admin panel with tabbed layout |
| `/admin/transactions` | All transactions table         |

---

## Features

### User-Facing

- **Landing Page** -- Public homepage with hero, features, how-it-works, pricing, and FAQ sections
- **Authentication** -- Secure login via Clerk (OAuth, magic links, email/password)
- **User Dashboard** -- Personal dashboard with site overview
- **Site Management** -- Add, edit, delete sites; view site details across parallel tab routes (info, health, reports, backups, security, updates, settings)
- **Account Page** -- Account hero, billing info, and linked sites
- **Subscription Plans** -- Plan comparison cards with Stripe checkout integration
- **Notifications** -- User notification feed
- **Settings** -- Theme toggle (light/dark) and app preferences
- **FAQs** -- Accordion-style FAQ section (shared between landing and app)
- **Responsive Design** -- Mobile-first, fully responsive UI

### Admin Panel

- User management (view, create, edit, quick-edit, delete) with data table
- Site management and monitoring
- Transaction history with data table
- API key regeneration per site
- Charts and visualizations (bar, line, pie, half-pie, scatter, sparkline via MUI X Charts)

### Technical

- **Server-Side Rendering** -- Next.js App Router with server components and server actions
- **GraphQL API Layer** -- Apollo Client 4 with auth-linked queries, cache-and-network fetch policy, and query deduplication
- **Real-Time Updates** -- Socket.IO listeners for user created / updated / deleted events
- **Theme Support** -- Light and dark mode via MUI `InitColorSchemeScript` with custom palettes
- **State Management** -- Zustand stores for dialog and page-level state; Apollo in-memory cache for server data
- **Role-Based Access** -- `AdminAuthContext` provides role flags (`isAdmin`, `isPremium`, `isPro`, `isLite`) across the component tree
- **Type Safety** -- Strict TypeScript config with `noUnusedLocals` and `noUnusedParameters` enabled

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Environment Variables

| Variable                             | Description               |
| ------------------------------------ | ------------------------- |
| `NEXT_PUBLIC_GRAPHQL_API_URL`        | Back-end GraphQL endpoint |
| `NEXT_PUBLIC_API_URL`                | Back-end REST base URL    |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`  | Clerk publishable key     |
| `CLERK_SECRET_KEY`                   | Clerk secret key          |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key    |

### Install and Run

```bash
npm install
npm run dev
```

### Available Scripts

| Script          | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Production build         |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |
| `npm run knip`  | Detect unused code       |

---

**Built by [JordacheWD](https://jordachewd.com)**
