import { Suspense } from 'react'
import { DataTableSkeleton } from '@/components/data-table/components/table-skeleton'
import { getProducts } from '@/lib/products'
import { DoubleTables } from '@/views/double-tables'

export default async function DoubleTablesPage() {
  // Fetch all products without pagination for this example
  const initialData = getProducts({
    page: 1,
    pageSize: 100,
    sort: [],
  })

  return (
    <Suspense
      fallback={<DataTableSkeleton columnCount={initialData.data.length} />}
    >
      <DoubleTables initialData={initialData.data} />
    </Suspense>
  )
}
