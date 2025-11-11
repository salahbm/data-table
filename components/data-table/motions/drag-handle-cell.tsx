'use client'

import { useSortable } from '@dnd-kit/sortable'
import { GripVertical } from 'lucide-react'
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
      className={cn(
        'cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded transition-colors',
        isDragging && 'cursor-grabbing',
        className
      )}
      {...attributes}
      {...listeners}
    >
      <GripVertical className='size-4 text-muted-foreground' />
    </button>
  )
}
