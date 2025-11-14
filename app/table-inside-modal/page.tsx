import { Suspense } from 'react'
import { DataTableSkeleton } from '@/components/data-table/components/table-skeleton'
import { getProducts } from '@/lib/products'
import { TableInsideModel } from '@/views/table-inside-model'

export default async function TableInsideModelPage() {
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
      <TableInsideModel initialData={initialData.data} />
    </Suspense>
  )
}
