## Exports

- `ComponentPreview` - Named export, function component
  - Signature: `export function ComponentPreview(): JSX.Element`
- `ProjectCard` - Named export, React.FC component
  - Signature: `export const ProjectCard: React.FC<ProjectCardProps> = ({ image, title, description, metrics, projectManager, 'data-id': dataId }: ProjectCardProps) => JSX.Element`
- `ProjectCardProps` - Named export, TypeScript interface
  - Signature:
    ```ts
    export interface ProjectCardProps {
      image: string
      title: string
      description: string
      metrics: Array<{
        label: string
        value: string
      }>
      projectManager: {
        name: string
        avatar: string
      }
      'data-id'?: string
    }
    ```
- Default exports: None

---

## Component Props & Types

`ProjectCardProps` - Named export, TypeScript interface
```ts
export interface ProjectCardProps {
  image: string
  title: string
  description: string
  metrics: Array<{
    label: string
    value: string
  }>
  projectManager: {
    name: string
    avatar: string
  }
  'data-id'?: string
}
```

- Required props
  - `image: string` – URL for the project preview image
  - `title: string` – Project title displayed prominently in the card
  - `description: string` – Short description text for the project
  - `metrics: Array<{ label: string; value: string }>` – Array of metric items; each item has a label and a value
  - `projectManager: { name: string; avatar: string }` – Details of the project manager, including name and avatar URL
- Optional props
  - `'data-id'?: string` – Optional data-id attribute applied to the root card element
- Prop behaviors
  - The component renders a card with a top image area, a title, a multi-line description, a row of metric “chips” (each showing the metric label), and a project manager section with an avatar and name.
  - The `metrics` array is iterated to render chips displaying the `label` of each metric (the `value` field exists in the type but is not displayed in the current rendering).
  - The root container uses a fixed set of Tailwind classes; there is no external `className` prop exposed for styling.
- Styling notes
  - The component relies on Tailwind CSS utility classes for layout, colors, spacing, borders, and typography.
  - The project image area has a fixed height (`h-64`) and uses `object-cover` to fill the area.
  - The description uses `line-clamp-3` to limit to three lines.
  - The “Project Manager” section includes a circular avatar with a ring.

---

## Import Patterns

- Named exports (from the source entry):
```typescript
import { ProjectCard } from './src'
import type { ProjectCardProps } from './src'
```

- Usage of the main component from the component library:
```typescript
import { ComponentPreview } from './ComponentPreview'
```

- Note: There are no default exports.

---

## Usage Requirements

- No special React context providers required.
- No external state management needed; the component is purely presentational.
- Event handlers: None defined on `ProjectCard` props; there are no callbacks.
- Ref usage: None exposed by the component.
- Error boundaries: None required by default.
- Wrapper components / HOCs: None required.
- Browser APIs: Standard DOM and Tailwind-driven styling; no special APIs required.

---

## Component Behavior

- Rendering flow
  - The card renders a top image region with an overlay gradient to improve text contrast.
  - The content area displays:
    - Title (large, bold, white text)
    - Description (muted gray, base size, relaxed line height)
    - A responsive row of metric chips; each chip shows the metric label
    - A project manager section with avatar and name; avatar is positioned to the top-right within the content area
- Prop changes
  - When `image`, `title`, `description`, `metrics`, or `projectManager` change, the card re-renders accordingly.
  - If `data-id` changes, the `data-id` attribute on the root element updates.
- Internal state
  - The component is stateless; rendering is derived directly from props.
- Side effects
  - None (no subscriptions, timers, or DOM side effects beyond rendering).
- Rendering details
  - Metrics are rendered as a wrapping set of chips with padding and borders.
  - Project manager area is positioned to the top-right within the content.
- Instance isolation
  - Each `ProjectCard` instance has independent rendering based on its own props.
- Cleanup
  - No special cleanup required beyond React’s normal unmounting.

---

## Layout & Visual Behavior

- Card container
  - Width: full with a maximum width of 2xl (`w-full max-w-2xl`)
  - Background: gradient from gray-900 to gray-800
  - Border radius: `rounded-2xl`
  - Shadow: `shadow-2xl`
- Image area
  - Height: `h-64` (16rem)
  - Image behavior: `object-cover` to fill width and height
  - Overlay: `bg-gradient-to-t from-gray-900/80 to-transparent`
- Content area
  - Padding: `p-6`
  - Title: `text-3xl font-bold text-white`
  - Description: `text-gray-300 text-base leading-relaxed line-clamp-3`
  - Metrics: flex container with wrapping; each chip is a rounded block with border
  - Project Manager section: horizontal layout with avatar (`w-20 h-20 rounded-full ring-2 ring-blue-500` on the avatar in code) and name text
- Breakpoints and responsiveness
  - Metrics chips wrap as needed on smaller widths; the image remains atop the content across sizes.
- How to override spacing/sizing
  - The component’s styling is defined via static Tailwind classes inside the component; external styling would require forking or wrapping the component.

---

## Styling & Theming

- Base styling
  - Tailwind CSS utility classes drive all styling (colors, spacing, typography, borders, shadows, etc.).
- Dynamic classes
  - There are no conditional classes in the current implementation.
- CSS variables
  - Not defined within the component.
- Theme integration
  - Colors and sizing rely on Tailwind’s default gray palette and typography utilities.
- className prop behavior
  - The component does not accept or merge a `className` prop; for styling variations, wrap or compose the component externally.
- Tailwind configuration
  - The project uses Tailwind via index.css imports. Any customization is external to the component (not shown here).

---

## Code Examples

### Example 1: Basic Usage
```typescript
import { ProjectCard } from './src'

function App() {
  return (
    <ProjectCard
      image="https://uploadthingy.s3.us-west-1.amazonaws.com/tGbS47AY2SAzR3H2dyrPwS/%E6%88%AA%E5%B1%8F2025-10-21_23.10.34.png"
      title="智能数据清洗系统"
      description="业务部门每月需要花费大量人工时间清洗Excel数据，错误率高且效率低下。传统方法无法识别复杂的数据异常模式，导致下游..."
      metrics={[
        { label: '效率提升80%', value: '80%' },
        { label: '准确率98%', value: '98%' },
        { label: '覆盖3部门', value: '3' },
      ]}
      projectManager={{
        name: '张伟',
        avatar: 'https://i.pravatar.cc/150?img=12',
      }}
    />
  )
}
```

### Example 2: Common Use Case
```typescript
import { ProjectCard } from './src'

function App() {
  return (
    <div style={{ padding: 16 }}>
      <ProjectCard
        image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop"
        title="客户关系管理平台"
        description="构建统一的客户数据平台，整合多渠道客户信息，提供360度客户视图，支持精准营销和个性化服务..."
        metrics={[
          { label: '客户增长45%', value: '45%' },
          { label: '响应速度提升3倍', value: '3x' },
          { label: '满意度92%', value: '92%' },
        ]}
        projectManager={{
          name: '李明',
          avatar: 'https://i.pravatar.cc/150?img=33',
        }}
      />
    </div>
  )
}
```

### Example 3: With Data-ID
```typescript
import { ProjectCard } from './src'

function DashboardCard() {
  return (
    <ProjectCard
      image="https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1200&h=600&fit=crop"
      title="自动化报表生成器"
      description="一个端到端的自动化工具，用于从原始数据生成带格式的业务报表，并提供自动分发能力。"
      metrics={[
        { label: '生成速度提升120%', value: '120%' },
        { label: '错误率0.2%', value: '0.2%' },
      ]}
      projectManager={{
        name: '王娜',
        avatar: 'https://i.pravatar.cc/150?img=7',
      }}
      data-id="card-dashboard-01"
    />
  )
}
```

### Example 4: List of Cards
```typescript
import { ProjectCard } from './src'

type CardData = {
  id: string
  image: string
  title: string
  description: string
  metrics: Array<{ label: string; value: string }>
  projectManager: { name: string; avatar: string }
}

const projects: CardData[] = [
  {
    id: 'card-01',
    image: 'https://uploadthingy.s3.us-west-1.amazonaws.com/tGbS47AY2SAzR3H2dyrPwS/%E6%88%AA%E5%B1%8F2025-10-21_23.10.34.png',
    title: '智能数据清洗系统',
    description:
      '业务部门每月需要花费大量人工时间清洗Excel数据，错误率高且效率低下。传统方法无法识别复杂的数据异常模式，导致下游...',
    metrics: [
      { label: '效率提升80%', value: '80%' },
      { label: '准确率98%', value: '98%' },
      { label: '覆盖3部门', value: '3' }
    ],
    projectManager: {
      name: '张伟',
      avatar: 'https://i.pravatar.cc/150?img=12'
    }
  },
  {
    id: 'card-02',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    title: '客户关系管理平台',
    description:
      '构建统一的客户数据平台，整合多渠道客户信息，提供360度客户视图，支持精准营销和个性化服务...',
    metrics: [
      { label: '客户增长45%', value: '45%' },
      { label: '响应速度提升3倍', value: '3x' },
      { label: '满意度92%', value: '92%' }
    ],
    projectManager: {
      name: '李明',
      avatar: 'https://i.pravatar.cc/150?img=33'
    }
  }
]

function ProjectsGrid() {
  return (
    <div>
      {projects.map((p) => (
        <ProjectCard
          key={p.id}
          data-id={p.id}
          image={p.image}
          title={p.title}
          description={p.description}
          metrics={p.metrics}
          projectManager={p.projectManager}
        />
      ))}
    </div>
  )
}
```