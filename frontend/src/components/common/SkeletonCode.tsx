import React from 'react'

const SkeletonCode: React.FC<{
  lines?: number;
  className?: string
}> = ({ lines = 3, className = '' }) => {
  const linesArray = Array.from({ length: lines }, (_, i) => i + 1)
  return (
    <div className={`space-y-1 ${className}`}>
      {linesArray.map((line) => (
        <div
          key={line}
          className="animate-pulse rounded bg-gray-200 h-4 w-[90%] mr-2"
          style={{ opacity: 0.8 + Math.random() * 0.2 }}
        />
      ))}
    </div>
  )
}

export default SkeletonCode