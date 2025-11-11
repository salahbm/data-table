import {
  BetweenHorizontalEnd,
  Diameter,
  Route as LucideRoute,
  Table,
} from 'lucide-react'

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
    id: 'with-modal',
    label: 'With Modal',
    href: '/with-modal',
    icon: Diameter,
    meta: {
      title: 'With Modal',
      description: 'With Modal Table Component',
    },
  },
  {
    id: 'with-dynamic-row',
    label: 'With Dynamic Row',
    href: '/with-dynamic-row',
    icon: BetweenHorizontalEnd,
    meta: {
      title: 'With Dynamic Row',
      description: 'With Dynamic Row Table Component',
    },
  },
  {
    id: 'with-navigation',
    label: 'With Navigation',
    href: '/with-navigation',
    icon: LucideRoute,
    meta: {
      title: 'With Navigation',
      description: 'With Navigation Table Component',
    },
    children: [
      {
        id: 'with-child-1',
        label: 'With Child 1',
        href: '/with-child-1',
        icon: LucideRoute,
        meta: {
          title: 'With Child 1',
          description: 'With Child 1 Table Component',
        },
      },
      {
        id: 'with-child-2',
        label: 'With Child 2',
        href: '/with-child-2',
        icon: LucideRoute,
        meta: {
          title: 'With Child 2',
          description: 'With Child 2 Table Component',
        },
      },
    ],
  },
]

export default routes
