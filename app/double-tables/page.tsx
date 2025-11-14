import { getProducts } from '@/lib/products'
import { DoubleTables } from '@/views/double-tables'

export default async function DoubleTablesPage() {
  // Fetch all products without pagination for this example
  const initialData = getProducts({
    page: 1,
    pageSize: 100,
    sort: [],
  })

  return <DoubleTables initialData={initialData.data} />
}
