# FitForge Clone

A GitHub-ready Next.js replica inspired by the FitForge fitness tracker UI.

## Included pages
- Dashboard
- Workouts
- Diet Tracker
- GPS Activity
- Progress Tracking
- AI Coach
- Achievements
- Notifications
- Settings

## Backend approach
Since no original backend was available, this version uses a practical mock-backend approach:
- localStorage persistence for user data
- client-side state management for workouts, meals, water intake, and progress logs
- simulated GPS session tracking
- simple built-in AI coach reply logic
- automatic badge unlocking based on stored activity

This keeps the app fully demoable and easy to deploy on Vercel without setting up a database.

## Tech stack
- Next.js 14
- TypeScript
- Recharts
- lucide-react

## Run locally
```bash
npm install
npm run dev
```

## Deploy to Vercel
Framework preset should be detected automatically as Next.js.

## Notes
- The design is intentionally matched closely to the screenshots you provided.
- Data is stored per browser in localStorage.
- If you want, this can be upgraded next to use Prisma + PostgreSQL + auth.
