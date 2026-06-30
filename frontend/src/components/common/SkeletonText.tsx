import React from 'react'

interface SkeletonTextProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}

const SkeletonText = ({
  width = '100%',
  height = '1rem',
  className = ''
}: SkeletonTextProps) => {
  return (
    <div
      className={`animate-pulse bg-gray-300 rounded ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
    />
  )
}

export default SkeletonText