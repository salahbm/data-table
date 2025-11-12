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
import { flexRender } from '@tanstack/react-table'
import { Sheet } from 'lucide-react'
import { useMemo } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import Pagination from './components/pagination'
import TableBodyContent from './components/table-body-content'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from './components/table-primitive'
import { DataTableResetSortings } from './components/table-reset-sorting'
import { DataTableViewOptions } from './components/table-view-options'
import { DataTableProps } from './types/table.types'
import { getCommonPinningStyles } from './utils/pinned-columns'

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

      <DndContext
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={table.options.meta?.onDragEnd}
        sensors={sensors}
      >
        <div className={className?.container} data-slot='table-container'>
          <Table className={className?.table}>
            <TableHeader
              className={cn('sticky top-0 z-10 border-b', className?.thead)}
            >
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className={className?.trHeader}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className={cn(
                        className?.thead,
                        header.column.getCanSort() && 'cursor-pointer'
                      )}
                      style={getCommonPinningStyles({ column: header.column })}
                    >
                      {!header.isPlaceholder &&
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
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
        </div>
      </DndContext>
      <Pagination table={table} className={className?.pagination} />
    </div>
  )
}
