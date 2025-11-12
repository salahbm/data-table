'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { flexRender, Row } from '@tanstack/react-table'
import { CSSProperties } from 'react'
import { cn } from '@/lib/utils'
import { TableCell } from '../components/table-primitive'
import { getCommonPinningStyles } from '../utils/table-pinned-columns'
import { DragHandleCell } from './table-drag-cell'

interface DraggableRowProps<TData> {
  row: Row<TData>
  className?: {
    td?: string
    tr?: string
  }
  enableRowDrag?: boolean
}

export function DraggableRow<TData>({
  row,
  className,
  enableRowDrag,
}: DraggableRowProps<TData>) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.id,
  })

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : 0,
    position: 'relative',
  }

  return (
    <tr
      ref={setNodeRef}
      style={style}
      suppressHydrationWarning
      data-state={row.getIsSelected() && 'selected'}
      className={cn(
        'hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors',
        className?.tr
      )}
    >
      {enableRowDrag && (
        <TableCell className={cn('w-10', className?.td)}>
          <DragHandleCell rowId={row.id} />
        </TableCell>
      )}
      {row.getVisibleCells().map((cell) => (
        <TableCell
          key={cell.id}
          className={className?.td}
          style={{
            ...getCommonPinningStyles({ column: cell.column }),
          }}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </tr>
  )
}
