import { formatValue } from '../../utils/formatValue'
import SkeletonText from '../common/SkeletonText'

interface ResultTableProps {
  columns: string[];
  rows: unknown[][];
  loading?: boolean;
}

const ResultTable = ({ columns, rows, loading = false }: ResultTableProps) => {
  // Show skeleton loader when loading
  if (loading) {
    return (
      <div className="glass rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Query Results</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <SkeletonText width="100%" height="1.5rem" className="inline-block" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[1, 2, 3].map((_, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50">
                  {columns.map((_, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      <SkeletonText width="100%" height="1rem" className="inline-block" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  // Show empty state when no data
  if (columns.length === 0 || rows.length === 0) {
    return (
      <div className="glass rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Query Results</h3>
        <p className="text-gray-500">No results to display</p>
      </div>
    )
  }

  // Show actual data
  return (
    <div className="glass rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Query Results</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {formatValue(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ResultTable