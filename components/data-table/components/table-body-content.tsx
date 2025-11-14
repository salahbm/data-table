'use client'
import { type UniqueIdentifier } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { flexRender } from '@tanstack/react-table'
import { AnimatePresence, motion } from 'framer-motion'
import { Fragment, useMemo } from 'react'
import { cn } from '@/lib/utils'
import AnimatedRows from '../motions/table-animated-row'
import { DraggableRow } from '../motions/table-draggable-row'
import { DataTableProps } from '../types/table.types'
import { getCommonPinningStyles } from '../utils/table-pinned-columns'
import { TableCell, TableRow } from './table-primitive'

function TableBodyContent<TData>({
  table,
  enableRowDrag,
  enableRowAnimations,
  className,
}: {
  table: DataTableProps<TData>['table']
  enableRowDrag: boolean
  enableRowAnimations: boolean
  className?: {
    td?: string
    tr?: string
  }
}) {
  const rows = table.getRowModel().rows
  const hasRows = rows?.length > 0

  const dataIds = useMemo<UniqueIdentifier[]>(
    () => rows.map((row) => row.id), // Match to your trackable value name
    [rows]
  )

  if (!hasRows) {
    return enableRowAnimations ? (
      <AnimatePresence mode='popLayout'>
        <motion.tr
          key='no-data'
          className={cn('data-table-row', className?.tr)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <TableCell
            colSpan={table.getAllColumns().length}
            className='h-48 text-center'
          >
            No Data
          </TableCell>
        </motion.tr>
      </AnimatePresence>
    ) : (
      <TableRow className={className?.tr}>
        <TableCell
          colSpan={table.getAllColumns().length}
          className='h-48 text-center'
        >
          No Data
        </TableCell>
      </TableRow>
    )
  }

  if (enableRowDrag) {
    return (
      <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
        {rows.map((row) => (
          <DraggableRow
            row={row}
            key={row.id}
            className={className}
            enableRowDrag={enableRowDrag}
          />
        ))}
      </SortableContext>
    )
  }

  if (enableRowAnimations) {
    return <AnimatedRows rows={rows} className={className} />
  }

  return (
    <Fragment>
      {rows.map((row) => (
        <TableRow
          key={row.id}
          data-state={row.getIsSelected() && 'selected'}
          className={className?.tr}
          onClick={() => table.options.meta?.onRowClick?.(row)}
        >
          {row.getVisibleCells().map((cell) => (
            <TableCell
              key={cell.id}
              className={className?.td}
              style={getCommonPinningStyles({ column: cell.column })}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </Fragment>
  )
}

export default TableBodyContent
