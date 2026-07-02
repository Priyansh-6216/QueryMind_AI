import React from 'react'
import SkeletonText from '../common/SkeletonText'

interface ExplanationBoxProps {
  explanation: string;
  loading?: boolean;
}

const ExplanationBox = ({ explanation, loading = false }: ExplanationBoxProps) => {
  if (loading) {
    return (
      <div className="glass rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
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
    <div className="glass rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
      <h3 className="text-lg font-semibold mb-4">AI Explanation</h3>
      <div className="prose prose-sm max-w-none">
        <p className="text-gray-700 leading-relaxed">{explanation}</p>
      </div>
    </div>
  )
}

export default ExplanationBox