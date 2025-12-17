# 🛡️ WPGuard – WordPress Maintenance & Security Platform

**WPGuard** is a comprehensive full-stack SaaS solution designed to simplify WordPress site management for freelancers, agencies, and site owners. It provides a centralized dashboard to monitor, maintain, and secure multiple WordPress installations with real-time updates, subscription-based billing, and advanced user management.

---

## 🌐 Live Demo

> **[wpguard.vercel.app](https://wpguard.vercel.app/)**

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Development](#-development)
- [Deployment](#-deployment)
- [License](#-license)

---

## 🎯 Overview

WPGuard is a multi-tenant platform that enables users to:

- **Monitor** multiple WordPress sites from a single dashboard
- **Manage** site backups, updates, and security scans
- **Track** site health, logs, and activity in real-time
- **Control** access with role-based permissions (Lite, Pro, Premium, Admin)
- **Subscribe** to tiered plans with integrated Stripe payments
- **Deploy** a lightweight WordPress client plugin for seamless communication

The platform consists of three main components:

1. **Frontend** – Next.js 16 application with MUI and Apollo Client
2. **Backend** – NestJS API with GraphQL, REST, and WebSocket support
3. **WordPress Plugin** – Client-side plugin for site integration

---

## 🏗️ Architecture

```
┌─────────────────┐         ┌─────────────────┐         ┌──────────────────┐
│   Next.js App   │ ◄─────► │  NestJS Backend │ ◄─────► │   PostgreSQL     │
│   (Frontend)    │         │   (API Server)  │         │    Database      │
└─────────────────┘         └─────────────────┘         └──────────────────┘
        │                            │
        │                            │
        ▼                            ▼
┌─────────────────┐         ┌─────────────────┐
│  Clerk Auth     │         │  WordPress Site │
│  (Identity)     │         │  + WPGuard      │
└─────────────────┘         │  Client Plugin  │
        │                   └─────────────────┘
        ▼
┌─────────────────┐
│  Stripe API     │
│  (Payments)     │
└─────────────────┘
```

**Communication Flow:**
- Frontend ↔ Backend: GraphQL (queries/mutations), REST (webhooks, file uploads)
- Backend ↔ WordPress: REST API (JWT-based authentication via handshake)
- Backend ↔ Database: Prisma ORM (PostgreSQL)
- Frontend ↔ Clerk: Authentication & user management
- Backend ↔ Stripe: Payment processing & webhooks

---

## 📦 Tech Stack

### ⚛️ Frontend (Next.js)

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

### 🔧 Backend (NestJS)

| Category           | Technology                                    |
|--------------------|-----------------------------------------------|
| **Framework**      | NestJS 11.1                                   |
| **Language**       | TypeScript 5.7+                               |
| **API**            | GraphQL (Apollo Server 5.2) + REST            |
| **Authentication** | Clerk (Passport.js integration)               |
| **Authorization**  | Role-Based Access Control (RBAC)              |
| **ORM**            | Prisma 7.1 (PostgreSQL adapter)               |
| **Database**       | PostgreSQL                                    |
| **Real-time**      | WebSockets (Socket.IO)                        |
| **Validation**     | class-validator + class-transformer           |
| **Logging**        | nestjs-pino (structured logging)              |
| **Documentation**  | Swagger/OpenAPI                               |
| **Payments**       | Stripe API                                    |
| **Security**       | bcryptjs, JWT, cookie-parser                  |

### 🔌 WordPress Plugin

| Category           | Technology                                    |
|--------------------|-----------------------------------------------|
| **Language**       | PHP 8.2+                                      |
| **Framework**      | WordPress Plugin API                          |
| **Authentication** | JWT (site-level tokens via handshake)         |
| **Communication**  | WordPress HTTP API                            |
| **Version**        | 1.0.2                                         |

---

## ✨ Features

### Core Functionality

- ✅ **Multi-Site Management** – Manage unlimited WordPress sites from one dashboard
- ✅ **Real-Time Monitoring** – Live site status, health checks, and activity logs
- ✅ **User Authentication** – Secure authentication via Clerk (OAuth, magic links, email/password)
- ✅ **Role-Based Access** – Four user roles (Admin, Premium, Pro, Lite) with granular permissions
- ✅ **Subscription Plans** – Tiered pricing with monthly/yearly billing via Stripe
- ✅ **GraphQL API** – Type-safe queries and mutations for all resources
- ✅ **REST Endpoints** – Webhooks, file uploads, and external integrations
- ✅ **Site API Keys** – Secure authentication between WordPress sites and backend
- ✅ **JWT Token Refresh** – Automatic handshake mechanism for WordPress client plugin

### Admin Dashboard

- 📊 User management (view, create, update, delete users)
- 🌐 Site management (view, create, update, delete sites)
- 🔑 API key regeneration for sites
- 💳 Transaction history and billing overview
- 📈 Analytics and charts (MUI X-Charts)
- 📝 Activity logs and audit trails

### User Dashboard

- 🏠 Personal dashboard with site overview
- ⚙️ Site settings and configuration
- 📦 Backup management
- 🔔 Notifications and alerts
- 👤 Account settings
- 💰 Subscription and billing management
- ❓ FAQs and support resources

### WordPress Integration

- 🔌 Lightweight client plugin (WPGuard Client v1.0.2)
- 🔐 Secure handshake-based authentication
- 📡 Auto-sync site data (domain, version, plugin version)
- 📊 Admin dashboard widget (planned)
- 🔄 Automatic updates and backups (planned)
- 🛡️ Security scanning integration (planned)

---

## 📁 Project Structure

```
WPGuard/
├── front-end/              # Next.js frontend application
│   ├── src/
│   │   ├── app/
│   │   │   ├── (admin)/    # Admin-only routes
│   │   │   ├── (app)/      # Authenticated user routes
│   │   │   │   ├── dashboard/
│   │   │   │   ├── sites/
│   │   │   │   ├── plans/
│   │   │   │   ├── settings/
│   │   │   │   └── ...
│   │   │   ├── (public)/   # Public routes (landing page)
│   │   │   └── ...
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   ├── sections/
│   │   │   └── shared/
│   │   ├── constants/
│   │   ├── context/        # React Context providers
│   │   ├── lib/            # Utilities and helpers
│   │   ├── styles/
│   │   ├── themes/
│   │   └── types/
│   ├── public/
│   ├── package.json
│   ├── next.config.ts
│   └── tsconfig.json
│
├── back-end/               # NestJS backend API
│   ├── src/
│   │   ├── auth/           # Clerk authentication module
│   │   ├── auth-site/      # WordPress site authentication
│   │   ├── users/          # User management module
│   │   ├── sites/          # Site management module
│   │   ├── transactions/   # Payment & subscription module
│   │   ├── checkout/       # Stripe checkout integration
│   │   ├── prisma/         # Prisma service
│   │   ├── providers/      # External providers (Clerk, Stripe)
│   │   ├── common/         # Shared utilities
│   │   ├── schema.gql      # GraphQL schema (auto-generated)
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── prisma/
│   │   ├── schema.prisma   # Database schema
│   │   └── migrations/
│   ├── package.json
│   ├── nest-cli.json
│   └── tsconfig.json
│
├── wordpress/              # Local WordPress development environment
│   ├── docker-compose.yml  # MariaDB + WordPress + phpMyAdmin
│   ├── wp-content/
│   │   └── plugins/
│   │       └── wpguard-client/  # WPGuard WordPress plugin
│   │           ├── wpguard-client.php
│   │           ├── includes/
│   │           │   └── admin-dashboard.php
│   │           └── README.md
│   └── ...
│
└── README.md               # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20+ and npm/yarn
- **PostgreSQL** 14+ (or Docker)
- **PHP** 8.2+ (for WordPress plugin development)
- **Docker** & Docker Compose (optional, for local WordPress)
- **Clerk Account** (for authentication)
- **Stripe Account** (for payments)

### Environment Variables

Create `.env` files in both `front-end` and `back-end` directories.

#### Backend `.env`

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/wpguard?schema=public"

# API Configuration
API_URL=http://localhost:3001
FRONTEND_URL=http://localhost:3000
PORT=3001

# Clerk Authentication
CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# JWT
JWT_SECRET=your-jwt-secret-key

# Environment
NODE_ENV=development
```

#### Frontend `.env.local`

```env
# API
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

#### WordPress Plugin Configuration

Edit `wpguard-client.php`:

```php
if (!defined('WPGC_BACKEND_URL')) 
    define('WPGC_BACKEND_URL', 'http://host.docker.internal:3001/');
```

---

## 💻 Development

### 1. Backend Setup

```bash
cd back-end

# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed database (if available)
npx prisma db seed

# Start development server
npm run start:dev
```

Backend will run on `http://localhost:3001`
- GraphQL Playground: `http://localhost:3001/graphql`
- Swagger Docs: `http://localhost:3001/api-docs`

### 2. Frontend Setup

```bash
cd front-end

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on `http://localhost:3000`

### 3. WordPress Setup (Optional)

```bash
cd wordpress

# Create .env file with database credentials
cp .env.example .env

# Start Docker containers
docker-compose up -d
```

- WordPress: `http://localhost:8080`
- phpMyAdmin: `http://localhost:8081`

#### Install WPGuard Client Plugin

1. Navigate to WordPress admin: `http://localhost:8080/wp-admin`
2. Go to Plugins → Installed Plugins
3. Activate "WP Guard Client"
4. Configure API key in WP Guard → Settings

### Database Schema

The Prisma schema includes:

- **Users** – User accounts with Clerk integration
- **Sites** – WordPress sites with API keys
- **Transactions** – Stripe payment records
- **SiteSettings** – Per-site configuration
- **Backups** – Backup history and files
- **Logs** – Activity and event logs

### GraphQL Schema

Key queries and mutations:

**Queries:**
- `me` – Current authenticated user
- `meSites` – Sites owned by current user
- `users` – All users (admin only)
- `sites` – All sites (admin only)
- `transactions` – Transaction history

**Mutations:**
- `createUser` / `updateUser` / `deleteUsers`
- `createSite` / `updateSite` / `deleteSites`
- `regenerateApiKey` – Generate new site API key

---

## 🧪 Testing

### Backend

```bash
cd back-end

# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Linting
npm run lint
```

### Frontend

```bash
cd front-end

# Linting
npm run lint

# Dependency analysis
npm run knip
```

---

## 🚢 Deployment

### Backend Deployment (Railway/Heroku/AWS)

1. Set production environment variables
2. Build the application:
   ```bash
   npm run build
   ```
3. Run migrations:
   ```bash
   npx prisma migrate deploy
   ```
4. Start production server:
   ```bash
   npm run start:prod
   ```

### Frontend Deployment (Vercel)

1. Push code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy automatically on push to `main` branch

### WordPress Plugin Distribution

The plugin can be:
- Uploaded directly via WordPress admin
- Distributed via GitHub releases
- Published to WordPress.org plugin repository (future)

---

## 🔒 Security

- JWT-based authentication for both users (Clerk) and sites
- Role-based access control (RBAC) with four permission levels
- API key rotation for WordPress sites
- Secure webhook signature verification (Clerk, Stripe)
- CORS configuration for frontend-backend communication
- Rate limiting and validation on all API endpoints
- Encrypted database connections (SSL)

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

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📮 Support

For support, email support@jordachewd.com or open an issue in the GitHub repository.

---

**Built with ❤️ by JordacheWD**
