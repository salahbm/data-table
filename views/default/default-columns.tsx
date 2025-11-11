'use client'

import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/components/data-table/components/table-column-header'
import { Badge } from '@/components/ui/badge'
import { Product } from '@/lib/types'

export const DEFAULT_COLUMNS: ColumnDef<Product>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='ID' />
    ),
    cell: ({ row }) => (
      <div className='font-mono text-xs'>{row.getValue('id')}</div>
    ),
    enableSorting: true,
    size: 120,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => (
      <div className='font-medium'>{row.getValue('name')}</div>
    ),
    enableSorting: true,
    size: 250,
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Category' />
    ),
    cell: ({ row }) => (
      <Badge variant='outline'>{row.getValue('category')}</Badge>
    ),
    enableSorting: true,
    size: 150,
  },
  {
    accessorKey: 'brand',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Brand' />
    ),
    cell: ({ row }) => <div>{row.getValue('brand')}</div>,
    enableSorting: true,
    size: 130,
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Price' />
    ),
    cell: ({ row }) => {
      const price = parseFloat(row.getValue('price'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(price)
      return <div className='font-medium'>{formatted}</div>
    },
    enableSorting: true,
    size: 120,
  },
  {
    accessorKey: 'stock',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Stock' />
    ),
    cell: ({ row }) => {
      const stock = row.getValue('stock') as number
      return (
        <div className={stock < 50 ? 'text-destructive font-medium' : ''}>
          {stock}
        </div>
      )
    },
    enableSorting: true,
    size: 100,
  },
  {
    accessorKey: 'rating',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Rating' />
    ),
    cell: ({ row }) => {
      const rating = row.getValue('rating') as number
      return (
        <div className='flex items-center gap-1'>
          <span>⭐</span>
          <span>{rating.toFixed(1)}</span>
        </div>
      )
    },
    enableSorting: true,
    size: 100,
  },
  {
    accessorKey: 'available',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Available' />
    ),
    cell: ({ row }) => {
      const available = row.getValue('available') as boolean
      return (
        <Badge variant={available ? 'default' : 'secondary'}>
          {available ? 'Yes' : 'No'}
        </Badge>
      )
    },
    enableSorting: true,
    size: 100,
  },
  {
    accessorKey: 'color',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Color' />
    ),
    cell: ({ row }) => <div>{row.getValue('color')}</div>,
    enableSorting: true,
    size: 100,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Created At' />
    ),
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
    enableSorting: true,
    size: 130,
  },
]
