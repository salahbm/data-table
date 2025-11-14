import { DEFAULT_SORT, ISort } from '@/components/data-table'
import { getProducts } from '@/lib/products'
import { DefaultTable } from '@/views/default'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  // Get query parameters from URL
  const page = Number((await searchParams).page) || 1
  const pageSize = Number((await searchParams).pageSize) || 50
  const sort = (await searchParams).sort || DEFAULT_SORT

  // Fetch data on the server
  const initialData = getProducts({
    page,
    pageSize,
    sort: sort as ISort[],
  })

  return <DefaultTable initialData={initialData} />
}
