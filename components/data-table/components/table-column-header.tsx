'use client'

import type { Column } from '@tanstack/react-table'
import { ChevronDown, ChevronsUpDown, ChevronUp, EyeOff, X } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { cn } from '@/lib/utils'

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.ComponentProps<typeof DropdownMenuTrigger> {
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
  if (!column.getCanSort() && !column.getCanHide()) {
    return <div className={cn(className)}>{title}</div>
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          'hover:bg-background focus:ring-ring data-[state=open]:bg [&_svg]:text-muted-foreground -ml-1.5 flex h-fit w-full cursor-pointer items-center justify-center gap-1.5 rounded px-2 focus:ring-1 focus:outline-none [&_svg]:size-4 [&_svg]:shrink-0',
          className
        )}
        {...props}
      >
        {title}
        {column.getCanSort() &&
          (column.getIsSorted() === 'desc' ? (
            <ChevronDown />
          ) : column.getIsSorted() === 'asc' ? (
            <ChevronUp />
          ) : (
            <ChevronsUpDown />
          ))}
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-28'>
        {column.getCanSort() && (
          <>
            <DropdownMenuItem
              className='text-foreground gap-1.5'
              disabled={column.getIsSorted() === 'asc'}
              onClick={() => column.toggleSorting(false)}
            >
              <ChevronUp className='size-5' />
              Asc
            </DropdownMenuItem>
            <DropdownMenuItem
              className='text-foreground gap-1.5'
              disabled={column.getIsSorted() === 'desc'}
              onClick={() => column.toggleSorting(true)}
            >
              <ChevronDown className='size-5' />
              Desc
            </DropdownMenuItem>
            {column.getIsSorted() && (
              <DropdownMenuItem
                className='text-foreground gap-1.5'
                onClick={() => column.clearSorting()}
              >
                <X className='size-5' />
                Reset
              </DropdownMenuItem>
            )}
          </>
        )}
        {column.getCanHide() && (
          <DropdownMenuItem
            className='text-foreground gap-1.5'
            disabled={!column.getIsVisible()}
            onClick={() => column.toggleVisibility(false)}
          >
            <span className='p-0.5'>
              <EyeOff className='size-4.5' />
            </span>
            Hide
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
