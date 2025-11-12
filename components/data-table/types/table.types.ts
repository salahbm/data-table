import {
  type TableOptions,
  type TableState,
  type Table as TanstackTable,
} from '@tanstack/react-table'
import * as React from 'react'
import { FieldValues, UseFormReturn } from 'react-hook-form'

export interface DataTableProps<TData> {
  table: TanstackTable<TData>
  isLoading?: boolean

  // classNames
  className?: {
    wrapper?: string
    container?: string
    table?: string
    // header classNames
    thead?: string
    trHeader?: string
    th?: string
    // body classNames
    tbody?: string
    tr?: string
    td?: string
    pagination?: string
  }

  // form control
  form?: UseFormReturn<FieldValues>
}

// ****************************************************************

export interface ISort {
  desc: boolean
  id: string
}

export interface UseDataTableProps<TData>
  extends Omit<
      TableOptions<TData>,
      | 'state'
      | 'pageCount'
      | 'getCoreRowModel'
      | 'manualFiltering'
      | 'manualPagination'
      | 'manualSorting'
      | 'data'
    >,
    Partial<Pick<TableOptions<TData>, 'pageCount'>> {
  data?: TData[]
  initialState?: Omit<Partial<TableState>, 'sorting'> & {
    sorting?: ISort[]
  }
  debounceMs?: number

  /**
   * How the query update affects page history
   *
   * `push` will create a new history entry, allowing to use the back/forward
   * buttons to navigate state updates.
   * `replace` (default) will keep the current history point and only replace
   * the query string.
   */
  history?: 'push' | 'replace'
  /**
   * Scroll to top after a query state update
   *
   * Defaults to `false`, unlike the Next.js router page navigation methods.
   */
  scroll?: boolean
  /**
   * Shallow mode (true by default) keeps query states update client-side only,
   * meaning there won't be calls to the server.
   *
   * Setting it to `false` will trigger a network request to the server with
   * the updated querystring.
   */
  shallow?: boolean
  /**
   * Maximum amount of time (ms) to wait between updates of the URL query string.
   *
   * This is to alleviate rate-limiting of the Web History API in browsers,
   * and defaults to 50ms. Safari requires a higher value of around 120ms.
   *
   * Note: the value will be limited to a minimum of 50ms, anything lower
   * will not have any effect.
   *
   * @deprecated use `limitUrlUpdates: { 'method': 'throttle', timeMs: number }`
   * or use the shorthand:
   * ```ts
   * import { throttle } from 'nuqs'
   *
   * limitUrlUpdates: throttle(100) // time in ms
   * ```
   */
  throttleMs?: number
  /**
   * In RSC frameworks, opt-in to observing Server Component loading states when
   * doing non-shallow updates by passing a `startTransition` from the
   * `React.useTransition()` hook.
   *
   * In other frameworks, navigation events triggered by a query update can also
   * be wrapped in a transition this way (e.g. `React.startTransition`).
   */
  /**
   * Limit the rate of URL updates to prevent spamming the browser history,
   * and the server if `shallow: false`.
   *
   * This is to alleviate rate-limiting of the Web History API in browsers,
   * and defaults to 50ms. Safari requires a higher value of around 120ms.
   *
   * Note: the value will be limited to a minimum of 50ms, anything lower
   * will not have any effect.
   *
   * If both `throttleMs` and `limitUrlUpdates` are set, `limitUrlUpdates` will
   * take precedence.
   */
  limitUrlUpdates?: 'debounce' | 'throttle'

  startTransition?: React.TransitionStartFunction
  /**
   * Clear the key-value pair from the URL query string when setting the state
   * to the default value.
   *
   * Defaults to `true` to keep URLs clean.
   *
   * Set it to `false` to keep backwards-compatiblity when the default value
   * changes (prefer explicit URLs whose meaning don't change).
   */
  clearOnDefault?: boolean
}
