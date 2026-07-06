import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import QueryPage from './pages/QueryPage'
import HistoryPage from './pages/HistoryPage'
import SchemaPage from './pages/SchemaPage'
import SavedQueriesPage from './pages/SavedQueriesPage'
import SettingsPage from './pages/SettingsPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProtectedRoute from './components/layout/ProtectedRoute'
import { useAuth } from './context/AuthContext'

function App() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-slate-900 text-gray-900 dark:text-gray-100 font-sans selection:bg-brand-500 selection:text-white transition-colors duration-300">
      {!hideNavbar && <Navbar />}
      <main className="container mx-auto px-4 py-12 max-w-7xl animate-fade-in">
        <Routes>
          <Route path="/login" element={isAuthenticated ? <Navigate to="/query" replace /> : <LoginPage />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/query" replace /> : <RegisterPage />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/query" element={<QueryPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/schema" element={<SchemaPage />} />
            <Route path="/saved-queries" element={<SavedQueriesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/" element={<Navigate to="/query" replace />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/query" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App