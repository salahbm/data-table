'use client'

import type { Column } from '@tanstack/react-table'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronsUpDown, ChevronUp, EyeOff, X } from 'lucide-react'
import { Fragment } from 'react'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.ComponentProps<typeof PopoverTrigger> {
  column: Column<TData, TValue>
  title: string
  className?: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
  ...props
}: DataTableColumnHeaderProps<TData, TValue>) {
  return (
    <div className='flex items-center gap-2'>
      {/* Title stays identical */}
      <motion.span
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {title}
      </motion.span>

      {/* Sorting icon becomes the Popover trigger */}
      <Popover>
        <PopoverTrigger
          className={cn(
            'hover:bg-background focus:ring-ring data-[state=open]:bg rounded p-1 focus:ring-1 focus:outline-none',
            className
          )}
          {...props}
        >
          {/* EXACT SAME SORT ICONS AS BEFORE */}
          {column.getCanSort() ? (
            column.getIsSorted() === 'desc' ? (
              <ChevronDown className='size-4 text-muted-foreground' />
            ) : column.getIsSorted() === 'asc' ? (
              <ChevronUp className='size-4 text-muted-foreground' />
            ) : (
              <ChevronsUpDown className='size-4 text-muted-foreground' />
            )
          ) : (
            <ChevronsUpDown className='size-4 text-muted-foreground' />
          )}
        </PopoverTrigger>

        {/* Popover content stays identical to previous dropdown menu */}
        <PopoverContent align='center' className='w-28 p-0.5'>
          {column.getCanSort() && (
            <Fragment>
              <Button
                type='button'
                variant='ghost'
                size='icon'
                className='flex w-full items-center gap-1.5 rounded  px-2 justify-start'
                disabled={column.getIsSorted() === 'asc'}
                onClick={() => column.toggleSorting(false)}
              >
                <ChevronUp className='size-4' />
                Asc
              </Button>

              <Button
                type='button'
                variant='ghost'
                size='icon'
                className='flex w-full items-center gap-1.5 rounded  px-2 justify-start '
                disabled={column.getIsSorted() === 'desc'}
                onClick={() => column.toggleSorting(true)}
              >
                <ChevronDown className='size-4' />
                Desc
              </Button>

              {column.getIsSorted() && (
                <Button
                  type='button'
                  variant='ghost'
                  size='icon'
                  className='flex w-full items-center gap-1.5 rounded  px-2 justify-start '
                  onClick={() => column.clearSorting()}
                >
                  <X className='size-4' />
                  Reset
                </Button>
              )}
            </Fragment>
          )}

          {column.getCanHide() && (
            <Button
              type='button'
              variant='ghost'
              size='icon'
              className='flex w-full items-center gap-1.5 rounded  px-2 justify-start '
              disabled={!column.getIsVisible()}
              onClick={() => column.toggleVisibility(false)}
            >
              <EyeOff className='size-4' />
              Hide
            </Button>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}
