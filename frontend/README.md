# AI-Powered RFP Management System

This web application streamlines the procurement process by allowing users to create Requests for Proposal (RFPs) using natural language, manage vendors, send RFPs via email, and automatically evaluate vendor proposals using AI.

## Tech Stack

- **Frontend**: React (Vite), TypeScript
- **Styling**: Tailwind CSS, Shadcn UI
- **Routing**: TanStack Router
- **State Management**: TanStack Query (React Query)
- **Forms**: TanStack Form, Zod
- **AI Integration**: OpenAI (via Backend)

## Project Setup

### Prerequisites

- Node.js (v18+)
- Yarn (or npm)
- Backend server running (see backend README)

### Installation

```bash
cd frontend
yarn install
```

### Configuration

Create a `.env` file in the `frontend` directory based on `.env.example`:

```env
VITE_BACKEND_BASE_URL=http://localhost:8000/api
```

### Running Locally

```bash
yarn dev
```

The application will be available at `http://localhost:3000`.

## Project Structure

The project follows a feature-based architecture:

- `src/features/`
  - `rfp/`: Components and logic for RFP creation, details, and evaluation.
  - `vendor/`: Components and logic for vendor management.
- `src/components/`: Shared UI components (Button, Input, etc.).
- `src/services/`: API integration hooks using TanStack Query.
- `src/routes/`: Application routes defined using TanStack Router.

## Decisions & Assumptions

- **Feature-Based Architecture**: Chosen to keep related logic (components, types, hooks) co-located, making the codebase easier to scale and maintain.
- **TanStack Ecosystem**: Used TanStack Router and Query for robust routing and server-state management, reducing the need for complex global state stores.
- **AI Evaluation**: The frontend assumes the backend handles the complexity of prompt engineering and parsing AI responses, receiving structured data (summaries, pros/cons, scores) to display.
- **Single User Focus**: As per requirements, authentication is not implemented, and the app assumes a single-user workflow.
