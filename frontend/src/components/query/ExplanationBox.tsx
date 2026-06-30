interface ExplanationBoxProps {
  explanation: string;
}

const ExplanationBox = ({ explanation }: ExplanationBoxProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">AI Explanation</h3>
      <div className="prose prose-sm max-w-none">
        <p className="text-gray-700 leading-relaxed">{explanation}</p>
      </div>
    </div>
  )
}

export default ExplanationBox