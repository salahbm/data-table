// This imports the Column type from TanStack Table library
import { createParser } from 'nuqs/server'
// This imports a function to create URL query parsers
import { z } from 'zod'
import { ISort } from '../types/table.types'

// This imports Zod, a validation library

// Define a schema (structure) for sorting items using Zod
// This ensures that each sorting item has an 'id' (string) and 'desc' (boolean) property
const sortingItemSchema = z.object({
  id: z.string(), // The column ID that's being sorted
  desc: z.boolean(), // Whether the sort is descending (true) or ascending (false)
})

export const DEFAULT_SORT: ISort[] = [{ id: 'createdAt', desc: false }]
export const SORT_VALIDATOR = (val: unknown) => val as ISort[]

// This function creates a parser for sorting state from URL query parameters
export const getSortingStateParser = (columnIds?: string[] | Set<string>) => {
  // Convert the column IDs to a Set for faster lookups, or keep as null if not provided
  const validKeys = columnIds
    ? columnIds instanceof Set
      ? columnIds // If it's already a Set, use it directly
      : new Set(columnIds) // If it's an array, convert to a Set
    : null // If no columnIds provided, set to null

  // Create and return a parser that can convert between URL strings and JavaScript objects
  return createParser({
    // This function converts a string from the URL to a sorting state object
    parse: (value) => {
      try {
        // Try to parse the JSON string from the URL
        const parsed = JSON.parse(value)
        // Validate the parsed value against our schema
        const result = z.array(sortingItemSchema).safeParse(parsed)

        // If validation fails, return null
        if (!result.success) return null

        // If we have a list of valid column IDs, check that all sorted columns are valid
        if (validKeys && result.data.some((item) => !validKeys.has(item.id))) {
          return null // Return null if any column ID is not in our valid list
        }

        // If everything is valid, return the parsed data
        return result.data
      } catch {
        // If JSON parsing fails, return null
        return null
      }
    },
    // This function converts a sorting state object to a string for the URL
    serialize: (value) => JSON.stringify(value),

    // This function checks if two sorting states are equal
    // Used to avoid unnecessary URL updates
    eq: (a, b) =>
      a.length === b.length && // Check if they have the same number of items
      a.every(
        (item, index) =>
          item.id === b[index]?.id && item.desc === b[index]?.desc // Check if each item matches
      ),
  })
}
