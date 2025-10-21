# AI原子场景展示中心

## Project Overview
A showcase web application for displaying the team's AI projects ("atomic scenarios") that help solve business needs across the company. Built with React, Express.js, and in-memory storage.

## Purpose
Enable company-wide browsing of AI solutions developed by the team. Each "atomic scenario" represents a focused AI application that addresses a specific business problem.

## Current State
Full-featured application complete with all enhancements. The application includes:
- Homepage with hero section, card-based gallery, and real-time search
- Category filtering system (数据处理, 自动化, 分析预测, 文档生成, 其他)
- Individual project detail pages with view tracking
- Admin interface for submitting new scenarios
- Analytics dashboard showing most viewed projects
- JSON export functionality for scenarios and analytics
- PostgreSQL database persistence
- Light/dark mode theme toggle
- Responsive design for mobile, tablet, and desktop
- 6 seeded sample atomic scenarios

## Recent Changes (October 21, 2025 - Latest)
**UI Simplification & Comments Feature:**
- Removed avatar images system-wide - now only showing owner name as text attribution
- Made scenario cards fully clickable - removed redundant "查看详情" button for cleaner UX
- Added user comments feature:
  * Users can leave comments on scenario detail pages (comment content + commenter name)
  * New comments table with scenarioId reference, createdAt timestamps
  * Comment API endpoints: GET /api/scenarios/:id/comments, POST /api/scenarios/:id/comments
  * Comment form with validation, toast notifications, and cache invalidation
  * Comments displayed newest-first with formatted timestamps using date-fns
- Updated admin form to remove ownerAvatar field (only ownerName required now)
- Simplified owner display across all pages: icon + name (no avatars)

**Owner Attribution & Resource Links:**
- Owner information: ownerName (required, text-only attribution)
- 4 optional resource links: requirementDocUrl, githubRepoUrl, demoManualUrl, installGuideUrl
- Detail pages display clickable resource links card with icons when links are available
- All 6 seeded scenarios updated with owner information and sample resource links

**Database Migration:**
- Migrated from in-memory to PostgreSQL database
- Added scenarios and scenarioViews tables
- Implemented database seeding with sample data

**Search & Filtering:**
- Added real-time search bar filtering by title, description, businessProblem, and solution
- Search works in combination with category filters

**Admin Interface:**
- Created /admin page with comprehensive form
- Form validation using Zod schemas with react-hook-form
- Metrics array management with add/remove functionality
- Toast notifications for submission feedback

**Analytics & Tracking:**
- Added view tracking on scenario detail pages
- Created /analytics dashboard showing top viewed projects
- Aggregated view counts with scenario details
- Export analytics data as JSON

**Export Functionality:**
- Export individual scenarios as JSON from detail pages
- Export full analytics report as JSON from analytics dashboard
- Client-side Blob download implementation

## Project Architecture

### Data Model
Scenarios contain:
- Basic info: title, description, category
- Problem/solution narrative: businessProblem, solution, technicalDetails, impact
- Metadata: team, timeline, metrics[], imageUrl
- Owner attribution: ownerName (required, text-only)
- Resource links (all optional): requirementDocUrl, githubRepoUrl, demoManualUrl, installGuideUrl

Comments contain:
- scenarioId: foreign key reference to scenarios
- commentText: the comment content
- commenterName: name of the person leaving the comment
- createdAt: timestamp for sorting and display

### Frontend Structure
- `/` - Homepage with hero, search, category filters, and card grid
- `/scenario/:id` - Detail page with view tracking and export
- `/admin` - Admin form for submitting new scenarios
- `/analytics` - Analytics dashboard with view counts and export
- Components: ScenarioCard, CategoryBadge, ScenarioSkeleton, ThemeToggle
- Styling: Tailwind CSS with custom design tokens, dark mode support
- Forms: react-hook-form with Zod validation
- Data fetching: TanStack Query with cache invalidation

### Backend
- Express.js API server
- PostgreSQL database with Drizzle ORM
- Database storage (DbStorage class)
- API routes:
  - GET /api/scenarios - Fetch all scenarios
  - GET /api/scenarios/:id - Fetch single scenario
  - POST /api/scenarios - Create new scenario
  - POST /api/scenarios/:id/view - Track scenario view
  - GET /api/analytics - Get aggregated view counts
  - GET /api/scenarios/:id/comments - Fetch comments for a scenario
  - POST /api/scenarios/:id/comments - Create a new comment
- Validation using Zod schemas from drizzle-zod

### Technology Stack
- Frontend: React + Wouter + TanStack Query + Tailwind CSS + Shadcn UI + react-hook-form
- Backend: Express.js + TypeScript
- Database: PostgreSQL (Neon) with Drizzle ORM
- Build: Vite
- Validation: Zod schemas

## User Preferences
None recorded yet.

## Completed Enhancements
✅ Owner attribution - Scenario cards and detail pages display project owner (text-only, no avatars)
✅ Resource links - Detail pages show clickable links to requirement docs, GitHub repos, demos, and installation guides
✅ Improved card layout - Removed overlapping category badges, cleaner owner info display
✅ Search functionality - Real-time filtering by keywords across multiple fields
✅ Admin interface - Complete form for team members to submit new scenarios
✅ Analytics tracking - View counts for each scenario with aggregated dashboard
✅ Export functionality - JSON export for individual scenarios and analytics data
✅ Database persistence - PostgreSQL database with proper migrations
✅ Comments system - Users can leave comments on scenario detail pages with name and content
✅ Simplified UI - Made entire scenario cards clickable, removed redundant buttons

## Potential Future Enhancements
- Enable tagging system for cross-category scenario discovery
- Add user authentication for admin access control
- Implement rich text editor for scenario descriptions
- Add image upload functionality instead of URL input
- Create comparison view to compare multiple scenarios side-by-side
- Add email notifications when new scenarios are submitted
- Add comment editing/deletion capabilities
- Add comment moderation features
