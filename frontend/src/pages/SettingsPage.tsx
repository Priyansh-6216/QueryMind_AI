import { useState, useEffect } from 'react';
import PageContainer from '../components/layout/PageContainer';
import Button from '../components/common/Button';
import { settingsApi } from '../api/settingsApi';
import { DatabaseConnectionDto } from '../types/settings.types';
import ErrorBanner from '../components/common/ErrorBanner';

const SettingsPage = () => {
  const [url, setUrl] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const [activeConnection, setActiveConnection] = useState<DatabaseConnectionDto | null>(null);

  useEffect(() => {
    loadActiveConnection();
  }, []);

  const loadActiveConnection = async () => {
    try {
      const conn = await settingsApi.getActiveConnection();
      setActiveConnection(conn);
      if (conn) {
        setUrl(conn.url);
        setUsername(conn.username);
        // Do not set password as it comes masked
      }
    } catch (err) {
      console.error("Failed to load connection", err);
    }
  };

  const handleTest = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await settingsApi.testConnection({ url, username, password });
      setSuccess("Connection successful! You can now save it.");
    } catch (err: any) {
      setError(err.response?.data || "Connection failed. Please check credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await settingsApi.saveConnection({ url, username, password });
      setSuccess("Connection saved successfully and activated!");
      loadActiveConnection();
    } catch (err: any) {
      setError(err.response?.data || "Failed to save connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await settingsApi.resetConnection();
      setSuccess("Connection reset to default application database.");
      setActiveConnection(null);
      setUrl('');
      setUsername('');
      setPassword('');
    } catch (err: any) {
      setError("Failed to reset connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer title="Database Connections">
      <div className="space-y-6 max-w-2xl mx-auto">
        
        {error && <ErrorBanner message={error} onClose={() => setError(null)} />}
        
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl p-4 flex justify-between items-center">
            <span>{success}</span>
            <button onClick={() => setSuccess(null)} className="text-green-600 hover:text-green-800">×</button>
          </div>
        )}

        <div className="glass rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Connect to External Database</h2>
          <p className="text-gray-500 mb-6 text-sm">
            QueryMind AI will automatically use this database to generate schemas and execute SQL.
            Your query history will still be saved to the default application database.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">JDBC URL</label>
              <input 
                type="text" 
                value={url} 
                onChange={e => setUrl(e.target.value)}
                placeholder="jdbc:postgresql://localhost:5432/mydb"
                className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:bg-slate-800 dark:border-slate-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
              <input 
                type="text" 
                value={username} 
                onChange={e => setUsername(e.target.value)}
                placeholder="postgres"
                className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:bg-slate-800 dark:border-slate-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)}
                placeholder={activeConnection ? "********" : "password"}
                className="w-full p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:bg-slate-800 dark:border-slate-600"
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <Button onClick={handleTest} disabled={loading || !url}>
                {loading ? 'Testing...' : 'Test Connection'}
              </Button>
              <Button onClick={handleSave} disabled={loading || !url} className="bg-green-600 hover:bg-green-700 text-white border-transparent">
                Save & Activate
              </Button>
              {activeConnection && (
                <button 
                  onClick={handleReset} 
                  disabled={loading}
                  className="px-4 py-2 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-colors font-medium text-sm"
                >
                  Reset to Default
                </button>
              )}
            </div>
          </div>
        </div>

        {activeConnection && (
          <div className="glass rounded-2xl p-6 border border-brand-200 shadow-sm">
            <h3 className="text-sm font-bold text-brand-600 uppercase tracking-wider mb-2">Active Connection</h3>
            <p className="text-gray-800 dark:text-gray-200 font-mono text-sm break-all">{activeConnection.url}</p>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default SettingsPage;
