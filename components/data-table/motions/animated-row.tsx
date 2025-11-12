'use client'
import { flexRender, type Row } from '@tanstack/react-table'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { TableCell } from '../components/table-primitive'
import { getCommonPinningStyles } from '../utils/pinned-columns'

function AnimatedRows<TData>({
  rows,
  tdClassName,
  trClassName,
}: {
  rows: Row<TData>[]
  tdClassName?: string
  trClassName?: string
}) {
  return (
    <AnimatePresence mode='popLayout'>
      {rows.map((row, idx) => (
        <motion.tr
          key={row.id}
          data-state={row.getIsSelected() && 'selected'}
          className={cn(
            'hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors',
            trClassName
          )}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{
            duration: 0.15,
            delay: idx <= 25 ? idx * 0.02 : 0,
            ease: 'easeOut',
          }}
        >
          {row.getVisibleCells().map((cell) => (
            <TableCell
              key={cell.id}
              className={tdClassName}
              style={getCommonPinningStyles({ column: cell.column })}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </motion.tr>
      ))}
    </AnimatePresence>
  )
}

export default AnimatedRows
