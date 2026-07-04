import { useState } from 'react'
import { queryApi } from '../api/queryApi'
import { QueryResponse, ErrorResponse } from '../types/query.types'
import PageContainer from '../components/layout/PageContainer'
import QueryInput from '../components/query/QueryInput'
import SqlPreview from '../components/query/SqlPreview'
import ExplanationBox from '../components/query/ExplanationBox'
import ResultTable from '../components/query/ResultTable'
import ResultChart from '../components/query/ResultChart'
import QueryStats from '../components/query/QueryStats'
import ErrorBanner from '../components/common/ErrorBanner'

const QueryPage = () => {
  const [result, setResult] = useState<QueryResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'table' | 'chart' | 'split'>('split')

  const handleQuerySubmit = async (question: string) => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await queryApi.executeQuery({ question })
      setResult(response)
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message)
      } else {
        setError('An error occurred while processing your query')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageContainer title="AI-Powered SQL Query Generation">
      <div className="space-y-6">
        <QueryInput onSubmit={handleQuerySubmit} loading={loading} />

        {error && (
          <ErrorBanner message={error} onClose={() => setError(null)} />
        )}

        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Generating SQL and executing query...</p>
          </div>
        )}

        {result && !loading && (
          <>
            <div className="flex items-center space-x-3 mb-4">
              <button
                onClick={() => setViewMode('table')}
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-xl ${
                  viewMode === 'table'
                    ? 'bg-brand-500 text-white shadow-md shadow-brand-500/30'
                    : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-slate-700'
                }`}
              >
                Table View
              </button>
              <button
                onClick={() => setViewMode('chart')}
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-xl ${
                  viewMode === 'chart'
                    ? 'bg-brand-500 text-white shadow-md shadow-brand-500/30'
                    : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-slate-700'
                }`}
              >
                Chart View
              </button>
              <button
                onClick={() => setViewMode('split')}
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-xl ${
                  viewMode === 'split'
                    ? 'bg-brand-500 text-white shadow-md shadow-brand-500/30'
                    : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:bg-slate-800 dark:text-gray-300 dark:hover:bg-slate-700'
                }`}
              >
                Split View
              </button>
            </div>

            {viewMode === 'table' && (
              <>
                <SqlPreview sql={result.sql} />
                <ExplanationBox explanation={result.explanation} />
                <ResultTable columns={result.columns} rows={result.rows} />
                <QueryStats
                  rowCount={result.rowCount}
                  executionTimeMs={result.executionTimeMs}
                  status={result.status}
                />
              </>
            )}

            {viewMode === 'chart' && (
              <>
                <SqlPreview sql={result.sql} />
                <ExplanationBox explanation={result.explanation} />
                <ResultChart
                  columns={result.columns}
                  rows={result.rows}
                  suggestedChartType={result.suggestedChartType}
                />
                <QueryStats
                  rowCount={result.rowCount}
                  executionTimeMs={result.executionTimeMs}
                  status={result.status}
                />
              </>
            )}

            {viewMode === 'split' && (
              <>
                <SqlPreview sql={result.sql} />
                <ExplanationBox explanation={result.explanation} />
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                  <div className="min-w-0">
                    <ResultTable columns={result.columns} rows={result.rows} />
                  </div>
                  <div className="min-w-0">
                    <ResultChart
                      columns={result.columns}
                      rows={result.rows}
                      suggestedChartType={result.suggestedChartType}
                    />
                  </div>
                </div>
                <QueryStats
                  rowCount={result.rowCount}
                  executionTimeMs={result.executionTimeMs}
                  status={result.status}
                />
              </>
            )}
          </>
        )}
      </div>
    </PageContainer>
  )
}

export default QueryPage