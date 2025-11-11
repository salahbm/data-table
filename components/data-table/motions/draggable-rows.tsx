'use client'
import { type UniqueIdentifier } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { type Row } from '@tanstack/react-table'

import { DraggableRow } from './draggable-row'

function DraggableRows<TData>({
  rows,
  dataIds,
  tdClassName,
  trClassName,
}: {
  rows: Row<TData>[]
  dataIds: UniqueIdentifier[]
  tdClassName?: string
  trClassName?: string
}) {
  return (
    <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
      {rows.map((row) => (
        <DraggableRow
          key={row.id}
          row={row}
          tdClassName={tdClassName}
          trClassName={trClassName}
        />
      ))}
    </SortableContext>
  )
}

export default DraggableRows
