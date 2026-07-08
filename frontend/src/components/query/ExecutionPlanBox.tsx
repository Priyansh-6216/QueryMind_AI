interface ExecutionPlanBoxProps {
  plan?: string
}

const ExecutionPlanBox = ({ plan }: ExecutionPlanBoxProps) => {
  if (!plan) return null;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800/50 overflow-hidden mb-6">
      <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700/50 flex justify-between items-center">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center space-x-2">
          <svg className="w-5 h-5 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>Query Execution Plan</span>
        </h3>
      </div>
      <div className="p-6 overflow-x-auto">
        <pre className="text-sm font-mono text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
          {plan}
        </pre>
      </div>
    </div>
  )
}

export default ExecutionPlanBox
