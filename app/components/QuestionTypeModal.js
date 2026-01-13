import { useState, useEffect } from 'react';

export default function QuestionTypeModal({ onClose }) {
  const [types, setTypes] = useState([]);
  const [newType, setNewType] = useState('');
  const [editingType, setEditingType] = useState(null);

  useEffect(() => {
    fetchQuestionTypes();
  }, []);

  const fetchQuestionTypes = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/question-types`);
      const data = await response.json();
      setTypes(data);
    } catch (error) {
      console.error('Error fetching question types:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingType 
      ? `${process.env.NEXT_PUBLIC_API_URL}/question-types/${editingType._id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/question-types`;

    const method = editingType ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newType })
      });

      if (!response.ok) throw new Error('Operation failed');
      
      fetchQuestionTypes();
      setNewType('');
      setEditingType(null);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/question-types/${id}`, {
        method: 'DELETE'
      });
      fetchQuestionTypes();
    } catch (error) {
      console.error('Error deleting type:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Manage Question Types</h2>
        
        <form onSubmit={handleSubmit} className="mb-4">
          <input
            type="text"
            value={newType}
            onChange={(e) => setNewType(e.target.value)}
            placeholder="New question type"
            className="border p-2 w-full mb-2"
            required
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-gray-600 text-white px-4 py-2 rounded"
            >
              {editingType ? 'Update' : 'Add'} Type
            </button>
          </div>
        </form>

        <ul>
          {types.map((type) => (
            <li key={type._id} className="flex justify-between items-center mb-2">
              <span>{type.name}</span>
              <div>
                <button
                  onClick={() => {
                    setEditingType(type);
                    setNewType(type.name);
                  }}
                  className="text-blue-500 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(type._id)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}