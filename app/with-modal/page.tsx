import { DEFAULT_SORT, ISort } from '@/components/data-table'
import { getProducts } from '@/lib/products'
import { WithModalTable } from '@/views/with-modal'

export default async function WithModalPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const page = Number((await searchParams).page) || 1
  const pageSize = Number((await searchParams).pageSize) || 50
  const sort = (await searchParams).sort || DEFAULT_SORT

  const initialData = getProducts({
    page,
    pageSize,
    sort: sort as ISort[],
  })

  return <WithModalTable initialData={initialData} />
}
