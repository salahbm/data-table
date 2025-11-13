'use client'

import { cn } from '@/lib/utils'
import TableBodyContent from './components/table-body-content'
import { TableHeaderContent } from './components/table-header-content'
import Pagination from './components/table-pagination'
import { Table, TableBody, TableHeader } from './components/table-primitive'
import { DataTableSkeleton } from './components/table-skeleton'
import { DndWrapper } from './motions/table-dnd-wrapper'
import { DataTableProps } from './types/table.types'
import './data-table.component.css'

import { Activity } from 'react'
import { ExcelIcon } from '../icons'
import { Button } from '../ui/button'
import { DataTableResetSortings } from './components/table-reset-sorting'
import { DataTableViewOptions } from './components/table-view-options'

export function DataTable<TData>({
  table,
  isLoading,
  className,
}: DataTableProps<TData>) {
  const meta = table.options.meta
  const enableRowAnimations = meta?.enableRowAnimations ?? false
  const enableRowDrag = meta?.enableRowDrag ?? false

  if (isLoading)
    return <DataTableSkeleton columnCount={table.getAllColumns().length} />

  return (
    <section
      className={cn(
        'data-table px-6 py-5 border border-gray-200 bg-white  rounded-md',
        className?.wrapper
      )}
    >
      {/* Table Actions */}
      <div className='flex w-full items-center justify-between gap-2 mb-4'>
        <p className='w-full text-black'>
          <span className='mr-1.5 text-gray-500'>총</span>
          <span>{table.options.meta?.totalItems}</span>
          <span className='mr-0.5 text-gray-500'>건</span>
        </p>
        <Activity mode={meta?.enableDownload ? 'visible' : 'hidden'}>
          <Button
            role='button'
            variant='outline'
            aria-label='Download CSV'
            onClick={async () => alert('Download CSV is not implemented yet')}
          >
            <ExcelIcon />
            Download
          </Button>
        </Activity>
        <Activity mode={meta?.enableViewOptions ? 'visible' : 'hidden'}>
          <DataTableViewOptions table={table} />
        </Activity>
        <Activity mode={meta?.enableResetSortings ? 'visible' : 'hidden'}>
          <DataTableResetSortings
            table={table}
            includePagination={meta?.enablePaginationReset}
          />
        </Activity>
      </div>
      {/* Table */}

      <DndWrapper
        enableRowDrag={enableRowDrag}
        onDragEnd={table.options.meta?.onDragEnd}
      >
        <div
          className={cn('no-border-scrollbar', className?.container)}
          data-slot='table-container'
        >
          <Table className={className?.table}>
            <TableHeader className={cn('sticky top-0 z-2', className?.thead)}>
              <TableHeaderContent
                table={table}
                className={className}
                enableRowDrag={enableRowDrag}
              />
            </TableHeader>
            <TableBody className={className?.tbody}>
              <TableBodyContent
                table={table}
                className={className}
                enableRowDrag={enableRowDrag}
                enableRowAnimations={enableRowAnimations}
              />
            </TableBody>
          </Table>
        </div>
      </DndWrapper>
      <Pagination table={table} className={className?.pagination} />
    </section>
  )
}
