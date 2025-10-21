# Design Guidelines: AI Atomic Scenarios Showcase

## Design Approach

**Selected Approach:** Reference-Based (Gallery/Showcase Pattern)
Drawing inspiration from Linear's clean modernism, Dribbble's portfolio layouts, and Notion's card systems to create a professional yet engaging internal showcase.

**Core Principles:**
- **Visual First**: Let projects shine through imagery and clear presentation
- **Scannable**: Enable quick browsing across multiple scenarios
- **Professional Polish**: Reflect the quality of the AI solutions showcased
- **Clarity**: Immediately communicate value and business impact

---

## Color Palette

**Dark Mode Primary:**
- Background: 220 15% 8% (deep slate)
- Surface: 220 14% 12% (elevated cards)
- Border: 220 10% 18% (subtle dividers)
- Text Primary: 0 0% 95%
- Text Secondary: 220 8% 65%

**Brand Accent:**
- Primary: 260 75% 65% (vibrant purple - tech forward)
- Hover: 260 70% 72%
- Muted: 260 40% 25% (backgrounds)

**Status/Category Colors:**
- Success: 142 70% 55% (AI/ML green)
- Info: 210 85% 62% (automation blue)
- Warning: 38 92% 58% (optimization amber)

---

## Typography

**Font Stack:**
- Primary: 'Inter', system-ui, sans-serif (clean, modern)
- Monospace: 'JetBrains Mono', monospace (for technical details)

**Scale:**
- Hero: text-5xl lg:text-6xl font-bold (showcase title)
- H1: text-4xl font-bold (page headers)
- H2: text-2xl font-semibold (section titles)
- Card Title: text-xl font-semibold
- Body: text-base (16px)
- Caption: text-sm text-muted

---

## Layout System

**Spacing Primitives:** Consistently use 4, 6, 8, 12, 16, 24 (p-4, gap-6, py-8, etc.)

**Grid Structure:**
- Container: max-w-7xl mx-auto px-6
- Card Grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
- Detail Page: max-w-4xl mx-auto for readability

---

## Component Library

### Homepage Gallery

**Hero Section (40vh):**
- Bold headline: "AI原子场景展示中心"
- Subtitle explaining the concept of atomic scenarios
- Search/filter bar with category tags
- Background: Subtle gradient mesh or abstract AI visualization (not full-bleed photo)

**Project Cards:**
- Aspect ratio: 16:9 preview image area
- Hover: Subtle lift (translate-y-1) + border glow
- Card structure:
  - Visual preview (screenshot/diagram of solution)
  - Category badge (top-left corner)
  - Project title (bold, truncate at 2 lines)
  - Business problem (2-line description)
  - Impact metrics (small pill badges: "节省X小时", "效率提升X%")
  - CTA: "查看详情" arrow link

**Filtering System:**
- Sticky category tabs below hero
- Categories: 全部, 数据处理, 自动化, 分析预测, 文档生成, etc.
- Active state: accent color underline

### Detail Pages

**Project Header:**
- Full-width banner with project screenshot
- Overlay gradient for text readability
- Breadcrumb: 首页 > 项目名称
- Project title + category badge
- Key metrics in horizontal pills

**Content Sections:**
- Business Challenge (问题背景)
- Solution Overview (解决方案)
- Technical Implementation (技术实现) - collapsible
- Impact & Results (业务价值)
- Team & Timeline (small footer section)

**Visual Elements:**
- Screenshots with subtle shadow and border
- Before/After comparisons where applicable
- Architecture diagrams with clean icons
- Testimonial quotes from business users (if available)

### Navigation

- Minimal header: Logo + "返回首页" (on detail pages)
- Footer: Team credits, contact, GitHub link (if relevant)

---

## Animations

**Minimal & Purposeful:**
- Card hover: transform + shadow transition (200ms)
- Page transitions: fade in content (300ms)
- Image loading: skeleton shimmer
- NO scroll-triggered animations, parallax, or complex effects

---

## Images

**Required Images:**
1. **Hero Background**: Abstract tech/AI visualization (geometric patterns, neural network style, or gradient mesh) - NOT a large photo, more decorative
2. **Project Cards**: Each card needs a preview screenshot/diagram of the actual solution (real project visuals)
3. **Detail Pages**: 2-3 screenshots per project showing the solution in action

**Image Treatment:**
- Cards: Consistent aspect ratio, subtle rounded corners (rounded-lg)
- Detail: Larger screenshots with caption text
- All images: Subtle border for definition against dark background

---

## Responsive Behavior

- Mobile: Single column cards, simplified filters
- Tablet: 2-column grid
- Desktop: 3-column grid with generous spacing
- Maintain touchable targets (min 44px) for all interactive elements

This design creates a professional, browsable showcase that highlights your team's AI achievements while maintaining clarity and ease of navigation across the company.