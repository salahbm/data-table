'use client'
import { useQuery } from '@tanstack/react-query'
import { parseAsInteger, parseAsJson, useQueryStates } from 'nuqs'
import { useEffect, useEffectEvent, useState } from 'react'
import {
  DataTable,
  DEFAULT_SORT,
  normalizeDragEnd,
  SORT_VALIDATOR,
  useDataTable,
} from '@/components/data-table'
import { getProducts } from '@/lib/products'
import { Product } from '@/lib/types'
import { WITH_CHECKBOX_COLUMNS } from './with-checkbox-columns'

interface WithCheckboxTableProps {
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

export const WithCheckboxTable = ({ initialData }: WithCheckboxTableProps) => {
  const [data, setData] = useState<Product[]>(initialData.data)
  const [params] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    size: parseAsInteger.withDefault(50),
    sort: parseAsJson(SORT_VALIDATOR).withDefault(DEFAULT_SORT),
  })

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
  })

  const handleSyncData = useEffectEvent((data: Product[]) => setData(data))

  useEffect(() => {
    handleSyncData(response.data.data)
  }, [response.data])

  const { table } = useDataTable<Product>({
    data: data,
    columns: WITH_CHECKBOX_COLUMNS,
    pageCount: response.data.meta.totalPages,
    getRowId: (originalRow) => originalRow.id,
    shallow: false,
    clearOnDefault: true,
    enableRowSelection: true,
    initialState: {
      columnPinning: {
        left: ['drag-handle', 'select', 'id'],
        right: ['createdAt'],
      },
    },
    meta: {
      enableRowAnimations: true,
      enableDownload: true,
      enablePaginationReset: true,
      enableResetSortings: true,
      enableViewOptions: true,
      totalItems: response.data.meta.totalItems,
      onDragEnd: (event) => setData(normalizeDragEnd(data, event)),
    },
  })

  return (
    <div className='h-fit overflow-hidden'>
      <DataTable
        table={table}
        isLoading={response.isLoading}
        className={{
          container: 'relative h-[calc(100vh-18rem)] overflow-y-auto',
        }}
      />
    </div>
  )
}
