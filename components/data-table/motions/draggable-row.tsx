'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { flexRender, Row } from '@tanstack/react-table'
import { CSSProperties } from 'react'
import { cn } from '@/lib/utils'
import { TableCell } from '../components/table-primitive'
import { getCommonPinningStyles } from '../utils/pinned-columns'
import { DragHandleCell } from './drag-handle-cell'

interface DraggableRowProps<TData> {
  row: Row<TData>
  tdClassName?: string
  trClassName?: string
  enableRowDrag?: boolean
}

export function DraggableRow<TData>({
  row,
  tdClassName,
  trClassName,
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
      style={style}
      ref={setNodeRef}
      suppressHydrationWarning
      data-state={row.getIsSelected() && 'selected'}
      className={cn(
        'hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors',
        trClassName
      )}
    >
      {enableRowDrag && (
        <TableCell className={cn('w-10', tdClassName)}>
          <DragHandleCell rowId={row.id} />
        </TableCell>
      )}
      {row.getVisibleCells().map((cell) => (
        <TableCell
          key={cell.id}
          className={tdClassName}
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
