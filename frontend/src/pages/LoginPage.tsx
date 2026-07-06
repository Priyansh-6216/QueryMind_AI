import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/auth/login`, {
        username,
        password,
      });
      login(response.data.token, response.data.username);
      navigate('/query');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to login');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">Sign In</h2>
        {error && <div className="p-3 text-sm text-red-500 bg-red-100 rounded-lg">{error}</div>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-brand-500 focus:border-brand-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-brand-500 focus:border-brand-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
              required
            />
          </div>
          <button type="submit" className="w-full px-4 py-2 text-white bg-brand-600 rounded-lg hover:bg-brand-700 focus:outline-none">
            Sign In
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          Don't have an account? <Link to="/register" className="text-brand-600 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
