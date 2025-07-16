# 🛡️ WP Guard – WordPress Maintenance Made Easy

**WP Guard** is a full-stack SaaS platform that simplifies WordPress site management. Designed for freelancers, agencies, and site owners, it offers a centralized dashboard to monitor, maintain, and secure your WordPress sites — with real-time updates, billing integration, and user management powered by Clerk.

---

## 🌐 Live Demo

> Coming Soon…

---

## 📦 Tech Stack

### 🔧 Backend – NestJS

| Category            | Technology/Library                          |
|---------------------|---------------------------------------------|
| Framework           | [NestJS](https://nestjs.com/)               |
| Language            | TypeScript                                  |
| Authentication      | [Clerk](https://clerk.dev/) via Passport    |
| Authorization       | Role-Based Access Control (RBAC)            |
| API Types           | GraphQL (Apollo Driver), REST               |
| Database ORM        | [Prisma](https://www.prisma.io/)            |
| Database            | PostgreSQL                                  |
| Logging             | [nestjs-pino](https://github.com/iamolegga/nestjs-pino) |
| Configuration       | `@nestjs/config`                            |
| Documentation       | Swagger (`@nestjs/swagger`)                 |
| Static Hosting      | `@nestjs/serve-static`                      |

---

### ⚛️ Frontend – Next.js 15+ (App Router)

| Category            | Technology/Library                          |
|---------------------|---------------------------------------------|
| Framework           | [Next.js](https://nextjs.org/) App Router   |
| Language            | TypeScript                                  |
| Authentication      | [@clerk/nextjs](https://clerk.dev/)         |
| GraphQL Client      | [Apollo Client](https://www.apollographql.com/docs/react/) |
| UI Library          | [MUI (Material UI)](https://mui.com/)       |
| State Management    | Apollo Client cache + React Hooks           |
| Data Fetching       | Fetch API + FormData support                |
| Forms               | React Hook Form / Native                    |
| Env Management      | `.env.local`, `.env.production`             |

---

## 🚧 Features (in progress)

- 🔐 Auth via Clerk (JWT, sessions, RBAC)
- 📊 GraphQL API with `@nestjs/graphql`
- 🧾 Stripe-powered billing & subscriptions
- 🔄 Clerk webhooks for user sync
- 💼 Admin dashboard for user/site management
- 🗃️ Transaction logs
- 🔧 Static & dynamic health checks
- 🧪 Full unit + integration test setup (planned)

---

## 📁 Folder Structure (Backend)

src/
├── auth/ # Clerk strategy, guards, decorators
├── checkout/ # Stripe integration
├── common/ # Shared types & decorators
├── prisma/ # Prisma service + client
├── users/ # User resolvers, services, DTOs
├── graphql/ # Auto-generated schemas
├── main.ts # App bootstrap
└── app.module.ts # Root module