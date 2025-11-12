'use client'

import type { Table } from '@tanstack/react-table'
import { Dot, RotateCcw } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'

interface DataTableResetSortingsProps<TData> {
  table: Table<TData>
  includePagination?: boolean
}

export function DataTableResetSortings<TData>({
  table,
  includePagination = false,
}: DataTableResetSortingsProps<TData>) {
  const columns = React.useMemo(
    () =>
      table
        .getAllColumns()
        .filter(
          (column) =>
            typeof column.accessorFn !== 'undefined' && column.getCanHide()
        ),
    [table]
  )

  const isColumnSorted = columns.some((column) => column.getIsSorted())

  const resetSortings = () => {
    // Reset sorting state
    if (table.getState().sorting.length > 0) {
      // Use the onSortingChange handler to ensure proper state update
      if (table.options.onSortingChange) {
        table.options.onSortingChange([])
      } else {
        table.resetSorting()
      }
    }

    // Reset pagination if needed
    if (includePagination) {
      // Use the onPaginationChange handler to ensure proper state update
      if (table.options.onPaginationChange) {
        table.options.onPaginationChange({
          pageIndex: 0,
          pageSize: 50,
        })
      } else {
        table.setPageIndex(0)
        table.setPageSize(50)
      }
    }
  }

  return (
    <Button
      aria-label='Reset Sortings'
      role='button'
      variant='ghost'
      size='sm'
      className='group relative'
      onClick={resetSortings}
    >
      <RotateCcw className='group-focus-within:animate-spin-once' />
      {isColumnSorted && (
        <Dot className='absolute top-0 -right-1 size-6 -translate-y-1 animate-pulse text-accent' />
      )}
      Reset
    </Button>
  )
}
