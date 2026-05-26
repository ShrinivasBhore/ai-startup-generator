# AI Startup Generator Platform - Architecture & Setup

## 1. Complete Folder Structure

Based on standard full-stack enterprise architecture adapted for our Vite + Express environment:

```text
/
â”œâ”€â”€ server/                  # Node.js + Express Backend
â”‚   â”œâ”€â”€ ai/                  # Gemini API integration and prompt templates
â”‚   â”œâ”€â”€ controllers/         # Request handling and business logic endpoints
â”‚   â”œâ”€â”€ middleware/          # Auth, error handling, and rate limiting
â”‚   â”œâ”€â”€ routes/              # Express API route schemas and definitions
â”‚   â”œâ”€â”€ services/            # Core business logic (startup generation, logic)
â”‚   â”œâ”€â”€ prisma/              # Prisma DB schema and migrations
â”‚   â””â”€â”€ server.ts            # Fast Express backend entry point
â”œâ”€â”€ src/                     # React + Vite Frontend
â”‚   â”œâ”€â”€ app/                 # Page-level components (Dashboard, Landing, Auth)
â”‚   â”œâ”€â”€ components/
â”‚   â”‚   â”œâ”€â”€ features/        # Complex domain-specific components (AI Chat, Form)
â”‚   â”‚   â”œâ”€â”€ layout/          # Sidebar, Navbar, Dashboard layout wrappers
â”‚   â”‚   â””â”€â”€ ui/              # Reusable Shadcn UI primitives
â”‚   â”œâ”€â”€ hooks/               # Custom React hooks (useAuth, useStartupGen)
â”‚   â”œâ”€â”€ lib/                 # Utility functions, API clients, constants
â”‚   â”œâ”€â”€ services/            # Frontend API caller services communicating to backend
â”‚   â”œâ”€â”€ store/               # Global state management context/zustand slices
â”‚   â”œâ”€â”€ styles/              # Global Tailwind overrides and theming
â”‚   â””â”€â”€ main.tsx             # Frontend entry point
â”œâ”€â”€ .env.example             # Documented environment variables
â””â”€â”€ package.json             # Single monorepo package.json
```

## 2. Recommended Dependencies

**Frontend:**
*   `react-router` - For client-side routing between Landing, Auth, and Dashboard
*   `zustand` - Lightweight global state management for builder form/chat.
*   `lucide-react` - Standardized iconography.
*   `clsx` & `tailwind-merge` - Dynamic standard class merging for Shadcn UI.
*   `@radix-ui/react-*` - Headless accessibility layer for Shadcn UI primitives.
*   `motion` - Framer Motion for premium, smooth micro-interactions.

**Backend:**
*   `@google/genai` - Robust integration with the Gemini API.
*   `prisma` & `@prisma/client` - PostgreSQL ORM structure.
*   `zod` - End-to-end type schema validation across frontend and backend.
*   `cors` & `morgan` - Standard middleware capabilities.

## 3. Clean Architecture Explanation

**Separation of Concerns:** 
The application strictly isolates the UI presentation layer (`src/components`, `src/app`) from business logic (`src/services`, `src/store`). This ensures that swapping out a UI library or making major layout changes will never affect internal app state.

**End-to-end Type Safety:** 
With TypeScript and Zod schemas shared in an agnostic path (e.g. `src/lib/schemas`), both the Express backend validation and client-side form interactions have a unified contract. 

**Layered Backend Pattern:** 
1. `routes` handle the URL path mapping and initial payload checking.
2. `controllers` parse the HTTP lifecycle (req/res) into safe properties.
3. `services` run the pure business logic using Prisma models and the AI module.

## 4. Best Practices Included

*   **API Secret Management**: Important API integrations (e.g., Gemini, Postgres URL) happen purely inside the Node.js server. The frontend securely interacts with local `/api` routes via `fetch` or a client utility, protecting secrets from being exposed on the client.
*   **Progressive AI Responses**: Utilizing Gemini's streaming capabilities in the Express `ai` service layer allows the frontend's AI chat workspace to render startup business plans dynamically per-chunk, improving UX.
*   **Scalable DB Access**: Prisma will be centralized as a singleton connection inside `server/prisma/db.ts` to prevent exhaustion in serverless deployments or highly active Express containers.

## 5. Next Steps for Implementation

*By guidelines of the AI Studio environment, Next.js 15 is seamlessly mapped to a robust React + Vite + Express hybrid. Full-stack implementation begins once you give the go-ahead.*
