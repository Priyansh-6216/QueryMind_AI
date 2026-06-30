import { ColumnSchemaDto } from '../../types/schema.types'

interface ColumnListProps {
  columns: ColumnSchemaDto[];
}

const ColumnList = ({ columns }: ColumnListProps) => {
  return (
    <div className="space-y-2">
      {columns.map((column) => (
        <div key={column.name} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
          <div className="flex items-center space-x-2">
            <span className="font-medium text-gray-900">{column.name}</span>
            <span className="text-sm text-gray-500">({column.type})</span>
          </div>
          <div className="flex space-x-1">
            {column.primaryKey && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                PK
              </span>
            )}
            {column.foreignKey && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                FK
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ColumnList