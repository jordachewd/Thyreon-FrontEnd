# Thyreon

<div align="center">

![Thyreon](public/images/home-hero--480x480.png)

_WordPress Maintenance Made Easy_

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://thyreon.jwd-apps.com)

</div>

---

## Overview

**Thyreon** is a Next.js-based web application that provides a centralized dashboard for WordPress site management. Built for freelancers, agencies, and site owners, it offers an intuitive interface to monitor, maintain, and secure multiple WordPress installations.

---

This is the front-end application for the Thyreon platform, providing:

- **User Interface** for managing multiple WordPress sites
- **Dashboard** with real-time monitoring and analytics
- **Authentication** via Clerk (OAuth, magic links, email/password)
- **Role-Based Access Control** (Admin, Premium, Pro, Lite)
- **Subscription Management** with Stripe integration
- **GraphQL Integration** with the Thyreon back-end API

### Related Repositories

- **[Thyreon BackEnd](https://github.com/jordachewd/Thyreon-BackEnd)** -- NestJS server with GraphQL, PostgreSQL, and Prisma
- **[Thyreon WP-Client](https://github.com/jordachewd/Thyreon-WP-Client)** -- Client plugin for WordPress sites

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

**Built by [JordacheWD](https://jordachewd.com)**