import { Table } from 'lucide-react'

interface Route {
  id: string
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  meta: {
    title: string
    description: string
  }
  children?: Route[]
}

const routes: Route[] = [
  {
    id: 'default',
    label: 'Default',
    href: '/',
    icon: Table,
    meta: {
      title: 'Default',
      description: 'Default Table Component',
    },
  },
  {
    id: 'with-checkbox',
    label: 'With Checkbox',
    href: '/with-checkbox',
    icon: Table,
    meta: {
      title: 'With Checkbox',
      description: 'With Checkbox Table Component',
    },
  },
  {
    id: 'with-pagination',
    label: 'With Pagination',
    href: '/with-pagination',
    icon: Table,
    meta: {
      title: 'With Pagination',
      description: 'With Pagination Table Component',
    },
  },
  {
    id: 'with-child',
    label: 'With Child',
    href: '/with-child',
    icon: Table,
    meta: {
      title: 'With Child',
      description: 'With Child Table Component',
    },
    children: [
      {
        id: 'with-child-1',
        label: 'With Child 1',
        href: '/with-child-1',
        icon: Table,
        meta: {
          title: 'With Child 1',
          description: 'With Child 1 Table Component',
        },
      },
      {
        id: 'with-child-2',
        label: 'With Child 2',
        href: '/with-child-2',
        icon: Table,
        meta: {
          title: 'With Child 2',
          description: 'With Child 2 Table Component',
        },
      },
    ],
  },
]

export default routes
