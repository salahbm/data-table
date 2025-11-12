'use client'
import { useQuery } from '@tanstack/react-query'
import { Sheet } from 'lucide-react'
import { parseAsInteger, parseAsJson, useQueryStates } from 'nuqs'
import { useEffect, useEffectEvent, useState } from 'react'
import {
  DataTable,
  ISort,
  normalizeDragEnd,
  useDataTable,
} from '@/components/data-table'
import { DataTableResetSortings } from '@/components/data-table/components/table-reset-sorting'
import { DataTableViewOptions } from '@/components/data-table/components/table-view-options'
import { Button } from '@/components/ui/button'
import { getProducts } from '@/lib/products'
import { Product } from '@/lib/types'
import { DEFAULT_COLUMNS } from './default-columns'

interface DefaultTableProps {
  initialData: {
    data: Product[]
    meta: {
      page: number
      pageSize: number
      totalItems: number
      totalPages: number
      hasNextPage: boolean
      hasPreviousPage: boolean
    }
  }
}

export const DefaultTable = ({ initialData }: DefaultTableProps) => {
  const [data, setData] = useState<Product[]>(initialData.data)
  const [params] = useQueryStates(
    {
      page: parseAsInteger.withDefault(1),
      size: parseAsInteger.withDefault(50),
      sort: parseAsJson<ISort>((value) => value as ISort).withDefault({
        id: 'createdAt',
        desc: false,
      }),
    },
    {
      history: 'replace',
    }
  )

  const response = useQuery({
    queryKey: [
      'products',
      { page: params.page, size: params.size, sort: params.sort },
    ],
    queryFn: () =>
      getProducts({
        page: params.page,
        pageSize: params.size,
        sort: params.sort,
      }),
    initialData: initialData,
    staleTime: 0,
  })

  const handleSyncData = useEffectEvent((data: Product[]) => setData(data))

  useEffect(() => {
    handleSyncData(response.data.data)
  }, [response.data])

  const { table } = useDataTable<Product>({
    data: data,
    columns: DEFAULT_COLUMNS,
    pageCount: response.data.meta.totalPages,
    getRowId: (originalRow) => originalRow.id,
    shallow: false,
    clearOnDefault: true,
    initialState: {
      columnPinning: {
        left: ['drag-handle', 'id'],
        right: ['createdAt'],
      },
    },
    meta: {
      enableRowDrag: true,
      enableRowAnimations: true,
      onDragEnd: (event) => setData(normalizeDragEnd(data, event)),
    },
  })

  return (
    <div>
      <div className='flex w-full items-center gap-2'>
        <Button
          size='sm'
          role='button'
          variant='ghost'
          aria-label='Download CSV'
          onClick={async () => alert('Download CSV is not implemented yet')}
        >
          <Sheet className='size-4' />
          Download
        </Button>

        <DataTableViewOptions table={table} />

        <DataTableResetSortings table={table} includePagination={true} />
      </div>
      <DataTable
        table={table}
        isLoading={!response.data}
        className={{
          wrapper: 'flex flex-col w-full',
          container:
            'relative overflow-y-auto max-h-[calc(100vh-280px)] [scrollbar-gutter:stable]',
          table: 'border-collapse w-full text-sm',
        }}
      />
    </div>
  )
}
