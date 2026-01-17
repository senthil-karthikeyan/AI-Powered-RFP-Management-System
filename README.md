# AI-Powered RFP Management System

A full-stack web application that streamlines the procurement process by allowing users to create Requests for Proposal (RFPs) using natural language, manage vendors, send RFPs via email, receive vendor responses, and automatically evaluate proposals using AI.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Setup](#project-setup)
- [API Documentation](#api-documentation)
- [Decisions & Assumptions](#decisions--assumptions)
- [AI Tools Usage](#ai-tools-usage)

---

## 🎯 Overview

This system addresses the slow, error-prone, and manual procurement process by:

1. **Creating RFPs**: Users describe procurement needs in natural language; AI converts this into structured RFP data.
2. **Managing Vendors**: Maintain vendor information and select recipients for RFPs.
3. **Sending RFPs**: Automatically send RFPs to selected vendors via email.
4. **Receiving Proposals**: Inbound email webhook receives vendor responses and AI parses them into structured data.
5. **Evaluating Proposals**: AI-assisted comparison and recommendation of vendor proposals.

---

## ✨ Features

- **AI-Powered RFP Creation**: Natural language input converted to structured RFP data
- **Vendor Management**: Create and manage vendor contacts
- **Email Integration**: Send RFPs and receive proposals via SendGrid
- **Automatic Proposal Parsing**: AI extracts pricing, terms, and conditions from vendor emails
- **AI-Assisted Evaluation**: Compare proposals with AI-generated summaries and recommendations
- **Interactive UI**: Modern, responsive interface built with React and Shadcn UI
- **Real-time Updates**: TanStack Query for efficient data synchronization

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: React (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Shadcn UI
- **Routing**: TanStack Router
- **State Management**: TanStack Query (React Query)
- **Forms**: TanStack Form, Zod validation

### Backend

- **Runtime**: Node.js (ESM)
- **Language**: TypeScript
- **Framework**: Express
- **Database**: PostgreSQL
- **ORM**: Prisma
- **AI**: TanStack AI + OpenAI
- **Email**: SendGrid
- **API Docs**: Swagger / OpenAPI 3.0.3

---

## 🚀 Project Setup

### Prerequisites

- Node.js v18+
- Yarn (or npm)
- Docker & Docker Compose (for PostgreSQL)
- OpenAI API key
- SendGrid account with verified sender

### 1. Clone the Repository

```bash
git clone <repository-url>
cd folder
```

### 2. Backend Setup

#### Environment Configuration

Create a `.env` file in the `backend` directory:

See `backend/.env.example` for all required variables.

#### Start PostgreSQL

```bash
cd backend
docker compose up -d
```

#### Install Dependencies & Initialize Database

```bash
yarn install
npx prisma migrate dev
npx prisma generate
```

#### Run Backend

```bash
yarn dev
```

Backend will be available at `http://localhost:8000`.

API documentation: `http://localhost:8000/api/docs`

### 3. Frontend Setup

#### Environment Configuration

Create a `.env` file in the `frontend` directory:

```env
VITE_BACKEND_BASE_URL=http://localhost:8000/api
```

#### Install Dependencies & Run

```bash
cd frontend
yarn install
yarn dev
```

Frontend will be available at `http://localhost:3000`.

---

## 📚 API Documentation

### RFP Endpoints

| Method | Endpoint                 | Description                |
| ------ | ------------------------ | -------------------------- |
| POST   | `/api/rfps`              | Create RFP using AI        |
| GET    | `/api/rfps`              | List all RFPs              |
| GET    | `/api/rfps/:id`          | Get RFP by ID              |
| POST   | `/api/rfps/:id/send`     | Send RFP to vendors        |
| POST   | `/api/rfps/:id/evaluate` | AI evaluation of proposals |

### Vendor Endpoints

| Method | Endpoint       | Description   |
| ------ | -------------- | ------------- |
| POST   | `/api/vendors` | Create vendor |
| GET    | `/api/vendors` | List vendors  |

### Email Endpoints

| Method | Endpoint              | Description                      |
| ------ | --------------------- | -------------------------------- |
| POST   | `/api/emails/inbound` | Inbound email webhook (SendGrid) |

### Example: Create RFP

**Request:**

```bash
POST /api/rfps
Content-Type: application/json

{
  "rawInput": "I need 20 laptops with 16GB RAM and 15 monitors 27-inch. Budget is $50,000. Delivery within 30 days."
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title": "Laptops and Monitors Procurement",
    "rawContent": "I need 20 laptops...",
    "structuredContent": {
      "items": [...],
      "budget": 50000,
      "deliveryTimeline": "30 days"
    }
  }
}
```

Full API documentation available at `http://localhost:8000/api/docs`.

---

## 🧠 Decisions & Assumptions

### Architecture

- **Monorepo Structure**: Frontend and backend in separate directories for clear separation of concerns.
- **Feature-Based Organization**: Both frontend and backend use feature-based folder structures (RFP, Vendor, Email) to keep related logic co-located.
- **Type Safety**: TypeScript throughout the stack with Zod for runtime validation.

### AI Integration

- **Structured Output**: AI is used to convert unstructured input (natural language RFPs, email responses) into structured, validated data.
- **Backend-Centric AI Logic**: All AI prompting and parsing happens in the backend; frontend receives clean, structured responses.
- **OpenAI GPT-4**: Chosen for strong reasoning capabilities in parsing complex vendor responses.

### Email Integration

- **SendGrid**: Used for both sending (SMTP) and receiving (Inbound Parse Webhook) emails.
- **Dynamic Templates**: RFPs are sent using SendGrid dynamic templates for consistent formatting.
- **Webhook-Based Receiving**: Vendor responses are captured via SendGrid's Inbound Parse webhook, requiring a public endpoint (ngrok for local development).

### State Management

- **TanStack Query**: Handles all server state (RFPs, vendors, proposals) with automatic caching and invalidation.
- **No Global State**: Avoided Redux/Zustand to reduce complexity; local component state and React Query are sufficient for this single-user application.

### Database

- **PostgreSQL + Prisma**: Relational database for structured data with type-safe ORM.
- **Docker for Local DB**: Ensures consistent development environment.

### Assumptions

- **Single User**: No authentication or multi-tenancy as per assignment requirements.
- **Email Format**: Vendor responses are assumed to be in the email body (not attachments, though the system can be extended).
- **Synchronous AI Calls**: AI processing is synchronous; for production, this could be moved to background jobs.

---

## 🤖 AI Tools Usage

During development, AI assistants were extensively used to accelerate development and improve code quality:

### Tools Used

- **Antigravity IDE / ChatGPT**: Primary coding assistant

### How They Helped

1. **Boilerplate Generation**
   - Generated Shadcn UI forms with Zod validation
   - Created Prisma schemas and migrations
   - Scaffolded Express routes and controllers

2. **Refactoring**
   - Created barrel files (`index.ts`) for cleaner imports across the frontend
   - Refactored service layer to use TanStack Query hooks
   - Improved error handling patterns

3. **Debugging**
   - Fixed TypeScript type mismatches
   - Resolved Prisma relation issues
   - Debugged email webhook payload parsing

4. **Prompt Engineering**
   - Designed prompts for RFP structuring and proposal parsing
   - Iterated on AI output schemas to ensure consistency

### Example Prompts

- _"Create a Prisma schema for RFPs, Vendors, and Proposals with proper relations"_
- _"Generate a TanStack Query hook for fetching and creating RFPs"_
- _"Write an OpenAI prompt that extracts pricing and delivery terms from vendor email text"_

### Learnings

- AI tools significantly reduced time spent on repetitive tasks (forms, API routes)
- Human oversight was critical for architectural decisions and business logic
- Iterative prompting improved AI output quality for complex tasks like proposal parsing

---

## 📂 Project Structure

```
aerchain/
├── backend/
│   ├── src/
│   │   ├── features/         # Feature modules (RFP, Vendor, Email)
│   │   ├── shared/           # AI, middleware, utilities
│   │   ├── prisma/           # Database schema & migrations
│   │   └── app.ts            # Express app
│   ├── .env.example
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── features/         # Feature modules (RFP, Vendor)
│   │   ├── components/       # Shared UI components
│   │   ├── services/         # API integration
│   │   └── routes/           # TanStack Router routes
│   ├── .env.example
│   └── README.md
│
└── README.md                 # This file
```

---
