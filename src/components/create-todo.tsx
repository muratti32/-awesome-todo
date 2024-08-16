import { useState } from 'react';
import { addTodo } from '../lib/appwrite';

interface Props {
  onCreate: () => void;
}

export const CreateTodo = (props: Props) => {
  const { onCreate } = props;
  const [todo, setTodo] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!todo) return;
    try {
      const res = await addTodo(todo);
      if (!res) throw new Error('No todo created');
      setTodo('');
      onCreate();
    } catch (error: any) {}
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Add Todo</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          className="w-full px-4 py-2 mb-2 border rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Enter a new todo"
        />
        <button
          onClick={handleSubmit}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add Todo
        </button>
      </form>
    </div>
  );
};
