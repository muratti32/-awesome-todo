import { CreateTodo } from 'components/create-todo';
import { TodoList } from 'components/todo-list';
import { getAllTodos } from 'lib/appwrite';
import { useEffect, useState } from 'react';
import type { Todo } from 'types';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    const list: Todo[] = await getAllTodos();
    if (list) setTodos(list);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="flex flex-col items-center  ">
      <div className="w-2/4">
        <div className="flex w-full items-center justify-center my-4">
          <h1 className="text-3xl font-bold underline mb-6 text-gray-400 ">
            Welcome Awesome Todo App
          </h1>
        </div>
        <div className="mb-12">
          <CreateTodo onCreate={fetchTodos} />
        </div>
        <div>
          <TodoList todos={todos} fetchTodos={fetchTodos} />
        </div>
      </div>
    </div>
  );
}

export default App;
