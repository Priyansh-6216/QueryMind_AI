import { useState } from 'react'
import { queryApi } from '../api/queryApi'
import { QueryResponse, ErrorResponse } from '../types/query.types'
import PageContainer from '../components/layout/PageContainer'
import QueryInput from '../components/query/QueryInput'
import SqlPreview from '../components/query/SqlPreview'
import ExplanationBox from '../components/query/ExplanationBox'
import ResultTable from '../components/query/ResultTable'
import QueryStats from '../components/query/QueryStats'
import ErrorBanner from '../components/common/ErrorBanner'

const QueryPage = () => {
  const [result, setResult] = useState<QueryResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Generating SQL and executing query...</p>
          </div>
        )}

        {result && !loading && (
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
      </div>
    </PageContainer>
  )
}

export default QueryPage