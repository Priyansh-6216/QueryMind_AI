import React from 'react'
import SkeletonText from '../common/SkeletonText'

interface ExplanationBoxProps {
  explanation: string;
  loading?: boolean;
}

const ExplanationBox = ({ explanation, loading = false }: ExplanationBoxProps) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold">AI Explanation</h3>
        </div>
        <div className="space-y-4">
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-700 leading-relaxed">
              <SkeletonText width="80%" height="1.5rem" className="mb-2" />
              <SkeletonText width="60%" height="1.5rem" className="mb-2" />
              <SkeletonText width="70%" height="1.5rem" className="mb-2" />
              <SkeletonText width="50%" height="1.5rem" className="mb-2" />
              <SkeletonText width="90%" height="1.5rem" className="mb-2" />
            </p>
          </div>
        </div>
      </div>
    )
  }

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