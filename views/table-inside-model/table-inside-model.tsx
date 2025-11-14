'use client'
import { useMemo, useState } from 'react'
import { DataTable, useDataTable } from '@/components/data-table'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Product } from '@/lib/types'
import {
  MODAL_TABLE_COLUMNS,
  TABLE_INSIDE_MODEL_COLUMNS,
} from './table-inside-model-columns'

interface TableInsideModelProps {
  initialData: Product[]
}

export const TableInsideModel = ({ initialData }: TableInsideModelProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Filter related products (same category, excluding selected)
  const relatedProducts = useMemo(() => {
    if (!selectedProduct) return []
    return initialData.filter(
      (p) =>
        p.category === selectedProduct.category && p.id !== selectedProduct.id
    )
  }, [selectedProduct, initialData])

  const handleRowClick = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const { table: mainTable } = useDataTable<Product>({
    data: initialData,
    columns: TABLE_INSIDE_MODEL_COLUMNS,
    pageCount: 1,
    getRowId: (originalRow) => originalRow.id,
    shallow: false,
    clearOnDefault: false,
    enableRowSelection: false,
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 20,
      },
      columnPinning: {
        left: ['id'],
      },
    },
    meta: {
      enableRowAnimations: false,
      enableDownload: true,
      enablePaginationReset: false,
      enableResetSortings: true,
      enableViewOptions: true,
      totalItems: initialData.length,
      onRowClick: (row) => handleRowClick(row.original),
    },
  })

  const { table: modalTable } = useDataTable<Product>({
    data: relatedProducts,
    columns: MODAL_TABLE_COLUMNS,
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
    <>
      <div>
        <h2 className='text-2xl font-bold mb-4'>
          Products Table
          <span className='text-base font-normal text-muted-foreground ml-2'>
            (Click on any row to see related products)
          </span>
        </h2>
        <DataTable
          table={mainTable}
          isLoading={false}
          className={{
            container: 'relative h-[calc(100vh-18rem)] overflow-y-auto',
            tr: 'cursor-pointer hover:bg-muted/50 transition-colors',
          }}
        />
      </div>

      {/* Modal with Table Inside */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className='max-h-[90vh] overflow-hidden flex flex-col'>
          <DialogHeader>
            <DialogTitle className='text-2xl'>
              {selectedProduct?.name}
            </DialogTitle>
            <DialogDescription>
              Related products in the same category
            </DialogDescription>
          </DialogHeader>

          {selectedProduct && (
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y'>
              <div>
                <p className='text-sm text-muted-foreground'>Category</p>
                <Badge variant='outline' className='mt-1'>
                  {selectedProduct.category}
                </Badge>
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Brand</p>
                <p className='font-medium mt-1'>{selectedProduct.brand}</p>
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Price</p>
                <p className='font-medium mt-1'>
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(selectedProduct.price)}
                </p>
              </div>
              <div>
                <p className='text-sm text-muted-foreground'>Stock</p>
                <p className='font-medium mt-1'>{selectedProduct.stock}</p>
              </div>
            </div>
          )}

          <div className='flex-1 overflow-hidden'>
            <h3 className='text-lg font-semibold mb-3'>
              Related Products ({relatedProducts.length})
            </h3>
            {relatedProducts.length === 0 ? (
              <div className='border rounded-lg p-12 text-center text-muted-foreground'>
                No related products found in the same category
              </div>
            ) : (
              <div className='h-[400px] overflow-hidden'>
                <DataTable
                  table={modalTable}
                  isLoading={false}
                  className={{
                    container: 'relative h-full overflow-y-auto',
                    wrapper: 'border-0',
                  }}
                />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
