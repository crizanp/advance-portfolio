import { useState, useEffect } from 'react';

export default function BCTQuestionTypeModal({ onClose }) {
  const [types, setTypes] = useState([]);
  const [newType, setNewType] = useState('');
  const [subtopics, setSubtopics] = useState([]);
  const [editingType, setEditingType] = useState(null);

  useEffect(() => {
    fetchQuestionTypes();
  }, []);

  const fetchQuestionTypes = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bct-question-types`);
      const data = await response.json();
      setTypes(data);
    } catch (error) {
      console.error('Error fetching question types:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editingType
      ? `${process.env.NEXT_PUBLIC_API_URL}/bct-question-types/${editingType._id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/bct-question-types`;

    const method = editingType ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newType,
          subtopics: subtopics.filter(st => st.trim() !== ''), // Remove empty subtopics
        }),
      });

      if (!response.ok) throw new Error('Operation failed');

      fetchQuestionTypes();
      setNewType('');
      setSubtopics([]);
      setEditingType(null);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this question type?');
    if (!confirmed) return;

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bct-question-types/${id}`, {
        method: 'DELETE',
      });
      fetchQuestionTypes();
    } catch (error) {
      console.error('Error deleting type:', error);
    }
  };

  const addSubtopic = () => {
    setSubtopics([...subtopics, '']); // Add an empty string
  };

  const updateSubtopic = (index, value) => {
    const updatedSubtopics = [...subtopics];
    updatedSubtopics[index] = value; // Update the string directly
    setSubtopics(updatedSubtopics);
  };

  const removeSubtopic = (index) => {
    setSubtopics(subtopics.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 max-h-[90vh] overflow-y-auto">
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

          <div>
            <h3 className="text-lg font-semibold mb-2">Subtopics</h3>
            {subtopics.map((subtopic, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={subtopic}
                  onChange={(e) => updateSubtopic(index, e.target.value)}
                  placeholder="Subtopic"
                  className="border p-2 flex-1"
                />
                <button
                  type="button"
                  onClick={() => removeSubtopic(index)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addSubtopic}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Add Subtopic
            </button>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded"
            >
              {editingType ? 'Update' : 'Add'} Type
            </button>
          </div>
        </form>

        <ul>
          {types.map((type) => (
            <li key={type._id} className="mb-4 p-2 border rounded">
              <div className="flex justify-between items-center">
                <span className="font-semibold">{type.name}</span>
                <div>
                  <button
                    onClick={() => {
                      setEditingType(type);
                      setNewType(type.name);
                      setSubtopics(type.subTopics.map(st => st.name)); // Convert to array of strings
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
              </div>
              {type.subTopics?.length > 0 && (
                <ul className="mt-2 pl-4 list-disc text-sm text-gray-600">
                  {type.subTopics.map((sub, i) => (
                    <li key={i}>{sub.name}</li> // Display subtopic name
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}