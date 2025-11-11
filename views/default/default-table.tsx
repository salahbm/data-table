'use client'
import { useQuery } from '@tanstack/react-query'
import { parseAsInteger, parseAsJson, useQueryStates } from 'nuqs'
import { DataTable, ISort, useDataTable } from '@/components/data-table'
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

  const { table } = useDataTable<Product>({
    data: response.data.data,
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
      includeDownload: false,
      enableRowDrag: false,
      enableRowAnimations: false,
      includeResetSortings: false,
    },
  })

  return (
    <DataTable
      table={table}
      className={{
        container: 'relative overflow-auto max-h-[calc(100vh-280px)]',
      }}
    />
  )
}
