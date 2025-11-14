'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Product } from '@/lib/types'

export const WITH_DYNAMIC_ROW_COLUMNS: ColumnDef<Product>[] = [
  {
    id: 'expander',
    header: () => null,
    cell: ({ row }) => {
      return row.getCanExpand() ? (
        <button
          type='button'
          onClick={row.getToggleExpandedHandler()}
          className='cursor-pointer'
        >
          {row.getIsExpanded() ? (
            <ChevronDown className='h-4 w-4' />
          ) : (
            <ChevronRight className='h-4 w-4' />
          )}
        </button>
      ) : null
    },
    size: 50,
  },
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
      const name = row.getValue('name') as string
      const isExpanded = row.getIsExpanded()
      return (
        <div className={isExpanded ? 'whitespace-normal' : 'truncate'}>
          {name}
        </div>
      )
    },
    size: 250,
    meta: {
      enableSorting: true,
    },
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => {
      const description = row.getValue('description') as string
      const isExpanded = row.getIsExpanded()
      return (
        <div className={isExpanded ? 'whitespace-normal' : 'truncate max-w-xs'}>
          {description}
        </div>
      )
    },
    size: 300,
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
