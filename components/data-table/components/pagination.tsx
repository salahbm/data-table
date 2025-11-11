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
  const { pageIndex, pageSize } = table.getState().pagination
  const pageCount = table.getPageCount()

  const sizesArray = useMemo(() => {
    return Array.from(new Set([...sizeOptions, pageSize])).sort((a, b) => a - b)
  }, [sizeOptions, pageSize])

  const goTo = useCallback((page: number) => table.setPageIndex(page), [table])

  const renderButton = useCallback(
    (i: number) => (
      <Button
        key={i}
        type='button'
        onClick={() => goTo(i)}
        variant={pageIndex === i ? 'default' : 'ghost'}
        className='font-medium size-6 rounded'
        size='icon'
      >
        {i + 1}
      </Button>
    ),
    [goTo, pageIndex]
  )

  const renderPagination = useMemo(() => {
    if (pageCount <= 1) return null

    const nodes: React.ReactNode[] = []

    const pushRange = (start: number, end: number) => {
      for (let i = start; i <= end; i++) {
        nodes.push(renderButton(i))
      }
    }

    if (pageCount <= 5) {
      pushRange(0, pageCount - 1)
    } else if (pageIndex <= 2) {
      pushRange(0, 4)
      nodes.push(<span key='dots-end'>...</span>)
      nodes.push(renderButton(pageCount - 1))
    } else if (pageIndex >= pageCount - 3) {
      nodes.push(renderButton(0))
      nodes.push(<span key='dots-start'>...</span>)
      pushRange(pageCount - 5, pageCount - 1)
    } else {
      nodes.push(renderButton(0))
      nodes.push(<span key='dots-left'>...</span>)
      pushRange(pageIndex - 1, pageIndex + 1)
      nodes.push(<span key='dots-right'>...</span>)
      nodes.push(renderButton(pageCount - 1))
    }

    return nodes
  }, [pageIndex, pageCount, renderButton])

  if (pageCount <= 1) return null

  return (
    <div
      className={cn(
        'flex w-full items-center justify-between pt-5 pb-6',
        className
      )}
    >
      <Select
        value={`${pageSize}`}
        onValueChange={(val) => table.setPageSize(Number(val))}
      >
        <SelectTrigger className='w-fit'>
          <SelectValue placeholder='Rows' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {sizesArray.map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className='flex items-center gap-2'>
        <Button
          type='button'
          variant='ghost'
          size='icon'
          className='size-6 rounded'
          onClick={() => goTo(pageIndex - 1)}
          disabled={pageIndex === 0}
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
          onClick={() => goTo(pageIndex + 1)}
          disabled={pageIndex >= pageCount - 1}
          title='Next page'
        >
          <ChevronRight className='text-muted-foreground size-5' />
        </Button>
      </div>
    </div>
  )
}
