'use client'

import { useSortable } from '@dnd-kit/sortable'
import { cn } from '@/lib/utils'

interface DragHandleCellProps {
  rowId: string
  className?: string
}

export function DragHandleCell({ rowId, className }: DragHandleCellProps) {
  const { attributes, listeners, isDragging } = useSortable({
    id: rowId,
  })

  return (
    <button
      suppressHydrationWarning
      className={cn(
        'cursor-grab active:cursor-grabbing p-(var(--table-cell-padding)) hover:bg-(var(--table-row-hover-bg)) rounded transition-colors',
        isDragging && 'cursor-grabbing',
        className
      )}
      {...attributes}
      {...listeners}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='size-4 text-(var(--table-cell-text-color))'
      >
        <circle cx='9' cy='12' r='1' />
        <circle cx='9' cy='5' r='1' />
        <circle cx='9' cy='19' r='1' />
        <circle cx='15' cy='12' r='1' />
        <circle cx='15' cy='5' r='1' />
        <circle cx='15' cy='19' r='1' />
      </svg>
    </button>
  )
}
