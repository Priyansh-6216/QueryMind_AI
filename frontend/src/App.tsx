import { useState } from 'react'
import Navbar from './components/layout/Navbar'
import QueryPage from './pages/QueryPage'
import HistoryPage from './pages/HistoryPage'
import SchemaPage from './pages/SchemaPage'

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
      default:
        return <QueryPage />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="container mx-auto px-4 py-8">
        {renderPage()}
      </main>
    </div>
  )
}

export default App