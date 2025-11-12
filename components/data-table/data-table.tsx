'use client'

import { cn } from '@/lib/utils'
import TableBodyContent from './components/table-body-content'
import { TableHeaderContent } from './components/table-header-content'
import Pagination from './components/table-pagination'
import { Table, TableBody, TableHeader } from './components/table-primitive'
import { DataTableSkeleton } from './components/table-skeleton'
import { DndWrapper } from './motions/table-dnd-wrapper'
import { DataTableProps } from './types/table.types'

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
    <section className={className?.wrapper}>
      <DndWrapper
        enableRowDrag={enableRowDrag}
        onDragEnd={table.options.meta?.onDragEnd}
      >
        <div className={className?.container} data-slot='table-container'>
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
