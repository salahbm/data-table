'use client'
import { Table } from '@tanstack/react-table'
import { ChevronDown, ChevronsUpDown, ChevronUp, EyeOff, X } from 'lucide-react'
import { Fragment } from 'react'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { getCommonPinningStyles } from '../utils/pinned-columns'
import { TableHead, TableRow } from './table-primitive'

type TableHeaderContentProps<TData> = {
  table: Table<TData>
  enableRowDrag?: boolean
  enableColumnHiding?: boolean
  className?: {
    trHeader?: string
    th?: string
  }
}

const TableHeaderContent = <TData,>({
  table,
  enableRowDrag,
  enableColumnHiding = true,
  className,
}: TableHeaderContentProps<TData>) => {
  return (
    <Fragment>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow
          key={headerGroup.id}
          className={cn('border-b ', className?.trHeader)}
        >
          {enableRowDrag && (
            <TableHead accessKey='drag-handle' className={className?.th}>
              <span className='w-5' />
            </TableHead>
          )}

          {headerGroup.headers.map((header) => {
            if (header.isPlaceholder) return null

            const column = header.column
            const canSort = column.getCanSort()
            const canHide = enableColumnHiding && column.getCanHide()
            const sorted = column.getIsSorted()

            const title =
              typeof column.columnDef.header === 'string'
                ? column.columnDef.header
                : String(column.id)

            return (
              <TableHead
                key={header.id}
                className={cn(
                  className?.th,
                  canSort && 'cursor-pointer',
                  'first:rounded-tl-2xl last:rounded-tr-2xl '
                )}
                style={getCommonPinningStyles({ column })}
              >
                {(canSort || canHide) && (
                  <Popover>
                    <PopoverTrigger className='flex w-full items-center gap-2 justify-center'>
                      {title}
                      {sorted === 'desc' ? (
                        <ChevronDown className='size-4 text-muted-foreground' />
                      ) : sorted === 'asc' ? (
                        <ChevronUp className='size-4 text-muted-foreground' />
                      ) : (
                        <ChevronsUpDown className='size-4 text-muted-foreground' />
                      )}
                    </PopoverTrigger>

                    <PopoverContent align='center' className='w-28 p-0.5'>
                      {/* Sorting controls */}
                      {canSort && (
                        <>
                          <Button
                            variant='ghost'
                            size='icon'
                            className='flex w-full items-center gap-1.5 px-2 justify-start'
                            disabled={sorted === 'asc'}
                            onClick={() => column.toggleSorting(false)}
                          >
                            <ChevronUp className='size-4' />
                            Asc
                          </Button>
                          <Button
                            variant='ghost'
                            size='icon'
                            className='flex w-full items-center gap-1.5 px-2 justify-start'
                            disabled={sorted === 'desc'}
                            onClick={() => column.toggleSorting(true)}
                          >
                            <ChevronDown className='size-4' />
                            Desc
                          </Button>
                          {sorted && (
                            <Button
                              variant='ghost'
                              size='icon'
                              className='flex w-full items-center gap-1.5 px-2 justify-start'
                              onClick={() => column.clearSorting()}
                            >
                              <X className='size-4' />
                              Reset
                            </Button>
                          )}
                        </>
                      )}

                      {/* Hide control (only if allowed and enabled globally) */}
                      {canHide && (
                        <Button
                          variant='ghost'
                          size='icon'
                          className='flex w-full items-center gap-1.5 px-2 justify-start'
                          disabled={!column.getIsVisible()}
                          onClick={() => column.toggleVisibility(false)}
                        >
                          <EyeOff className='size-4' />
                          Hide
                        </Button>
                      )}
                    </PopoverContent>
                  </Popover>
                )}
              </TableHead>
            )
          })}
        </TableRow>
      ))}
    </Fragment>
  )
}

export { TableHeaderContent }
