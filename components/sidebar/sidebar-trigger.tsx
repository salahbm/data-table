'use client'

import { ChevronRight } from 'lucide-react'
import { Fragment, useState } from 'react'
import { cn } from '@/lib/utils'
import SidebarContent from './sidebar-content'

function Sidebar() {
  const [isMinimized, setState] = useState<boolean>(false)

  const toggle = () => setState(!isMinimized)

  return (
    <Fragment>
      {/* Overlay */}
      {!isMinimized && (
        <button
          type='button'
          className='fixed inset-0 z-10 bg-black/10 lg:hidden'
          onClick={toggle}
        />
      )}

      <aside
        className={cn(
          'bg-background fixed top-16 left-0 z-20 flex h-[calc(100vh-4rem)] flex-col border-r transition-all duration-300 md:relative md:top-0 lg:z-auto',
          isMinimized
            ? '-translate-x-full lg:w-16 lg:translate-x-0'
            : 'w-64 translate-x-0'
        )}
      >
        <button
          type='button'
          aria-label='Toggle sidebar'
          className='shadow-1 border-border-200 bg-background absolute top-4 right-0 hidden w-5 translate-x-full cursor-pointer items-center justify-center rounded-r border border-l-0 py-4 lg:flex'
          onClick={toggle}
        >
          <ChevronRight
            className={cn('size-5', isMinimized ? 'rotate-0' : 'rotate-180')}
          />
        </button>

        {/* Navigation */}
        <SidebarContent isMinimized={isMinimized} toggle={toggle} />
      </aside>
    </Fragment>
  )
}

export { Sidebar }
