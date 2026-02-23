# 🛡️ Thyreion Frontend

**Thyreion Frontend** is a Next.js-based web application that provides a centralized dashboard for WordPress site management. Built for freelancers, agencies, and site owners, it offers an intuitive interface to monitor, maintain, and secure multiple WordPress installations.

---

## 🌐 Live Demo

> **[wpguard.vercel.app](https://wpguard.vercel.app/)**

---

## 🎯 Overview

This is the frontend application for the Thyreion platform, providing:

- **User Interface** for managing multiple WordPress sites
- **Dashboard** with real-time monitoring and analytics
- **Authentication** via Clerk (OAuth, magic links, email/password)
- **Role-Based Access Control** (Admin, Premium, Pro, Lite)
- **Subscription Management** with Stripe integration
- **GraphQL Integration** with the Thyreion backend API

### Related Repositories

- **[Backend API](https://github.com/jordachewd/WPGuard-BackEnd)** – NestJS server with GraphQL, PostgreSQL, and Prisma
- **[WordPress Plugin](https://github.com/jordachewd/WPGuard-Client)** – Client plugin for WordPress sites

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

**[Backend:](https://github.com/jordachewd/WPGuard-BackEnd)** NestJS with GraphQL, PostgreSQL, and Prisma  
**[WordPress Plugin:](https://github.com/jordachewd/WPGuard-Client)** PHP client plugin for site integration 

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

## 📝 License

This project is licensed under the **GNU General Public License v3.0 or later**.

See [LICENSE](LICENSE) for more information.

---

**Built with ❤️ by [JordacheWD](https://jordachewd.com)**
