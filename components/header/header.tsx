import type { FC } from 'react'
import { TableIcon } from '../icons'

const Header: FC = () => {
  return (
    <header className='flex items-center border-b border-border bg-background px-6 py-4'>
      <div className='flex items-center gap-3'>
        <TableIcon className='h-10 w-10' />
        <span className='text-sm font-semibold uppercase tracking-[0.3em] text-foreground'>
          Data Table
        </span>
      </div>
    </header>
  )
}

export { Header }
