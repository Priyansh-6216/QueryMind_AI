import { useState } from 'react';
import { formatSql } from '../../utils/formatSql';

interface SqlPreviewProps {
  sql: string;
  loading?: boolean;
}

const SqlPreview = ({ sql, loading = false }: SqlPreviewProps) => {
  const [formattedSql, setFormattedSql] = useState<string>('');
  const [isFormatting, setIsFormatting] = useState<boolean>(false);
  const [showFormatted, setShowFormatted] = useState<boolean>(false);

  const formatSqlHandler = async () => {
    setIsFormatting(true);
    try {
      const formatted = await Promise.resolve(formatSql(sql));
      setFormattedSql(formatted);
      setShowFormatted(true);
    } catch (error) {
      console.error('Error formatting SQL:', error);
      alert('Failed to format SQL');
    } finally {
      setIsFormatting(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('SQL copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
      alert('Failed to copy to clipboard');
    }
  };

  // Show skeleton loader when loading
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Generated SQL</h3>
        <div className="bg-gray-900 rounded-md p-4 overflow-x-auto h-32">
          <div className="animate-pulse space-y-2">
            <div className="h-2 bg-green-600 rounded w-1/2"></div>
            <div className="h-2 bg-green-600 rounded w-3/4"></div>
            <div className="h-2 bg-green-600 rounded w-1/2"></div>
            <div className="h-2 bg-green-600 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold">Generated SQL</h3>
        <div className="flex space-x-2">
          <button
            onClick={formatSqlHandler}
            disabled={isFormatting}
            className="px-3 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 disabled:opacity-50"
          >
            {isFormatting ? 'Formatting...' : 'Format SQL'}
          </button>
          <button
            onClick={() => copyToClipboard(showFormatted ? formattedSql : sql)}
            className="px-3 py-1 bg-green-100 text-green-800 rounded hover:bg-green-200"
          >
            Copy SQL
          </button>
        </div>
      </div>
      <div className="bg-gray-900 rounded-md p-4 overflow-x-auto">
        <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
          {showFormatted && formattedSql ? formattedSql : sql}
        </pre>
      </div>
      {showFormatted && !isFormatting && (
        <div className="mt-2 text-xs text-gray-500">
          Showing formatted SQL. Click "Format SQL" to toggle back.
        </div>
      )}
    </div>
  )
}

export default SqlPreview