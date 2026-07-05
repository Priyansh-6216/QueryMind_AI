import { formatValue } from '../../utils/formatValue'
import SkeletonText from '../common/SkeletonText'
import * as XLSX from 'xlsx'

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

  const handleExportCSV = () => {
    const ws = XLSX.utils.aoa_to_sheet([columns, ...rows]);
    const csv = XLSX.utils.sheet_to_csv(ws);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'query_results.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportExcel = () => {
    const ws = XLSX.utils.aoa_to_sheet([columns, ...rows]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Results");
    XLSX.writeFile(wb, 'query_results.xlsx');
  };

  // Show actual data
  return (
    <div className="glass rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Query Results</h3>
        <div className="flex space-x-3">
          <button onClick={handleExportCSV} className="text-sm px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors border border-gray-300 flex items-center shadow-sm dark:bg-slate-800 dark:border-slate-600 dark:text-gray-300 dark:hover:bg-slate-700">
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
            Export CSV
          </button>
          <button onClick={handleExportExcel} className="text-sm px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors border border-green-300 flex items-center shadow-sm dark:bg-green-900/30 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-900/50">
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
            Export Excel
          </button>
        </div>
      </div>
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