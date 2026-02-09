# Klyseria - WordPress Headless Blog Frontend

## Project Overview
Production-ready Next.js application with WordPress REST API integration for DigitalOcean deployment.

## Tech Stack
- Framework: Next.js 14+ (App Router)
- Language: TypeScript
- Data Source: WordPress REST API (Headless)
- Styling: Tailwind CSS
- Deployment: DigitalOcean App Platform
- CI/CD: GitHub Actions (auto-deploy on push to main)

## Project Structure
- `/app` - Next.js App Router pages and layouts
- `/components` - Reusable React components
- `/lib` - WordPress API integration, utilities
- `/hooks` - Custom React hooks
- `/types` - TypeScript type definitions
- `/public` - Static assets

## Features
- 4 pages with dynamic routing
- Dark/Light mode with localStorage persistence
- Grid/List view switcher with localStorage persistence
- SEO optimization (metadata, sitemap, robots.txt)
- Responsive design (mobile, tablet, desktop)
- Server-side rendering and static generation

## Development Guidelines
- Use TypeScript for type safety
- Prefer server components over client components
- Use environment variables for API configuration
- Follow clean code architecture
- Implement proper error handling

## Status: In Progress
