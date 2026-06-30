import { useState, useEffect } from 'react'
import { historyApi } from '../../api/historyApi'
import { QueryHistoryDto } from '../../types/history.types'
import { formatDate } from '../../utils/formatDate'
import HistoryCard from './HistoryCard'
import Loader from '../common/Loader'
import ErrorBanner from '../common/ErrorBanner'
import EmptyState from '../common/EmptyState'

const HistoryList = () => {
  const [history, setHistory] = useState<QueryHistoryDto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = async () => {
    try {
      setLoading(true)
      const data = await historyApi.getHistory()
      setHistory(data)
    } catch (err) {
      setError('Failed to load query history')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await historyApi.deleteHistory(id)
      setHistory(history.filter(item => item.id !== id))
    } catch (err) {
      setError('Failed to delete history item')
    }
  }

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <ErrorBanner message={error} onClose={() => setError(null)} />
  }

  if (history.length === 0) {
    return (
      <EmptyState
        title="No query history"
        description="Your previous queries will appear here"
      />
    )
  }

  return (
    <div className="space-y-4">
      {history.map((item) => (
        <HistoryCard
          key={item.id}
          historyItem={item}
          onDelete={handleDelete}
        />
      ))}
    </div>
  )
}

export default HistoryList