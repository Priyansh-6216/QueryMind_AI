import React from 'react'
import SkeletonText from './SkeletonText'

const SkeletonTable: React.FC<{
  columns: string[];
  rows?: number;
  className?: string
}> = ({ columns, rows = 3, className = '' }) => {
  return (
    <div className={`overflow-x-auto ${className}`}>
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
          {Array.from({ length: rows }, (_, rowIndex) => (
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
  )
}

export default SkeletonTable