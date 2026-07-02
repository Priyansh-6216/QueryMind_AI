import React, { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import SavedQueryList from '../components/saved-query/SavedQueryList';
import SaveQueryModal from '../components/saved-query/SaveQueryModal';
import { SavedQuery } from '../types/savedQuery.types';

const SavedQueriesPage: React.FC = () => {
  const [savedQueries, setSavedQueries] = useState<SavedQuery[]>([]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [editingQuery, setEditingQuery] = useState<SavedQuery | null>(null);

  // Fetch saved queries from the backend
  const fetchSavedQueries = async () => {
    try {
      const response = await fetch('/api/saved-queries');
      if (!response.ok) {
        throw new Error('Failed to fetch saved queries');
      }
      const data = await response.json();
      setSavedQueries(data);
    } catch (error) {
      console.error('Error fetching saved queries:', error);
    }
  };

  // Load saved queries on component mount
  // We'll do it in a useEffect, but for simplicity we'll call it in the event handlers for now
  // In a real app, we would use useEffect.

  const handleSave = (savedQueryData: Omit<SavedQuery, 'id' | 'createdAt' | 'updatedAt'>) => {
    // Here we would normally call the API to save, but for now we'll simulate
    // We'll call the API and then update the state
    fetch('/api/saved-queries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(savedQueryData),
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error('Failed to save query');
        }
        const newQuery = await res.json();
        // Update the list
        setSavedQueries((prev) => [...prev, newQuery]);
        setShowSaveModal(false);
      })
      .catch((err) => {
        console.error('Error saving query:', err);
        alert('Failed to save query');
      });
  };

  const handleUpdate = (id: number, updatedData: Omit<SavedQuery, 'id' | 'createdAt' | 'updatedAt'>) => {
    fetch(`/api/saved-queries/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error('Failed to update query');
        }
        const updatedQuery = await res.json();
        // Update the list
        setSavedQueries((prev) =>
          prev.map((q) => (q.id === id ? updatedQuery : q))
        );
        setShowSaveModal(false);
        setEditingQuery(null);
      })
      .catch((err) => {
        console.error('Error updating query:', err);
        alert('Failed to update query');
      });
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this saved query?')) {
      try {
        const response = await fetch(`/api/saved-queries/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete query');
        }
        setSavedQueries((prev) => prev.filter((q) => q.id !== id));
      } catch (error) {
        console.error('Error deleting query:', error);
        alert('Failed to delete query');
      }
    }
  };

  const handleLoad = (query: SavedQuery) => {
    // For now, we'll just show an alert. In a real app, we would navigate to the QueryPage
    // and set the question there.
    alert(`Loaded query: ${query.question}\n\nNote: To actually load this query into the query input, you would need to navigate to the Query page and set the question. This is a placeholder.`);
  };

  return (
    <PageContainer title="Saved Queries">
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Saved Queries</h1>
          <button
            onClick={() => {
              setEditingQuery(null);
              setShowSaveModal(true);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            New Saved Query
          </button>
        </div>

        {/* Fetch and display saved queries */}
        <div className="glass rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Saved Queries List</h2>
          <button
            onClick={fetchSavedQueries}
            className="mb-4 px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Refresh List
          </button>
          <SavedQueryList
            savedQueries={savedQueries}
            onLoad={handleLoad}
            onEdit={(query) => {
              setEditingQuery(query);
              setShowSaveModal(true);
            }}
            onDelete={handleDelete}
          />
        </div>
      </div>

      {/* Save Query Modal */}
      <SaveQueryModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        onSave={(data) => editingQuery ? handleUpdate(editingQuery.id, data) : handleSave(data)}
        initialData={editingQuery || undefined}
      />
    </PageContainer>
  );
};

export default SavedQueriesPage;