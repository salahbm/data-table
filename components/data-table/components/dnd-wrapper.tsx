'use client'

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { useEffect, useState } from 'react'

interface DndWrapperProps {
  children: React.ReactNode
  enableRowDrag: boolean
  onDragEnd?: (event: DragEndEvent) => void
}

export function DndWrapper({
  children,
  enableRowDrag,
  onDragEnd,
}: DndWrapperProps) {
  const [mounted, setMounted] = useState(false)

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
    useSensor(PointerSensor, {})
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  // If drag is not enabled, just render children
  if (!enableRowDrag) {
    return <>{children}</>
  }

  // Wait for client-side mount to avoid hydration mismatch
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={onDragEnd}
    >
      {children}
    </DndContext>
  )
}
