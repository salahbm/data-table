import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getProducts } from '@/lib/products'

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  // Get all products and find the one with matching ID
  const allProducts = getProducts({ page: 1, pageSize: 1000, sort: [] })
  const product = allProducts.data.find((p) => p.id === id)

  if (!product) {
    return (
      <div className='container mx-auto py-10'>
        <div className='flex flex-col items-center justify-center space-y-4'>
          <h1 className='text-2xl font-bold'>Product Not Found</h1>
          <Link href='/with-navigation'>
            <Button>
              <ArrowLeft className='mr-2 h-4 w-4' />
              Back to Table
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='container mx-auto py-10'>
      <div className='mb-6'>
        <Link href='/with-navigation'>
          <Button variant='outline'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back to Table
          </Button>
        </Link>
      </div>

      <div className='rounded-lg border p-8 bg-background'>
        <div className='mb-6'>
          <h1 className='text-3xl font-bold mb-2'>{product.name}</h1>
          <p className='text-muted-foreground'>{product.description}</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='space-y-4'>
            <div>
              <h3 className='text-sm font-semibold text-muted-foreground mb-1'>
                Product ID
              </h3>
              <p className='text-lg'>{product.id}</p>
            </div>

            <div>
              <h3 className='text-sm font-semibold text-muted-foreground mb-1'>
                Category
              </h3>
              <Badge variant='outline'>{product.category}</Badge>
            </div>

            <div>
              <h3 className='text-sm font-semibold text-muted-foreground mb-1'>
                Brand
              </h3>
              <p className='text-lg'>{product.brand}</p>
            </div>

            <div>
              <h3 className='text-sm font-semibold text-muted-foreground mb-1'>
                Price
              </h3>
              <p className='text-2xl font-bold'>
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(product.price)}
              </p>
            </div>

            <div>
              <h3 className='text-sm font-semibold text-muted-foreground mb-1'>
                Stock
              </h3>
              <p
                className={`text-lg ${
                  product.stock < 50 ? 'text-destructive font-medium' : ''
                }`}
              >
                {product.stock} units
              </p>
            </div>

            <div>
              <h3 className='text-sm font-semibold text-muted-foreground mb-1'>
                Rating
              </h3>
              <p className='text-lg'>{product.rating.toFixed(1)} / 5.0</p>
            </div>
          </div>

          <div className='space-y-4'>
            <div>
              <h3 className='text-sm font-semibold text-muted-foreground mb-1'>
                Availability
              </h3>
              <Badge variant={product.available ? 'default' : 'destructive'}>
                {product.available ? 'In Stock' : 'Out of Stock'}
              </Badge>
            </div>

            <div>
              <h3 className='text-sm font-semibold text-muted-foreground mb-1'>
                Color
              </h3>
              <p className='text-lg'>{product.color}</p>
            </div>

            <div>
              <h3 className='text-sm font-semibold text-muted-foreground mb-1'>
                Material
              </h3>
              <p className='text-lg'>{product.material}</p>
            </div>

            <div>
              <h3 className='text-sm font-semibold text-muted-foreground mb-1'>
                Weight
              </h3>
              <p className='text-lg'>{product.weightKg} kg</p>
            </div>

            <div>
              <h3 className='text-sm font-semibold text-muted-foreground mb-1'>
                Dimensions
              </h3>
              <p className='text-lg'>{product.dimensionsCm} cm</p>
            </div>

            <div>
              <h3 className='text-sm font-semibold text-muted-foreground mb-1'>
                Warranty
              </h3>
              <p className='text-lg'>{product.warrantyMonths} months</p>
            </div>
          </div>
        </div>

        <div className='mt-6 pt-6 border-t'>
          <div className='grid grid-cols-2 gap-4 text-sm text-muted-foreground'>
            <div>
              <span className='font-semibold'>Created:</span>{' '}
              {new Date(product.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
            <div>
              <span className='font-semibold'>Updated:</span>{' '}
              {new Date(product.updatedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
