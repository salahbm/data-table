import { getProducts } from '@/lib/products'
import { TableInsideModel } from '@/views/table-inside-model'

export default async function TableInsideModelPage() {
  // Fetch all products without pagination for this example
  const initialData = getProducts({
    page: 1,
    pageSize: 100,
    sort: [],
  })

  return <TableInsideModel initialData={initialData.data} />
}
