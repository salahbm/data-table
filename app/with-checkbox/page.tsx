import { DEFAULT_SORT, ISort } from '@/components/data-table'
import { getProducts } from '@/lib/products'
import { WithCheckboxTable } from '@/views/with-checkbox'

export default async function WithCheckboxPage({
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

  return <WithCheckboxTable initialData={initialData} />
}
