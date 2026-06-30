import { useState } from 'react'
import Button from '../common/Button'

interface QueryInputProps {
  onSubmit: (question: string) => void;
  loading: boolean;
}

const QueryInput = ({ onSubmit, loading }: QueryInputProps) => {
  const [question, setQuestion] = useState('')

  const exampleQuestions = [
    "Show me all users from New York",
    "What are the top 5 products by price?",
    "How many orders were completed this month?",
    "List users who spent more than $100"
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (question.trim()) {
      onSubmit(question.trim())
    }
  }

  const handleExampleClick = (example: string) => {
    setQuestion(example)
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold mb-4">Ask a Question</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your question in plain English..."
            className="w-full h-24 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            disabled={loading}
          />
        </div>

        <div className="flex justify-between items-center">
          <Button type="submit" disabled={loading || !question.trim()}>
            {loading ? 'Generating...' : 'Ask QueryMind'}
          </Button>
        </div>
      </form>

      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Example questions:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {exampleQuestions.map((example, index) => (
            <button
              key={index}
              onClick={() => handleExampleClick(example)}
              className="text-left p-2 text-sm text-blue-600 hover:bg-blue-50 rounded border border-blue-200 hover:border-blue-300"
              disabled={loading}
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default QueryInput