'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Product } from '@/lib/types'
import Link from 'next/link'

export const WITH_NAVIGATION_COLUMNS: ColumnDef<Product>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 120,
    meta: {
      enableHiding: true,
      enableSorting: true,
    },
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const product = row.original
      return (
        <Link
          href={`/with-navigation/${product.id}`}
          className='text-blue-600 hover:underline cursor-pointer'
        >
          {product.name}
        </Link>
      )
    },
    size: 250,
    meta: {
      enableSorting: true,
    },
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => (
      <Badge variant='outline'>{row.getValue('category')}</Badge>
    ),
    size: 150,
  },
  {
    accessorKey: 'brand',
    header: 'Brand',
    size: 130,
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => {
      const price = parseFloat(row.getValue('price'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(price)
      return <div className='font-medium'>{formatted}</div>
    },
    size: 120,
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
    cell: ({ row }) => {
      const stock = row.getValue('stock') as number
      return (
        <div className={stock < 50 ? 'text-destructive font-medium' : ''}>
          {stock}
        </div>
      )
    },
    size: 100,
  },
  {
    accessorKey: 'rating',
    header: 'Rating',
    cell: ({ row }) => {
      const rating = row.getValue('rating') as number
      return <span>{rating.toFixed(1)}</span>
    },
    size: 100,
  },
  {
    accessorKey: 'available',
    header: 'Available',
    cell: ({ row }) => {
      const available = row.getValue('available') as boolean
      return (
        <Badge variant={available ? 'default' : 'destructive'}>
          {available ? 'Yes' : 'No'}
        </Badge>
      )
    },
    size: 100,
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'))
      return (
        <div className='text-sm'>
          {date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </div>
      )
    },
    size: 130,
  },
]
