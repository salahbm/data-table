# Data Table Component Library 🚀

A powerful, feature-rich React data table component built with TypeScript, featuring drag-and-drop functionality, animations, pagination, sorting, and more.


##Video Showcase

<video width="600" autoplay loop muted>
  <source src="./app/showcase.MP4" type="video/mp4" />
  Your browser does not support the video tag.
</video>


## ✨ Features Overview

This data-table component is a comprehensive, production-ready solution that combines the power of TanStack Table with modern React patterns, providing extensive customization options while maintaining excellent performance and user experience.

## 🎯 Core Features

### **Advanced Sorting & Filtering**
- **Multi-column sorting** with visual indicators (ascending/descending)
- **Sortable columns** with customizable sort behavior per column
- **Sort reset functionality** to clear all sorting states
- **Server-side and client-side sorting** support
- **URL state persistence** for sorting

### **Pagination System**
- **Configurable page sizes** (10, 20, 50, 100 items per page)
- **Server-side pagination** with total count tracking
- **Pagination reset** functionality
- **Navigation controls** (first, previous, next, last pages)
- **Page information display** (current page, total pages, total items)

### **Column Management**
- **Column hiding/showing** with view options dropdown
- **Column pinning** (left/right pinning for important columns)
- **Column resizing** capabilities
- **Column reordering** via drag-and-drop
- **Responsive column visibility** controls

### **Row Selection**
- **Single row selection** (radio buttons)
- **Multi-row selection** (checkboxes)
- **Select all/deselect all** functionality
- **Selection state management** with visual indicators

### **Drag & Drop Functionality**
- **Row reordering** via drag-and-drop
- **Custom drag end handlers** for data manipulation
- **Visual feedback** during drag operations
- **Normalized drag end events** for consistent data handling

### **Interactive Features**
- **Row click handlers** for custom actions
- **Expandable rows** with dynamic content
- **Animated row transitions** for smooth UX
- **Loading states** with skeleton placeholders
- **Row actions dropdown menus**

### **Data Export**
- **CSV download functionality** (framework in place)
- **Data export controls** in the table header

### **Visual Customization**
- **Theme support** with CSS variables
- **Customizable classNames** for all table elements
- **Responsive design** with mobile-friendly layouts
- **Status indicators** and badges for data states
- **Modal dialogs** for detailed views

## 📋 Table Variants

The project includes 9 different table implementations showcasing various features:

1. **Default Table** - Basic table with all standard features
2. **With Modal** - Click cells to open detailed modal dialogs
3. **With Dynamic Row** - Expandable rows showing full content
4. **With Navigation** - Row clicks navigate to detail pages
5. **With Checkbox** - Multi-select functionality with checkboxes
6. **With Radio** - Single-select functionality with radio buttons
7. **With Row Actions** - Dropdown menus with row-specific actions
8. **Double Tables** - Master-detail tables with radio selection
9. **Table Inside Modal** - Nested tables within modal dialogs

## 🔧 Technical Features

### **Performance Features:**
- **Virtual scrolling** support (via container height limits)
- **Debounced search/filtering** (configurable timing)
- **Efficient re-rendering** with React optimizations
- **Memory management** for large datasets

### **Developer Experience:**
- **TypeScript support** with full type safety
- **Composable architecture** with reusable components
- **Extensible meta configuration** for custom behaviors
- **URL state synchronization** with query parameters
- **Hook-based API** (`useDataTable`) for easy integration

### **Accessibility:**
- **ARIA labels** and roles for screen readers
- **Keyboard navigation** support
- **Focus management** for interactive elements
- **Semantic HTML** structure

### **Animation & Motion:**
- **Framer Motion integration** for smooth transitions
- **Row entry/exit animations**
- **Drag feedback animations**
- **Loading state animations**

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
# orwhat s
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
