import { useState, useEffect } from 'react'
import { schemaApi } from '../../api/schemaApi'
import { SchemaResponse, TableSchemaDto } from '../../types/schema.types'
import TableCard from './TableCard'
import Loader from '../common/Loader'
import ErrorBanner from '../common/ErrorBanner'

const SchemaViewer = () => {
  const [schema, setSchema] = useState<SchemaResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadSchema()
  }, [])

  const loadSchema = async () => {
    try {
      setLoading(true)
      const data = await schemaApi.getSchema()
      setSchema(data)
    } catch (err) {
      setError('Failed to load database schema')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <ErrorBanner message={error} onClose={() => setError(null)} />
  }

  if (!schema || schema.tables.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No tables found in the database</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schema.tables.map((table) => (
          <TableCard key={table.name} table={table} />
        ))}
      </div>
    </div>
  )
}

export default SchemaViewer