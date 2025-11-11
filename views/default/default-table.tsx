'use client'

import { DataTable } from '@/components/data-table'
import { useDataTable } from '@/components/data-table/hook/use-data-table'
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
  const { table } = useDataTable<Product>({
    data: initialData.data,
    columns: DEFAULT_COLUMNS,
    pageCount: initialData.meta.totalPages,
    getRowId: (originalRow) => originalRow.id,
    shallow: false,
    clearOnDefault: true,
    initialState: {
      columnPinning: {
        left: ['id'],
        right: ['createdAt'],
      },
    },
    meta: {
      includeDownload: true,
    },
  })

  return <DataTable table={table}></DataTable>
}
