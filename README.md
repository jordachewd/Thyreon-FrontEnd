# 🛡️ WPGuard Frontend – WordPress Maintenance Dashboard

**WPGuard Frontend** is a Next.js-based web application that provides a centralized dashboard for WordPress site management. Built for freelancers, agencies, and site owners, it offers an intuitive interface to monitor, maintain, and secure multiple WordPress installations.

---

## 🌐 Live Demo

> **[wpguard.vercel.app](https://wpguard.vercel.app/)**

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Development](#-development)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [License](#-license)

---

## 🎯 Overview

This is the frontend application for the WPGuard platform, providing:

- **User Interface** for managing multiple WordPress sites
- **Dashboard** with real-time monitoring and analytics
- **Authentication** via Clerk (OAuth, magic links, email/password)
- **Role-Based Access Control** (Admin, Premium, Pro, Lite)
- **Subscription Management** with Stripe integration
- **GraphQL Integration** with the WPGuard backend API

### Related Repositories

- **Backend API** – NestJS server with GraphQL, PostgreSQL, and Prisma (separate repository)
- **WordPress Plugin** – Client plugin for WordPress sites (separate repository)

---

## 📦 Tech Stack

| Category           | Technology                                    |
|--------------------|-----------------------------------------------|
| **Framework**      | Next.js 16 (App Router)                       |
| **Language**       | TypeScript 5.7+                               |
| **Authentication** | Clerk (JWT sessions, RBAC)                    |
| **GraphQL Client** | Apollo Client 4.0                             |
| **UI Framework**   | Material-UI (MUI) 7.2                         |
| **Styling**        | Tailwind CSS 4.1 + Emotion + Styled Components|
| **Icons**          | Bootstrap Icons                               |
| **State**          | Zustand + Apollo Cache                        |
| **Real-time**      | Socket.IO Client                              |
| **Forms**          | React Hook Form / Native                      |

**Backend:** NestJS with GraphQL, PostgreSQL, and Prisma (separate repository)  
**WordPress Plugin:** PHP client plugin for site integration (separate repository)

---

## ✨ Features

### User Interface

- 🏠 **Landing Page** – Public-facing homepage with product information
- 🔐 **Authentication** – Secure login via Clerk (OAuth, magic links, email/password)
- 📊 **Admin Dashboard** – User and site management interface
- 👤 **User Dashboard** – Personal dashboard with site overview and management
- 💳 **Subscription Management** – Plan selection and Stripe checkout integration
- 📱 **Responsive Design** – Mobile-first, fully responsive UI

### Dashboard Features

**Admin Panel:**
- User management (view, create, update, delete)
- Site management and monitoring
- Transaction history and analytics
- API key regeneration
- Charts and visualizations (MUI X-Charts)

**User Panel:**
- Personal site overview
- Site settings and configuration
- Notifications and alerts
- Account settings
- Subscription and billing management
- FAQs and support resources

### Technical Features

- ✅ **Server-Side Rendering** – Next.js App Router with SSR/SSG
- ✅ **Type-Safe GraphQL** – Apollo Client with code generation
- ✅ **Real-Time Updates** – Socket.IO integration
- ✅ **Theme Support** – Light/dark mode with MUI theming
- ✅ **Form Validation** – Client-side validation with React Hook Form
- ✅ **Error Handling** – Comprehensive error boundaries and user feedback
- ✅ **SEO Optimized** – Meta tags, Open Graph, and structured data

---

## 📁 Project Structure

```
front-end/
├── src/
│   ├── app/
│   │   ├── (admin)/         # Admin-only routes
│   │   │   ├── admin/
│   │   │   └── layout.tsx
│   │   ├── (app)/           # Authenticated user routes
│   │   │   ├── dashboard/
│   │   │   ├── sites/
│   │   │   ├── plans/
│   │   │   ├── settings/
│   │   │   ├── account/
│   │   │   ├── notifications/
│   │   │   ├── faqs/
│   │   │   ├── users/
│   │   │   └── layout.tsx
│   │   ├── (public)/        # Public routes
│   │   ├── 401/             # Unauthorized page
│   │   ├── 404/             # Not found page
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── layout/          # Layout components
│   │   ├── sections/        # Page sections
│   │   └── shared/          # Reusable components
│   ├── constants/           # Configuration constants
│   │   ├── api/
│   │   ├── demo-data/
│   │   ├── graphql/
│   │   ├── layout/
│   │   ├── sites/
│   │   ├── table/
│   │   └── users/
│   ├── context/             # React Context providers
│   ├── lib/                 # Utilities and helpers
│   ├── styles/              # Global styles
│   ├── themes/              # MUI theme configuration
│   └── types/               # TypeScript type definitions
├── public/
│   └── images/              # Static assets
├── package.json
├── next.config.ts
├── tsconfig.json
├── eslint.config.mjs
├── postcss.config.mjs
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20+ and npm/yarn/pnpm
- **Backend API** running (see backend repository)
- **Clerk Account** (for authentication)
- **Stripe Account** (for payment testing)

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Backend API
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

The application will run on `http://localhost:3000`

---

## 💻 Development

### Available Scripts

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint

# Dependency analysis
npm run knip
```

### Project Configuration

- **Next.js Config:** [next.config.ts](next.config.ts)
- **TypeScript Config:** [tsconfig.json](tsconfig.json)
- **ESLint Config:** [eslint.config.mjs](eslint.config.mjs)
- **PostCSS Config:** [postcss.config.mjs](postcss.config.mjs)

### Key Dependencies

```json
{
  "next": "16.0.10",
  "@apollo/client": "^4.0.9",
  "@clerk/nextjs": "^6.25.4",
  "@mui/material": "^7.2.0",
  "tailwindcss": "^4.1.11",
  "graphql": "^16.11.0",
  "socket.io-client": "^4.8.1",
  "zustand": "^5.0.7"
}
```

---

## 🧪 Testing

```bash
# Linting
npm run lint

# Type checking
npx tsc --noEmit

# Dependency analysis
npm run knip
```

---

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables:
   - `NEXT_PUBLIC_BACKEND_URL`
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
4. Deploy automatically on push to `main` branch

### Manual Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Environment Configuration

Make sure to update `NEXT_PUBLIC_BACKEND_URL` to point to your production backend API.

---

## 📝 License

This project is licensed under the **GNU General Public License v3.0 or later**.

See [LICENSE](LICENSE) for more information.

---

## 👨‍💻 Author

**JWD (Jordache Web Development)**

- Website: [https://jordachewd.com](https://jordachewd.com)
- GitHub: [@jordachewd](https://github.com/jordachewd)

---

**Built with ❤️ by JordacheWD**
