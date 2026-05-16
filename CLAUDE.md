# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Architecture
This is a Next.js application structured with the `app` directory for routing and features, utilizing TypeScript, Tailwind CSS, and Next.js specific configuration.

**Key Directories and Files:**
- **`app/`**: Contains the core application routes and logic (e.g., `app/page.tsx`). This is the primary area for feature development.
- **`middleware.ts`**: Handles request routing and middleware logic for the application.
- **`next.config.js`**: Next.js specific configuration settings.
- **`tailwind.config.ts`**: Configuration for the Tailwind CSS utility classes.
- **`tsconfig.json`**: TypeScript compiler configuration.

## Commonly Used Commands

**Running the Development Server:**
To start the development server, use one of the following commands defined in `package.json`:
- `npm run dev`
- `yarn dev`
- `pnpm dev`

**Building and Linting:**
- To build the project: `npm run build`
- To run type-checking/linting: `npm run lint` (assuming a lint script exists)

**Running Tests:**
To run all tests: `npm run test`
To run a single test file (if structured that way, or use a test runner command): `npm run test -- ./path/to/test.spec.tsx` (adjust based on actual test setup)