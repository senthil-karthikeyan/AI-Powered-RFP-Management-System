# AI-Powered RFP Management Backend

This repository contains the backend service for an **AI-powered Request for Proposal (RFP) management system**.

The backend enables procurement teams to create RFPs using natural language, send them to vendors via email, receive vendor responses through inbound email webhooks, and automatically parse and structure proposal data using AI.

The system is designed as a **single-user, production-style backend** with clean architecture, strict validation, and real-world integrations.

---

## 🚀 Features

- AI-powered RFP creation from free-text input
- Vendor management (create & list vendors)
- Send RFPs to vendors using SendGrid dynamic templates
- Inbound email webhook for vendor replies
- AI-based proposal parsing and structuring
- PostgreSQL persistence with Prisma ORM
- Feature-based scalable architecture
- Centralized error handling & standardized API responses
- Swagger (OpenAPI 3.0.3) API documentation

---

## 🧠 High-Level Workflow

1. User submits a natural-language procurement request
2. AI converts the request into structured RFP data
3. RFP is stored in the database
4. User selects vendors and sends the RFP via email
5. Vendors reply directly to the email
6. Inbound email webhook receives the reply
7. AI parses the vendor proposal into structured data
8. Proposal is saved and linked to the RFP and vendor

---

## 🧱 Tech Stack

- **Runtime**: Node.js (ESM)
- **Language**: TypeScript
- **Framework**: Express
- **Database**: PostgreSQL
- **ORM**: Prisma
- **AI**: TanStack AI + OpenAI
- **Email**: SendGrid
- **API Docs**: Swagger / OpenAPI 3.0.3
- **Dev Tools**: tsx, ESLint, Prettier, tsup

---

## 📁 Project Structure

```
src/
├── app.ts                # Express app setup
├── server.ts             # Server entry point
├── routes.ts             # Route aggregation
├── env.ts                # Environment validation
├── swagger.json          # OpenAPI specification
│
├── features/
│   ├── rfp/              # RFP feature
│   ├── vendor/           # Vendor feature
│   └── email/            # Email / inbound webhook feature
│
├── shared/
│   ├── ai/               # AI logic (RFP + proposal parsing)
│   ├── lib/              # Prisma, email client
│   ├── middleware/       # Global error handling
│   └── utils/            # API response helpers & constants
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
```

The project follows a **feature-based architecture**, making it easy to scale and reason about each domain independently.

---

## ⚙️ Prerequisites

- Node.js v18+
- Docker & Docker Compose
- OpenAI API key
- SendGrid account with a verified sender
- Git

---

## 🔐 Environment Configuration

This backend uses **strict environment validation** powered by `@t3-oss/env-core` and `zod`.

All required environment variables are validated at startup.
If any variable is missing or invalid, the application **fails fast** with a clear error.

### Environment Variables Overview

The backend expects environment variables for:

- Server configuration (port)
- PostgreSQL database connection
- OpenAI API access
- SendGrid email sending
- SendGrid dynamic email templates

A `.env.example` file is included in the repository to document all required variables without exposing secrets.

---

## 🐳 Database Setup (Docker-based PostgreSQL)

PostgreSQL is run **locally using Docker**, ensuring a consistent and reproducible database environment.

### Why Docker for the Database?

- No local PostgreSQL installation required
- Consistent database version across machines
- Easy teardown and reset
- Production-like setup for local development

### Start the Database

```
docker compose up -d
```

This will:

- Start a PostgreSQL container
- Expose it on the configured port
- Persist data using a Docker volume

### Stop the Database

```
docker compose down
```

Database data is persisted via Docker volumes and will remain unless explicitly removed.

---

## 🗄️ Database Initialization (Prisma)

Once the database container is running, initialize the schema:

```
npx prisma migrate dev
npx prisma generate
```

This will:

- Apply database migrations
- Generate the Prisma client
- Prepare the database for application use

---

## ▶️ Running the Backend

### Development (Watch Mode)

```
yarn dev
```

- Uses `tsx` for fast reloads
- Automatically restarts on file changes

### Production

```
yarn build
yarn start
```

- Compiles TypeScript
- Runs the compiled output from `dist/`

---

## 🌐 Exposing Backend with ngrok (Required for Inbound Email)

To receive vendor email responses via SendGrid's Inbound Parse webhook, your local backend must be accessible from the internet. Use **ngrok** to create a secure tunnel:

### Install ngrok

```bash
# macOS
brew install ngrok

# Or download from https://ngrok.com/download
```

### Start ngrok Tunnel

```bash
ngrok http 8000
```

This will output a public HTTPS URL like `https://abc123.ngrok.io`.

### Configure SendGrid Inbound Parse

1. Go to [SendGrid Dashboard → Settings → Inbound Parse](https://app.sendgrid.com/settings/parse)
2. Click **Add Host & URL**
3. Enter your ngrok URL with the webhook path:
   ```
   https://abc123.ngrok.io/api/emails/inbound
   ```
4. Set the subdomain/domain you want to receive emails on (e.g., `rfp@yourdomain.com`)
5. Save the configuration

### Testing

Send a test email to the configured address. The email will be forwarded to your local backend via the ngrok tunnel, triggering the `/api/emails/inbound` endpoint.

> **Important**: ngrok URLs change every time you restart ngrok. You'll need to update the SendGrid Inbound Parse URL accordingly.

---

## 📚 API Documentation

Swagger UI is available at:

```
http://localhost:8000/api/docs
```

The API follows **OpenAPI 3.0.3** and is fully synchronized with backend routes and schemas.

---

## 🔌 API Endpoints

### RFP

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/rfps`          | Create RFP using AI |
| GET    | `/api/rfps`          | List all RFPs       |
| GET    | `/api/rfps/:id`      | Get RFP by ID       |
| POST   | `/api/rfps/:id/send` | Send RFP to vendors |

---

### Vendor

| Method | Endpoint       | Description   |
| ------ | -------------- | ------------- |
| POST   | `/api/vendors` | Create vendor |
| GET    | `/api/vendors` | List vendors  |

---

### Email

| Method | Endpoint              | Description                      |
| ------ | --------------------- | -------------------------------- |
| POST   | `/api/emails/inbound` | Inbound email webhook (SendGrid) |

---

## 🤖 AI Integration

AI is used in two critical places:

### RFP Structuring

- Converts raw procurement text into structured data
- Produces schema-validated output
- Ensures consistency across vendors and comparisons

### Proposal Parsing

- Extracts pricing, delivery timelines, warranty, and notes
- Handles unstructured vendor email replies

All AI outputs are validated against schemas before persistence.

---

## ❗ Error Handling Strategy

- **Controllers**
  - Validate request parameters and body
  - Handle missing or invalid input
  - Handle `null` or `undefined` service responses

- **Services**
  - Contain pure business logic
  - No HTTP concerns

- **Global error middleware**
  - Ensures consistent error responses
  - Prevents unhandled crashes

---

## 📦 Standard API Response Format

### Success

```
{
  success: true,
  data: ...
}
```

### Error

```
{
  success: false,
  error: {
    code: "ERROR_CODE",
    message: "Human readable message"
  }
}
```

This format is enforced across all endpoints.

---

## 🧪 Available Scripts

```
yarn dev        # Run in watch mode
yarn build      # Build for production
yarn start      # Start production server
yarn lint       # Lint code
yarn format     # Format code
```

---

## 🔮 Future Enhancements

- Proposal comparison & scoring
- Vendor recommendation engine
- PDF attachment parsing
- Authentication & multi-tenant support
- Background jobs & queues

---

## 🧠 Design Philosophy

- Feature-based modular architecture
- Clear separation of concerns
- AI as an augmentation layer, not business logic
- Production-grade validation, error handling, and APIs

---
