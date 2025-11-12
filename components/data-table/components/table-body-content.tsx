'use client'
import { type UniqueIdentifier } from '@dnd-kit/core'
import { flexRender } from '@tanstack/react-table'
import { AnimatePresence, motion } from 'framer-motion'
import { Fragment } from 'react'

import { cn } from '@/lib/utils'
import AnimatedRows from '../motions/animated-row'
import DraggableRows from '../motions/draggable-rows'
import { DataTableProps } from '../types/table.types'
import { getCommonPinningStyles } from '../utils/pinned-columns'
import { TableCell, TableRow } from './table-primitive'

function TableBodyContent<TData>({
  table,
  enableRowDrag,
  enableRowAnimations,
  dataIds,
  tdClassName,
  trClassName,
}: {
  table: DataTableProps<TData>['table']
  enableRowDrag: boolean
  enableRowAnimations: boolean
  dataIds: UniqueIdentifier[]
  tdClassName?: string
  trClassName?: string
}) {
  const rows = table.getRowModel().rows
  const hasRows = rows?.length > 0

  if (!hasRows) {
    return enableRowAnimations ? (
      <AnimatePresence mode='popLayout'>
        <motion.tr
          key='no-data'
          className={cn(
            'hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors',
            trClassName
          )}
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
      <TableRow className={trClassName}>
        <TableCell
          colSpan={table.getAllColumns().length}
          className='h-48 text-center'
        >
          No Data
        </TableCell>
      </TableRow>
    )
  }

  if (enableRowDrag && enableRowAnimations) {
    return (
      <AnimatePresence mode='popLayout'>
        <DraggableRows
          rows={rows}
          dataIds={dataIds}
          tdClassName={tdClassName}
          trClassName={trClassName}
          enableRowDrag={enableRowDrag}
        />
      </AnimatePresence>
    )
  }

  if (enableRowDrag) {
    return (
      <DraggableRows
        rows={rows}
        dataIds={dataIds}
        tdClassName={tdClassName}
        trClassName={trClassName}
      />
    )
  }

  if (enableRowAnimations) {
    return (
      <AnimatedRows
        rows={rows}
        tdClassName={tdClassName}
        trClassName={trClassName}
      />
    )
  }

  return (
    <Fragment>
      {rows.map((row) => (
        <TableRow
          key={row.id}
          data-state={row.getIsSelected() && 'selected'}
          className={trClassName}
        >
          {row.getVisibleCells().map((cell) => (
            <TableCell
              key={cell.id}
              className={tdClassName}
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
