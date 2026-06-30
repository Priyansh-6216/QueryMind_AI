import { QueryHistoryDto } from '../../types/history.types'
import { formatDate } from '../../utils/formatDate'
import Button from '../common/Button'

interface HistoryCardProps {
  historyItem: QueryHistoryDto;
  onDelete: (id: number) => void;
}

const HistoryCard = ({ historyItem, onDelete }: HistoryCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'SUCCESS':
        return 'text-green-600 bg-green-100'
      case 'ERROR':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {historyItem.question}
          </h3>
          <div className="text-sm text-gray-500 mb-2">
            {formatDate(historyItem.createdAt)}
          </div>
          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(historyItem.status)}`}>
            {historyItem.status}
          </div>
        </div>
        <Button
          variant="secondary"
          onClick={() => onDelete(historyItem.id)}
          className="ml-4"
        >
          Delete
        </Button>
      </div>

      {historyItem.generatedSql && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-1">Generated SQL:</h4>
          <div className="bg-gray-900 rounded p-3">
            <code className="text-green-400 text-sm font-mono">
              {historyItem.generatedSql}
            </code>
          </div>
        </div>
      )}

      {historyItem.executionTimeMs && (
        <div className="text-sm text-gray-500">
          Execution time: {historyItem.executionTimeMs}ms
        </div>
      )}
    </div>
  )
}

export default HistoryCard