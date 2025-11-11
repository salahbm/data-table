'use client'

import { flexRender } from '@tanstack/react-table'
import { Sheet } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

import Pagination from './pagination'
import { getCommonPinningStyles } from './pinned-columns'
import { DataTableProps } from './table.types'
import { DataTableResetSortings } from './table-reset-sorting'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table-ui'
import { DataTableViewOptions } from './table-view-options'

export function DataTable<TData>({
  table,
  isLoading: _,
  className,
  tbodyClassName,
  tableClassName,
  theadClassName,
  trHeaderClassName,
  tdClassName,
  trClassName,
  paginationClassName,
  children,
}: DataTableProps<TData>) {
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
          {table.options.meta?.includeDownload && (
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
          {table.options.meta?.includeResetSortings !== false && (
            <DataTableResetSortings
              table={table}
              includePagination={table.options.meta?.includePaginationReset}
            />
          )}
        </div>
      </div>
      <div className={cn('overflow-hidden rounded-md border', className)}>
        <Table className={tableClassName}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className={trHeaderClassName}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn(
                        theadClassName,
                        header.column.getCanSort() && 'cursor-pointer'
                      )}
                      style={{
                        ...getCommonPinningStyles({ column: header.column }),
                      }}
                    >
                      {!header.isPlaceholder &&
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className={tbodyClassName}>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={trClassName}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={tdClassName}
                      style={{
                        ...getCommonPinningStyles({ column: cell.column }),
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className={trClassName}>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className='h-48 text-center'
                >
                  No Data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Pagination table={table} className={paginationClassName} />
    </div>
  )
}
