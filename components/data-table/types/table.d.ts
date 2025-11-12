import { RowData } from '@tanstack/react-table'
import { UseFormReturn } from 'react-hook-form'

declare module '@tanstack/table-core' {
  interface TableMeta<TData extends RowData> {
    // t?: ReturnType<typeof useTranslation>['t'] // un comment this line if you are using next i18n
    form?: UseFormReturn<TData, unknown, undefined>
    /**
     * @default false
     * @description if turned on, the rows will be draggable
     */
    enableRowDrag?: boolean
    /**
     * @default false
     * @description if turned on, the rows will be animated when the table is sorted
     */
    enableRowAnimations?: boolean
    /**
     * @param event returns array of the data after the drag and drop ends
     */
    onDragEnd?: (event: DragEndEvent) => void
  }
}

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData> {
    form?: UseFormReturn<TData, unknown, undefined>
    /**
     * @default undefined
     * @description the label of the column for hide/show columns
     */
    label?: string
    /**
     * @default false
     * @description if turned on, the column will be sortable
     */
    enableSorting?: boolean
    /**
     * @default false
     * @description if turned on, the column will be hideable
     */
    enableHiding?: boolean
  }
}
