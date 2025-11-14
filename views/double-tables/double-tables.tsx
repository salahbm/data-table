'use client'
import { useMemo, useState } from 'react'
import { DataTable, useDataTable } from '@/components/data-table'
import { RadioGroup } from '@/components/ui/radio-group'
import { Product } from '@/lib/types'
import {
  DOUBLE_TABLES_FIRST_COLUMNS,
  DOUBLE_TABLES_SECOND_COLUMNS,
} from './double-tables-columns'

interface DoubleTablesProps {
  initialData: Product[]
}

export const DoubleTables = ({ initialData }: DoubleTablesProps) => {
  const [selectedProductId, setSelectedProductId] = useState<string>('')

  // Get the selected product
  const selectedProduct = useMemo(
    () => initialData.find((p) => p.id === selectedProductId),
    [selectedProductId, initialData]
  )

  // Filter related products (same category, excluding selected)
  const relatedProducts = useMemo(() => {
    if (!selectedProduct) return []
    return initialData.filter(
      (p) =>
        p.category === selectedProduct.category && p.id !== selectedProduct.id
    )
  }, [selectedProduct, initialData])

  const { table: firstTable } = useDataTable<Product>({
    data: initialData,
    columns: DOUBLE_TABLES_FIRST_COLUMNS,
    pageCount: 1,
    getRowId: (originalRow) => originalRow.id,
    shallow: false,
    clearOnDefault: false,
    enableRowSelection: false,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
      columnPinning: {
        left: ['select', 'id'],
      },
    },
    meta: {
      enableRowAnimations: false,
      enableDownload: false,
      enablePaginationReset: false,
      enableResetSortings: false,
      enableViewOptions: false,
      totalItems: initialData.length,
    },
  })

  const { table: secondTable } = useDataTable<Product>({
    data: relatedProducts,
    columns: DOUBLE_TABLES_SECOND_COLUMNS,
    pageCount: 1,
    getRowId: (originalRow) => originalRow.id,
    shallow: false,
    clearOnDefault: false,
    enableRowSelection: false,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
      columnPinning: {
        left: ['id'],
      },
    },
    meta: {
      enableRowAnimations: false,
      enableDownload: false,
      enablePaginationReset: false,
      enableResetSortings: false,
      enableViewOptions: false,
      totalItems: relatedProducts.length,
    },
  })

  return (
    <div className='space-y-6'>
      {/* First Table */}
      <div>
        <h2 className='text-2xl font-bold mb-4'>Select a Product</h2>
        <RadioGroup
          value={selectedProductId}
          onValueChange={setSelectedProductId}
        >
          <DataTable
            table={firstTable}
            className={{
              container: 'relative h-[calc(50vh-12rem)] overflow-y-auto',
            }}
          />
        </RadioGroup>
        {selectedProductId && selectedProduct && (
          <div className='mt-4 p-4 border rounded-lg bg-muted'>
            <p className='text-sm font-medium'>
              Selected:{' '}
              <span className='font-bold'>{selectedProduct.name}</span> (
              {selectedProduct.category})
            </p>
          </div>
        )}
      </div>

      {/* Second Table - Related Products */}
      <div>
        <h2 className='text-2xl font-bold mb-4'>
          Related Products
          {selectedProduct && (
            <span className='text-base font-normal text-muted-foreground ml-2'>
              (Same category: {selectedProduct.category})
            </span>
          )}
        </h2>
        {!selectedProductId ? (
          <div className='border rounded-lg p-12 text-center text-muted-foreground'>
            Select a product from the table above to see related products
          </div>
        ) : relatedProducts.length === 0 ? (
          <div className='border rounded-lg p-12 text-center text-muted-foreground'>
            No related products found in the same category
          </div>
        ) : (
          <DataTable
            table={secondTable}
            className={{
              container: 'relative h-[calc(50vh-12rem)] overflow-y-auto',
            }}
          />
        )}
      </div>
    </div>
  )
}
