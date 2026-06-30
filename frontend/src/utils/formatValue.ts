export const formatValue = (value: unknown): string => {
  if (value === null) return 'NULL'
  if (typeof value === 'boolean') return value ? 'TRUE' : 'FALSE'
  return String(value)
}