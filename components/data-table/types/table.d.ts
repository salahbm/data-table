import { RowData } from '@tanstack/react-table'
import { UseFormReturn } from 'react-hook-form'

declare module '@tanstack/table-core' {
  interface TableMeta<TData extends RowData> {
    // t?: ReturnType<typeof useTranslation>['t'] // un comment this line if you are using next i18n
    form?: UseFormReturn<TData, unknown, undefined>
    includePaginationReset?: boolean
    includeResetSortings?: boolean
    includeDownload?: boolean
  }
}

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData> {
    tooltip?: boolean | TData
    form?: UseFormReturn<TData, unknown, undefined>
    label?: string
    includeResetSortings?: boolean
    includeDownload?: boolean
  }
}
