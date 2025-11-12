import { Column } from '@tanstack/react-table'
import * as React from 'react'

// This function generates CSS styles for pinned columns in a data table
export function getCommonPinningStyles<TData>({
  column, // The column to generate styles for
  withBorder = false, // Whether to add border shadows (default: false)
}: {
  column: Column<TData> // The column must be a TanStack Table Column
  withBorder?: boolean // Optional border parameter
}): React.CSSProperties {
  // Returns a React CSS style object
  // Check if the column is pinned
  const isPinned = column.getIsPinned() // Can be 'left', 'right', or false

  // Check if this is the last column pinned to the left
  const isLastLeftPinnedColumn =
    isPinned === 'left' && column.getIsLastColumn('left')

  // Check if this is the first column pinned to the right
  const isFirstRightPinnedColumn =
    isPinned === 'right' && column.getIsFirstColumn('right')

  // Return a style object with all the necessary CSS properties
  return {
    // Add a shadow to visually separate pinned columns from the rest
    boxShadow: withBorder
      ? isLastLeftPinnedColumn
        ? '-4px 0 4px -4px var(--border) inset' // Shadow for last left-pinned column
        : isFirstRightPinnedColumn
          ? '4px 0 4px -4px var(--border) inset' // Shadow for first right-pinned column
          : undefined // No shadow for other columns
      : undefined, // No shadow if withBorder is false

    // Position the column correctly when pinned to the left
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,

    // Position the column correctly when pinned to the right
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,

    // Make pinned columns slightly transparent
    opacity: isPinned ? 0.99 : 1,

    // Use 'sticky' positioning for pinned columns so they stay in place when scrolling
    position: isPinned ? 'sticky' : 'relative',

    // Set the width of the column
    width: column.getSize(),

    // Make sure pinned columns appear above other content
    zIndex: isPinned ? 1 : 0,
  }
}
