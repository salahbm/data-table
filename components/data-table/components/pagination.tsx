'use client'

import { Table } from '@tanstack/react-table'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

export default function Pagination<TData>({
  table,
  className,
  sizeOptions = [10, 50, 100, 150, 200],
}: {
  table: Table<TData>
  className?: string
  sizeOptions?: number[]
}) {
  const sizesArray = useMemo(() => {
    const set = new Set([...sizeOptions, table.getState().pagination.pageSize])
    return Array.from(set).sort((a, b) => a - b)
  }, [table, sizeOptions])

  const currentPage = table.getState().pagination.pageIndex
  const pageCount = table.getPageCount()

  const handlePageChange = useCallback(
    (newPage: number) => {
      // Ensure we're using the same indexing convention throughout the app
      // The table uses 0-based indexing internally
      table.setPageIndex(newPage) // stays 0-based
    },
    [table]
  )

  const renderButton = useCallback(
    (i: number) => (
      <Button
        key={i}
        type='button'
        onClick={() => handlePageChange(i)}
        variant={currentPage === i ? 'default' : 'ghost'}
        className='font-medium size-6 rounded'
        size='icon'
      >
        {i + 1} {/* display as 1-based in UI only */}
      </Button>
    ),
    [handlePageChange, currentPage]
  )

  const renderPagination = useMemo(() => {
    const pages: React.ReactNode[] = []

    // Case 1: total pages <= 5 → show all pages directly
    if (pageCount <= 5) {
      for (let i = 0; i < pageCount; i++) pages.push(renderButton(i))
    }

    // Case 2: user is at the very beginning (page 0,1,2)
    // → show first 5 pages, then dots, then last page
    else if (currentPage <= 2) {
      for (let i = 0; i < 5; i++) pages.push(renderButton(i))
      pages.push(<span key='dots'>...</span>)
      pages.push(renderButton(pageCount - 1))
    }

    // Case 3: user is in the middle (not near start/end)
    // → show first page, dots, currentPage-1 .. currentPage+1, dots, last page
    else if (currentPage < pageCount - 3) {
      pages.push(renderButton(0))
      pages.push(<span key='dots-left'>...</span>)
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(renderButton(i))
      }
      pages.push(<span key='dots-right'>...</span>)
      pages.push(renderButton(pageCount - 1))
    }

    // Case 4: user is near the end (last 3 pages)
    // → show first page, dots, last 5 pages
    else {
      pages.push(renderButton(0))
      pages.push(<span key='dots'>...</span>)
      for (let i = pageCount - 5; i < pageCount; i++) {
        pages.push(renderButton(i))
      }
    }

    return pages
  }, [currentPage, pageCount, renderButton])

  if (pageCount <= 1) return null

  return (
    <div
      className={cn(
        'flex w-full items-center justify-between pt-5 pb-6',
        className
      )}
    >
      <Select
        value={`${table.getState().pagination.pageSize}`}
        onValueChange={(val) => table.setPageSize(Number(val))}
      >
        <SelectTrigger className='w-fit'>
          <SelectValue placeholder='Select a fruit' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            {sizesArray.map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className='flex items-center justify-end gap-2'>
        <Button
          type='button'
          variant='ghost'
          size='icon'
          className='size-6 rounded'
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
          title='Previous page'
        >
          <ChevronLeft className='text-muted-foreground size-5' />
        </Button>
        {renderPagination}
        <Button
          type='button'
          variant='ghost'
          size='icon'
          className='size-6 rounded'
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= pageCount - 1}
          title='Next page'
        >
          <ChevronRight className='text-muted-foreground size-5' />
        </Button>
      </div>
    </div>
  )
}
