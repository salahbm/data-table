import { getProducts } from '@/lib/products'
import { DefaultTable } from '@/views/default'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  // Get query parameters from URL
  const page = Number((await searchParams).page) || 1
  const pageSize = Number((await searchParams).pageSize) || 10
  const sortBy = (await searchParams).sortBy as string | undefined
  const sortOrder = ((await searchParams).sortOrder as 'asc' | 'desc') || 'asc'

  // Fetch data on the server
  const initialData = getProducts({
    page,
    pageSize,
    sortBy,
    sortOrder,
  })

  return <DefaultTable initialData={initialData} />
}
