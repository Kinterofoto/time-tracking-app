# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Time tracking application built with Next.js 15, featuring facial recognition for employee check-in/check-out, built with TypeScript, React 19, and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 15.2.3 with App Router and Turbopack
- **Runtime**: React 19
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with tailwindcss-animate
- **UI Components**: Radix UI primitives with shadcn/ui patterns
- **Authentication**: Clerk (@clerk/nextjs)
- **Database**: Supabase (@supabase/supabase-js)
- **Facial Recognition**: face-api.js
- **Email**: Resend
- **Data Visualization**: Recharts
- **PDF Export**: jsPDF
- **Excel Export**: xlsx
- **Form Validation**: Zod

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Architecture

### Directory Structure

- **`app/`**: Next.js App Router pages and API routes
  - `(auth)/`: Authentication-protected routes
  - `(dashboard)/`: Dashboard routes
  - `(public)/`: Public-facing routes
  - `api/`: API route handlers

- **`components/`**: React components organized by feature
  - `attendance/`: Attendance tracking components
  - `employees/`: Employee management components
  - `facial-recognition/`: Face detection and recognition UI
  - `ui/`: Reusable UI components (shadcn/ui style)

- **`lib/`**: Utility libraries and configurations
  - `clerk/`: Clerk authentication helpers
  - `db/`: Database utilities and queries
  - `face-api/`: Face-api.js initialization and utilities
  - `supabase/`: Supabase client configuration
  - `utils/`: General utilities (likely includes `cn()` for className merging)

- **`hooks/`**: Custom React hooks

### Key Integrations

**Clerk Authentication**:
- Sign-in URL: `/sign-in`
- Sign-up URL: `/sign-up`
- Post-auth redirect: `/dashboard`

**Supabase**:
- Configured for remote image patterns (`*.supabase.co/storage/v1/object/public/**`)
- Stores employee data and attendance records
- Service role key available for admin operations

**Facial Recognition**:
- Uses face-api.js for face detection and recognition
- Threshold configured via `FACE_MATCH_THRESHOLD` (default: 0.6)
- Images stored in Supabase Storage

**Email Notifications**:
- Resend API for transactional emails
- Configured with `RESEND_API_KEY`

## Environment Variables

Required environment variables are defined in `.env.local`:
- Clerk keys (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`)
- Supabase keys (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`)
- Resend API key (`RESEND_API_KEY`)
- App URL (`NEXT_PUBLIC_APP_URL`)
- Face matching threshold (`FACE_MATCH_THRESHOLD`)

## TypeScript Configuration

- Path alias: `@/*` maps to project root
- Strict mode enabled
- Target: ES2017
- Module resolution: bundler (Next.js default)

## Important Notes

- The project uses Next.js 15's App Router (not Pages Router)
- Development mode uses Turbopack for faster compilation
- Facial recognition requires browser camera access
- Images must be served from Supabase Storage (configured in `next.config.ts`)
- UI components follow shadcn/ui patterns with Radix UI primitives
