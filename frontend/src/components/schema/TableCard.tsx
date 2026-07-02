import { TableSchemaDto } from '../../types/schema.types'
import ColumnList from './ColumnList'

interface TableCardProps {
  table: TableSchemaDto;
}

const TableCard = ({ table }: TableCardProps) => {
  return (
    <div className="glass rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {table.name}
      </h3>
      <ColumnList columns={table.columns} />
    </div>
  )
}

export default TableCard