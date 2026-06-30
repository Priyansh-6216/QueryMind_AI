import React from 'react'

const SkeletonText: React.FC<{
  width?: string | number;
  height?: string | number;
  className?: string
}> = ({ width = '100%', height = '1rem', className = '' }) => {
  return (
    <div
      className={`animate-pulse rounded bg-gray-200 ${className}`}
      style={{ width, height }}
    />
  )
}

export default SkeletonText