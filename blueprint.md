# Blueprint: 우리 학교 급식 자동 안내기 (School Lunch Auto Information)

## Overview
A web application for students and teachers to easily check their school's daily lunch menu and search for specific dishes throughout the month.

## Features
- **Today's Lunch**: Automatic display of the current day's menu upon access.
- **Menu Search**: Search for specific keywords (e.g., "Maratang", "Tonkatsu") to find which days they are served in the current month.
- **School Selection**: Search and save school information locally.
- **Secure API Proxy**: NEIS API keys are hidden using Vercel Serverless Functions.
- **Mobile-First Design**: Responsive and intuitive UI with modern aesthetics (glassmorphism, subtle textures).

## Tech Stack
- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Vanilla CSS (Modern & Polished with Noise Texture and Depth)
- **Icons**: Lucide React
- **BaaS**: Firebase (Available)
- **API Proxy**: Vercel Serverless Functions
- **External API**: NEIS Open API

## Project Structure
- `src/`: React source code
  - `components/`: Reusable UI components (Layout)
  - `pages/`: Page-level components (Home, Search, Settings)
  - `services/`: API client and types
  - `utils/`: Date and Storage helpers
- `api/`: Vercel Serverless Functions (for NEIS API proxy)

## Completed Tasks
- [x] Environment Setup and dependency installation.
- [x] API Proxy & Services implementation (`api/school.ts`, `api/meal.ts`).
- [x] Layout and Navigation with responsive design.
- [x] School Search & Settings Page.
- [x] Today's Lunch Dashboard with loading/error states.
- [x] Monthly Menu Search Page with keyword highlighting.
- [x] UI/UX Polish: Added noise texture, depth shadows, and polished typography.
- [x] Code Quality: Fixed linting errors and added proper TypeScript interfaces.

## Design Guidelines
- **Expressive Typography**: Bold headings (Inter 800) and readable content.
- **Vibrant Palette**: Indigo primary color with fresh blue/yellow accents.
- **Depth & Texture**: Multi-layered shadows and a subtle SVG noise texture on the background.
- **Interactive Feedback**: Hover effects on cards and buttons, glow effects on active nav items.
