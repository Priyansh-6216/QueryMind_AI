import { useState } from 'react'
import Navbar from './components/layout/Navbar'
import QueryPage from './pages/QueryPage'
import HistoryPage from './pages/HistoryPage'
import SchemaPage from './pages/SchemaPage'
import SavedQueriesPage from './pages/SavedQueriesPage'

import SettingsPage from './pages/SettingsPage'

function App() {
  const [currentPage, setCurrentPage] = useState('query')

  const renderPage = () => {
    switch (currentPage) {
      case 'query':
        return <QueryPage />
      case 'history':
        return <HistoryPage />
      case 'schema':
        return <SchemaPage />
      case 'saved-queries':
        return <SavedQueriesPage />
      case 'settings':
        return <SettingsPage />
      default:
        return <QueryPage />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-slate-900 text-gray-900 dark:text-gray-100 font-sans selection:bg-brand-500 selection:text-white transition-colors duration-300">
      <Navbar currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="container mx-auto px-4 py-12 max-w-7xl animate-fade-in">
        {renderPage()}
      </main>
    </div>
  )
}

export default App