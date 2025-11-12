/** biome-ignore-all lint/suspicious/noArrayIndexKey: false positive */
'use client'

import { cn } from '@/lib/utils'

interface DataTableSkeletonProps extends React.ComponentProps<'div'> {
  columnCount: number
  rowCount?: number
  cellWidths?: string[]
  shrinkZero?: boolean
}

export function DataTableSkeleton({
  columnCount,
  rowCount = 8,
  cellWidths = ['auto'],
  shrinkZero = false,
  className,
  ...props
}: DataTableSkeletonProps) {
  const cozyCellWidths = Array.from(
    { length: columnCount },
    (_, index) => cellWidths[index % cellWidths.length] ?? 'auto'
  )

  return (
    <div
      className={cn('flex w-full flex-col gap-3 overflow-auto', className)}
      {...props}
    >
      {/* top controls */}
      <div className='flex items-center justify-end gap-2'>
        <div className='hidden h-7 w-18 animate-pulse rounded-md bg-muted lg:flex' />
        <div className='hidden h-7 w-18 animate-pulse rounded-md bg-muted lg:flex' />
      </div>

      {/* main content */}
      <div className='rounded-md border border-border'>
        {/* header */}
        <div className='flex w-full flex-col border-b border-border bg-muted/20'>
          <div className='flex w-full'>
            {Array.from({ length: columnCount }).map((_, j) => (
              <div
                key={j}
                className='p-2'
                style={{
                  width: cozyCellWidths[j],
                  minWidth: shrinkZero ? cozyCellWidths[j] : 'auto',
                }}
              >
                <div className='h-5 w-full animate-pulse rounded-md bg-muted' />
              </div>
            ))}
          </div>
        </div>

        {/* body rows */}
        <div className='flex flex-col divide-y divide-border'>
          {Array.from({ length: rowCount }).map((_, i) => (
            <div key={i} className='flex w-full'>
              {Array.from({ length: columnCount }).map((_, j) => (
                <div
                  key={j}
                  className='p-2'
                  style={{
                    width: cozyCellWidths[j],
                    minWidth: shrinkZero ? cozyCellWidths[j] : 'auto',
                  }}
                >
                  <div className='h-5 w-full animate-pulse rounded-md bg-muted' />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* pagination controls */}
      <div className='flex w-full items-center justify-between gap-4 overflow-auto p-1 sm:gap-8'>
        <div className='h-7 w-32 shrink-0 animate-pulse rounded-md bg-muted' />
        <div className='flex items-center gap-4 sm:gap-6 lg:gap-8'>
          <div className='flex items-center gap-2'>
            <div className='hidden size-7 animate-pulse rounded-md bg-muted lg:block' />
            <div className='size-7 animate-pulse rounded-md bg-muted' />
            <div className='size-7 animate-pulse rounded-md bg-muted' />
            <div className='size-7 animate-pulse rounded-md bg-muted' />
            <div className='hidden size-7 animate-pulse rounded-md bg-muted lg:block' />
          </div>
        </div>
      </div>
    </div>
  )
}
