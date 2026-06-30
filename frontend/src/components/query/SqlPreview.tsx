interface SqlPreviewProps {
  sql: string;
}

const SqlPreview = ({ sql }: SqlPreviewProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Generated SQL</h3>
      <div className="bg-gray-900 rounded-md p-4 overflow-x-auto">
        <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
          {sql}
        </pre>
      </div>
    </div>
  )
}

export default SqlPreview