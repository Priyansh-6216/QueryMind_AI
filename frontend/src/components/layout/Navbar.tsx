import { useTheme } from '../../context/ThemeContext'

interface NavbarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Navbar = ({ currentPage, onPageChange }: NavbarProps) => {
  const { theme, toggleTheme } = useTheme()
  const navItems = [
    { id: 'query', label: 'Query' },
    { id: 'history', label: 'History' },
    { id: 'schema', label: 'Schema' },
    { id: 'saved-queries', label: 'Saved Queries' },
  ]

  return (
    <nav className="sticky top-0 z-50 glass border-b border-gray-200/50 dark:border-gray-800/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">QueryMind AI</h1>
            <div className="flex space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onPageChange(item.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ease-in-out ${
                    currentPage === item.id
                      ? 'bg-brand-500 text-white shadow-md shadow-brand-500/30'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800/80'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-100/80 transition-all duration-200 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800/80"
              title="Toggle theme"
            >
              {theme === 'light' ? (
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.415-1.415l.708-.707a1 1 0 011.414 0zm-9.192 9.192a1 1 0 001.414 1.414l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 01-1.414-1.414zm8.66-5.66a1 1 0 001.414 1.414l.707.707a1 1 0 10-1.414 1.414l-.707-.707a1 1 0 01-1.414-1.414zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zM5 10.5a1 1 0 010-1H4a1 1 0 110 2h1a1 1 0 010-1zm1.575-6.464a1 1 0 00-1.414 1.414l1.414 1.414a1 1 0 101.414-1.414L6.575 4.036zM10 13a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zm-5 6a1 1 0 010 2H4a1 1 0 110-2h1a1 1 0 010 2zm1.414-8.414l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 00-1.414 1.414zM10 5a1 1 0 011 1v1a1 1 0 11-2 0V6a1 1 0 011-1zm0 10a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M17.293 13.293A8 8 0 016.707 2.707a2.76 2.76 0 00-3.88 3.88A8.003 8.003 0 003.293 17.293a2.76 2.76 0 003.88 3.88 8 8 0 0110.586-10.586zm-10.586 3.293a4 4 0 115.656-5.656 4 4 0 01-5.656 5.656z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar