'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Product } from '@/lib/types'

export const WITH_MODAL_COLUMNS: ColumnDef<Product>[] = [
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
        <Dialog>
          <DialogTrigger asChild>
            <button
              type='button'
              className='text-left hover:underline cursor-pointer'
            >
              {product.name}
            </button>
          </DialogTrigger>
          <DialogContent className='max-w-2xl'>
            <DialogHeader>
              <DialogTitle>{product.name}</DialogTitle>
              <DialogDescription>Product Details</DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid grid-cols-4 items-center gap-4'>
                <span className='font-semibold'>ID:</span>
                <span className='col-span-3'>{product.id}</span>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <span className='font-semibold'>Description:</span>
                <span className='col-span-3'>{product.description}</span>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <span className='font-semibold'>Category:</span>
                <span className='col-span-3'>{product.category}</span>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <span className='font-semibold'>Brand:</span>
                <span className='col-span-3'>{product.brand}</span>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <span className='font-semibold'>Price:</span>
                <span className='col-span-3'>
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(product.price)}
                </span>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <span className='font-semibold'>Stock:</span>
                <span className='col-span-3'>{product.stock}</span>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <span className='font-semibold'>Rating:</span>
                <span className='col-span-3'>{product.rating.toFixed(1)}</span>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <span className='font-semibold'>Material:</span>
                <span className='col-span-3'>{product.material}</span>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <span className='font-semibold'>Weight:</span>
                <span className='col-span-3'>{product.weightKg} kg</span>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <span className='font-semibold'>Dimensions:</span>
                <span className='col-span-3'>{product.dimensionsCm} cm</span>
              </div>
              <div className='grid grid-cols-4 items-center gap-4'>
                <span className='font-semibold'>Warranty:</span>
                <span className='col-span-3'>
                  {product.warrantyMonths} months
                </span>
              </div>
            </div>
          </DialogContent>
        </Dialog>
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
