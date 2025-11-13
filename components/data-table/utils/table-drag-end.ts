'use client'
import { DragEndEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

export const normalizeDragEnd = <T>(
  prev: T[] | undefined,
  event: DragEndEvent,
  targetValue?: keyof T | string
): T[] => {
  const { active, over } = event
  if (!prev) return []
  if (active && over && active.id !== over.id) {
    const oldIndex = prev.findIndex(
      (item) => item[(targetValue ?? 'id') as keyof T] === active.id
    )
    const newIndex = prev.findIndex(
      (item) => item[(targetValue ?? 'id') as keyof T] === over.id
    )
    return arrayMove(prev, oldIndex, newIndex)
  }
  return prev
}
