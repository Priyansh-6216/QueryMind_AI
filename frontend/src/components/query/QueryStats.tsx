import SkeletonText from '../common/SkeletonText'

interface QueryStatsProps {
  rowCount: number;
  executionTimeMs: number;
  status: string;
  loading?: boolean;
}

const QueryStats = ({
  rowCount,
  executionTimeMs,
  status,
  loading = false
}: QueryStatsProps) => {
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

  // Show skeleton loader when loading
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Query Statistics</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center">
              <SkeletonText width="80" height="1.5rem" className="inline-block" />
            </div>
            <div className="text-sm text-gray-500 mt-1">Rows</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center">
              <SkeletonText width="80" height="1.5rem" className="inline-block" />
            </div>
            <div className="text-sm text-gray-500 mt-1">Execution Time</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center">
              <SkeletonText width="80" height="1.5rem" className="inline-block" />
            </div>
            <div className="text-sm text-gray-500 mt-1">Status</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Query Statistics</h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{rowCount}</div>
          <div className="text-sm text-gray-500">Rows</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{executionTimeMs}ms</div>
          <div className="text-sm text-gray-500">Execution Time</div>
        </div>
        <div className="text-center">
          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
            {status}
          </div>
          <div className="text-sm text-gray-500 mt-1">Status</div>
        </div>
      </div>
    </div>
  )
}

export default QueryStats