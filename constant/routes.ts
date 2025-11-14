import {
  BetweenHorizontalEnd,
  Diameter,
  Edit,
  ListCheck,
  Route as LucideRoute,
  RadiationIcon,
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
    id: 'with-modal', // onclick on cell should open modal
    label: 'With Modal',
    href: '/with-modal',
    icon: Diameter,
    meta: {
      title: 'With Modal',
      description: 'With Modal Table Component',
    },
  },
  {
    id: 'with-dynamic-row', // onclick on row should enlarge the row to show all text
    label: 'With Dynamic Row',
    href: '/with-dynamic-row',
    icon: BetweenHorizontalEnd,
    meta: {
      title: 'With Dynamic Row',
      description: 'With Dynamic Row Table Component',
    },
  },
  {
    id: 'with-navigation', // on click row should navigate to the row details
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
    ],
  },
  {
    id: 'with-checkbox',
    label: 'With Checkbox',
    href: '/with-checkbox',
    icon: ListCheck,
    meta: {
      title: 'With Checkbox',
      description: 'With Checkbox Table Component',
    },
  },
  {
    id: 'with-radio',
    label: 'With Radio',
    href: '/with-radio',
    icon: RadiationIcon,
    meta: {
      title: 'With Radio',
      description: 'With Radio Table Component',
    },
  },
  {
    id: 'with-row-action',
    label: 'With Row Action',
    href: '/with-row-action',
    icon: Edit,
    meta: {
      title: 'With Row Action',
      description: 'With Row Action Table Component',
    },
  },
]

export default routes
