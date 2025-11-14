# Data Table Component Library 🚀

A powerful, feature-rich React data table component built with TypeScript, featuring drag-and-drop functionality, animations, pagination, sorting, and more.

## ✨ Features

- **🔄 Drag & Drop Rows**: Reorder rows with smooth drag-and-drop using DnD Kit
- **🎭 Row Animations**: Beautiful animations powered by Framer Motion
- **📄 Pagination**: Built-in pagination with customizable controls
- **🔀 Sorting**: Multi-column sorting with URL state persistence
- **📌 Column Pinning**: Pin columns to left or right for better UX
- **✅ Row Selection**: Select single or multiple rows
- **👁️ View Options**: Show/hide columns dynamically
- **🔄 Reset Controls**: Reset sorting and pagination states
- **📊 Loading States**: Skeleton loading with proper UX
- **📱 Responsive**: Mobile-friendly design
- **♿ Accessible**: WCAG compliant with proper ARIA labels
- **🎨 Customizable**: Extensive styling options via CSS variables
- **🔗 URL State**: Query parameters for sharing and bookmarking
- **📋 CSV Export**: Download data as CSV (placeholder implementation)

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Table Logic**: [TanStack React Table v8](https://tanstack.com/table)
- **Drag & Drop**: [@dnd-kit](https://dndkit.com/)
- **Animations**: [Framer Motion](https://www.framer-motion.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [NuQS](https://nuqs.47ng.com/) for URL state
- **Icons**: [Lucide React](https://lucide.dev/)
- **Forms**: [React Hook Form](https://react-hook-form.com/)
- **Validation**: [Zod](https://zod.dev/)
- **TypeScript**: Full type safety

## 🚀 Quick Start

### Installation

```bash
npm install
# or
yarn install
# or
bun install
```

### Development Server

```bash
npm run dev
# or
yarn dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see the demo.

### Build for Production

```bash
npm run build
npm run start
```

## 📖 Usage

### Basic Usage

```tsx
import { DataTable, useDataTable } from '@/components/data-table'
import { columns } from './columns'

function MyTable({ data }: { data: MyData[] }) {
  const { table } = useDataTable({
    data,
    columns,
    enableRowSelection: true,
    meta: {
      enableRowAnimations: true,
      enableRowDrag: true,
      enablePaginationReset: true,
      enableResetSortings: true,
      enableViewOptions: true,
      totalItems: data.length,
    },
  })

  return <DataTable table={table} />
}
```

### Advanced Configuration

```tsx
const { table } = useDataTable({
  data,
  columns,
  pageCount: 10,
  initialState: {
    columnPinning: {
      left: ['id'],
      right: ['actions'],
    },
  },
  meta: {
    enableRowAnimations: true,
    enableRowDrag: true,
    enableDownload: true,
    onDragEnd: handleDragEnd,
  },
})
```

## 🎯 API Reference

### DataTable Props

```tsx
interface DataTableProps<TData> {
  table: TanstackTable<TData>
  isLoading?: boolean
  className?: {
    wrapper?: string
    container?: string
    table?: string
    thead?: string
    trHeader?: string
    th?: string
    tbody?: string
    tr?: string
    td?: string
    pagination?: string
  }
}
```

### useDataTable Props

```tsx
interface UseDataTableProps<TData> {
  data?: TData[]
  columns: ColumnDef<TData, any>[]
  pageCount?: number
  enableRowSelection?: boolean
  getRowId?: (originalRow: TData) => string
  initialState?: {
    columnPinning?: ColumnPinningState
    sorting?: ISort[]
  }
  meta?: {
    enableRowAnimations?: boolean
    enableRowDrag?: boolean
    enableDownload?: boolean
    enablePaginationReset?: boolean
    enableResetSortings?: boolean
    enableViewOptions?: boolean
    totalItems?: number
    onDragEnd?: (event: DragEndEvent) => void
  }
}
```

## 🎨 Customization

### CSS Variables

The component uses CSS variables for easy theming. Customize in `data-table.component.css`:

```css
:root {
  --table-width: 100%;
  --table-text-size: 0.875rem;
  --table-border-collapse: collapse;
  --header-height: 2.5rem;
  --header-bg: #ffffff;
  --header-color: #374151;
  --row-height: 3rem;
  --row-hover-bg: #f9fafb;
  --cell-padding: 0.75rem;
  /* ... more variables */
}
```

### Data Attributes

Use data attributes for custom styling:

```css
/* Dragging state */
[data-dragging="true"] {
  opacity: 0.5;
}

/* Pinned columns */
[data-pinned="left"] {
  position: sticky;
  left: 0;
  z-index: 1;
}

/* Selected rows */
[data-state="selected"] {
  background-color: #dbeafe;
}
```

## 📁 Project Structure

```
components/data-table/
├── components/           # Table sub-components
│   ├── table-body-content.tsx
│   ├── table-header-content.tsx
│   ├── table-pagination.tsx
│   ├── table-primitive.tsx
│   ├── table-reset-sorting.tsx
│   ├── table-skeleton.tsx
│   └── table-view-options.tsx
├── motions/              # Animation & DnD components
│   ├── table-animated-row.tsx
│   ├── table-dnd-wrapper.tsx
│   ├── table-drag-cell.tsx
│   └── table-draggable-row.tsx
├── types/                # TypeScript definitions
├── utils/                # Utility functions
├── data-table.component.css  # Styles
├── data-table.tsx       # Main component
└── index.ts             # Exports
```

## 🔧 Development

### Code Quality

- **Linting**: [Biome](https://biomejs.dev/) for fast linting and formatting
- **TypeScript**: Strict type checking enabled
- **CSS**: Tailwind CSS with custom properties

### Scripts

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start"
  }
}
```

## 📝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 🙏 Acknowledgments

- [TanStack Table](https://tanstack.com/table) - The foundation of our table logic
- [DnD Kit](https://dndkit.com/) - Excellent drag-and-drop primitives
- [Framer Motion](https://www.framer-motion.com/) - Smooth animations
- [Radix UI](https://www.radix-ui.com/) - Accessible UI primitives
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first styling
