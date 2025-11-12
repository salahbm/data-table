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
  className?: {
    trHeader?: string
    th?: string
  }
}

export function TableHeaderContent<TData>({
  table,
  enableRowDrag,
  className,
}: TableHeaderContentProps<TData>) {
  return (
    <Fragment>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id} className={className?.trHeader}>
          {enableRowDrag && (
            <TableHead accessKey='drag-handle' className={className?.th}>
              <span className='w-5' />
            </TableHead>
          )}

          {headerGroup.headers.map((header) => {
            if (header.isPlaceholder) return null

            const column = header.column
            const meta = column.columnDef.meta ?? {}
            const canSort = column.getCanSort() && meta.enableSorting
            const canHide = column.getCanHide() && meta.enableHiding
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
                  canSort && 'cursor-pointer select-none',
                  'first:rounded-tl-2xl last:rounded-tr-2xl'
                )}
                style={getCommonPinningStyles({ column })}
              >
                {canSort && canHide ? (
                  <Popover>
                    <PopoverTrigger
                      className='flex group w-full items-center justify-center gap-2'
                      data-sort={String(sorted)}
                    >
                      {title}
                      <ChevronDown className='size-4 text-muted-foreground group-data-[sort=desc]:block hidden' />
                      <ChevronUp className='size-4 text-muted-foreground group-data-[sort=asc]:block hidden' />
                      <ChevronsUpDown className='size-4 text-muted-foreground group-data-[sort=false]:block hidden' />
                    </PopoverTrigger>
                    <PopoverContent align='center' className='w-32 p-1'>
                      <div className='flex flex-col'>
                        <Button
                          variant='ghost'
                          size='sm'
                          className='justify-start gap-1.5 px-2'
                          disabled={sorted === 'asc'}
                          onClick={() => column.toggleSorting(false)}
                        >
                          <ChevronUp className='size-4' /> Asc
                        </Button>
                        <Button
                          variant='ghost'
                          size='sm'
                          className='justify-start gap-1.5 px-2'
                          disabled={sorted === 'desc'}
                          onClick={() => column.toggleSorting(true)}
                        >
                          <ChevronDown className='size-4' /> Desc
                        </Button>
                        {sorted && (
                          <Button
                            variant='ghost'
                            size='sm'
                            className='justify-start gap-1.5 px-2'
                            onClick={() => column.clearSorting()}
                          >
                            <X className='size-4' /> Reset
                          </Button>
                        )}
                        <Button
                          variant='ghost'
                          size='sm'
                          className='justify-start gap-1.5 px-2'
                          disabled={!column.getIsVisible()}
                          onClick={() => column.toggleVisibility(false)}
                        >
                          <EyeOff className='size-4' /> Hide
                        </Button>
                      </div>
                    </PopoverContent>
                  </Popover>
                ) : canSort ? (
                  <button
                    type='button'
                    data-sort={String(sorted)}
                    className='flex w-full items-center justify-center gap-2 group'
                    onClick={() => {
                      if (!sorted) column.toggleSorting(true)
                      else if (sorted === 'desc') column.toggleSorting(false)
                      else column.clearSorting()
                    }}
                  >
                    {title}
                    <ChevronUp className='size-4 text-muted-foreground hidden group-data-[sort=asc]:block' />
                    <ChevronDown className='size-4 text-muted-foreground hidden group-data-[sort=desc]:block' />
                    <ChevronDown className='size-4 text-red-400/90 hidden group-data-[sort=false]:block' />
                  </button>
                ) : (
                  <span>{title}</span>
                )}
              </TableHead>
            )
          })}
        </TableRow>
      ))}
    </Fragment>
  )
}
