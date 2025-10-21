# AI原子场景展示中心

## Project Overview
A showcase web application for displaying the team's AI projects ("atomic scenarios") that help solve business needs across the company. Built with React, Express.js, and in-memory storage.

## Purpose
Enable company-wide browsing of AI solutions developed by the team. Each "atomic scenario" represents a focused AI application that addresses a specific business problem.

## Current State
MVP complete and functional. The application includes:
- Homepage with hero section and card-based gallery
- Category filtering system (数据处理, 自动化, 分析预测, 文档生成, 其他)
- Individual project detail pages
- Light/dark mode theme toggle
- Responsive design for mobile, tablet, and desktop
- 6 sample atomic scenarios showcasing different categories

## Recent Changes (October 21, 2025)
- Defined atomic scenario data model with comprehensive fields
- Implemented homepage with hero section, category filters, and responsive card grid
- Created detail pages with structured content sections
- Added theme toggle with localStorage persistence
- Built backend API with GET /api/scenarios and GET /api/scenarios/:id endpoints
- Populated in-memory storage with 6 sample scenarios
- All features tested and verified end-to-end

## Project Architecture

### Data Model
Scenarios contain:
- Basic info: title, description, category
- Problem/solution narrative: businessProblem, solution, technicalDetails, impact
- Metadata: team, timeline, metrics[], imageUrl

### Frontend Structure
- `/` - Homepage with hero, filters, and card grid
- `/scenario/:id` - Detail page for individual atomic scenario
- Components: ScenarioCard, CategoryBadge, ScenarioSkeleton, ThemeToggle
- Styling: Tailwind CSS with custom design tokens, dark mode support

### Backend
- Express.js API server
- In-memory storage (MemStorage class)
- API routes: GET /api/scenarios, GET /api/scenarios/:id, POST /api/scenarios
- Validation using Zod schemas

### Technology Stack
- Frontend: React + Wouter + TanStack Query + Tailwind CSS + Shadcn UI
- Backend: Express.js + TypeScript
- Storage: In-memory (MemStorage)
- Build: Vite

## User Preferences
None recorded yet.

## Next Steps (Future Enhancements)
- Add search functionality to filter scenarios by keywords
- Implement admin interface for team members to submit new scenarios
- Add analytics to track which scenarios are viewed most
- Enable tagging system for cross-category scenario discovery
- Add export/share functionality for individual scenarios
