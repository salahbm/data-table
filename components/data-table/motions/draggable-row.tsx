'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { flexRender, Row } from '@tanstack/react-table'
import { CSSProperties } from 'react'
import { cn } from '@/lib/utils'
import { TableCell } from '../components/table-ui'
import { getCommonPinningStyles } from '../utils/pinned-columns'

interface DraggableRowProps<TData> {
  row: Row<TData>
  tdClassName?: string
  trClassName?: string
}

export function DraggableRow<TData>({
  row,
  tdClassName,
  trClassName,
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
      data-state={row.getIsSelected() && 'selected'}
      className={cn(
        'hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors',
        trClassName
      )}
    >
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
