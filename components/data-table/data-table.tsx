'use client'
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  type UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { flexRender, type Row } from '@tanstack/react-table'
import { AnimatePresence, motion } from 'framer-motion'
import { Sheet } from 'lucide-react'
import { useMemo } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import Pagination from './components/pagination'
import { DataTableResetSortings } from './components/table-reset-sorting'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './components/table-ui'
import { DataTableViewOptions } from './components/table-view-options'
import AnimatedRows from './motions/animated-row'
import DraggableRows from './motions/draggable-rows'
import { DataTableProps } from './types/table.types'
import { getCommonPinningStyles } from './utils/pinned-columns'

// Extracted Components
function TableHeaderContent<TData>({
  table,
  theadClassName,
  trHeaderClassName,
}: {
  table: DataTableProps<TData>['table']
  theadClassName?: string
  trHeaderClassName?: string
}) {
  return (
    <TableHeader className='sticky top-0 z-10 border-b bg-red-500'>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id} className={trHeaderClassName}>
          {headerGroup.headers.map((header) => (
            <TableHead
              key={header.id}
              className={cn(
                theadClassName,
                header.column.getCanSort() && 'cursor-pointer'
              )}
              style={getCommonPinningStyles({ column: header.column })}
            >
              {!header.isPlaceholder &&
                flexRender(header.column.columnDef.header, header.getContext())}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  )
}

function TableCellContent<TData>({
  row,
  tdClassName,
}: {
  row: Row<TData>
  tdClassName?: string
}) {
  return (
    <>
      {row.getVisibleCells().map((cell) => (
        <TableCell
          key={cell.id}
          className={tdClassName}
          style={getCommonPinningStyles({ column: cell.column })}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </>
  )
}

function EmptyTableRow<TData>({
  table,
  trClassName,
}: {
  table: DataTableProps<TData>['table']
  trClassName?: string
}) {
  return (
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

function StaticRows<TData>({
  rows,
  tdClassName,
  trClassName,
}: {
  rows: Row<TData>[]
  tdClassName?: string
  trClassName?: string
}) {
  return (
    <>
      {rows.map((row) => (
        <TableRow
          key={row.id}
          data-state={row.getIsSelected() && 'selected'}
          className={trClassName}
        >
          <TableCellContent row={row} tdClassName={tdClassName} />
        </TableRow>
      ))}
    </>
  )
}

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
      <EmptyTableRow table={table} trClassName={trClassName} />
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
    <StaticRows
      rows={rows}
      tdClassName={tdClassName}
      trClassName={trClassName}
    />
  )
}

export function DataTable<TData>({
  table,
  isLoading: _,
  className,
  children,
}: DataTableProps<TData>) {
  const meta = table.options.meta
  const enableRowAnimations = meta?.enableRowAnimations ?? false
  const enableRowDrag = meta?.enableRowDrag ?? false
  const includeDownload = meta?.includeDownload ?? false
  const includeResetSortings = meta?.includeResetSortings ?? true
  const includePaginationReset = meta?.includePaginationReset

  const rows = table.getRowModel().rows
  const dataIds = useMemo<UniqueIdentifier[]>(
    () => rows.map((row) => row.id),
    [rows]
  )

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
    useSensor(PointerSensor, {})
  )

  return (
    <div>
      <div
        className={cn(
          'mb-2 flex w-full flex-col-reverse items-center gap-2 md:flex-row',
          children ? 'md:justify-between' : 'justify-end'
        )}
      >
        {children}
        <div className='flex w-full items-center gap-2'>
          {includeDownload && (
            <Button
              aria-label='Download CSV'
              role='button'
              variant='ghost'
              size='sm'
              onClick={async () => alert('Download CSV is not implemented yet')}
            >
              <Sheet className='size-4' />
              Download
            </Button>
          )}
          <DataTableViewOptions table={table} />
          {includeResetSortings && (
            <DataTableResetSortings
              table={table}
              includePagination={includePaginationReset}
            />
          )}
        </div>
      </div>

      <div className={className?.container}>
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={table.options.meta?.onDragEnd}
          sensors={sensors}
        >
          <Table className={className?.table}>
            <TableHeaderContent
              table={table}
              theadClassName={className?.thead}
              trHeaderClassName={className?.trHeader}
            />
            <TableBody className={className?.tbody}>
              <TableBodyContent
                table={table}
                enableRowDrag={enableRowDrag}
                enableRowAnimations={enableRowAnimations}
                dataIds={dataIds}
                tdClassName={className?.td}
                trClassName={className?.tr}
              />
            </TableBody>
          </Table>
        </DndContext>
      </div>
      <Pagination table={table} className={className?.pagination} />
    </div>
  )
}
