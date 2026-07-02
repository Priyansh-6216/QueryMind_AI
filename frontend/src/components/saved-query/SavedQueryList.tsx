import React from 'react';
import { SavedQuery } from '../../types/savedQuery.types';

interface SavedQueryListProps {
  savedQueries: SavedQuery[];
  onLoad: (query: SavedQuery) => void;
  onEdit: (query: SavedQuery) => void;
  onDelete: (id: number) => void;
}

const SavedQueryList: React.FC<SavedQueryListProps> = ({
  savedQueries,
  onLoad,
  onEdit,
  onDelete,
}) => {
  if (savedQueries.length === 0) {
    return (
      <div className="glass rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Saved Queries</h3>
        <p className="text-gray-500">No saved queries yet. Create your first one!</p>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Saved Queries</h3>
      <div className="space-y-4">
        {savedQueries.map((query) => (
          <div
            key={query.id}
            className="border-t pt-4 last:border-t-0 last:pb-0"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-900">{query.name}</h4>
                <p className="text-sm text-gray-500 mt-1 truncate">
                  {query.question}
                </p>
                {query.generatedSql && (
                  <div className="mt-2">
                    <p className="text-xs font-mono text-gray-600 bg-gray-50 p-2 rounded">
                      {query.generatedSql}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex space-x-2 text-sm">
                <button
                  onClick={() => onLoad(query)}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                >
                  Load
                </button>
                <button
                  onClick={() => onEdit(query)}
                  className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(query.id)}
                  className="px-3 py-1 bg-red-100 text-red-800 rounded hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedQueryList;