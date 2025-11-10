'use client'

import { FC, useEffect, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import routes from '@/constant/routes'

const isPathActive = (pathname: string | null, href: string) => {
  if (!pathname) return false
  if (href === '/') return pathname === '/'

  return (
    pathname === href ||
    (pathname.startsWith(href) &&
      href !== '/' &&
      pathname.charAt(href.length) === '/')
  )
}

const SidebarContent: FC<{ isMinimized: boolean; toggle: () => void }> = ({
  isMinimized,
  toggle,
}) => {
  const [expanded, setExpanded] = useState<string[]>([])

  const navItemClasses = (isActive: boolean) =>
    cn(
      'flex items-center gap-2 rounded px-4 py-3 w-full cursor-pointer transition-colors truncate hover:bg-accent hover:text-sidebar-accent-foreground',
      isActive
        ? 'bg-sidebar-primary/10 text-sidebar-primary font-medium hover:bg-sidebar-primary/20'
        : 'text-sidebar-foreground'
    )

  return (
    <nav
      aria-label='Sidebar Navigation'
      className={cn(
        'no-scrollbar h-full flex-1 overflow-y-auto px-2 py-5 pb-24 transition-all duration-300',
        isMinimized ? 'hidden w-0 lg:block lg:w-16' : 'w-64'
      )}
    >
      <div className='space-y-1'>
        {routes.map((item) => {
          const isActive = isPathActive(window.location.pathname, item.href)

          return (
            <Link
              key={item.id}
              href={item.href ?? '#'}
              className={cn(
                navItemClasses(isActive),
                isMinimized && 'justify-center px-2'
              )}
              aria-current={isActive ? 'page' : undefined}
              onClick={toggle}
              title={item.label}
            >
              <item.icon className='size-5 text-current' />
              {!isMinimized && item.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default SidebarContent
