import { useState } from 'react';
import { deleteTodo, updateTodoStatus } from '../lib/appwrite';
import { MdModeEditOutline } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
import type { Todo } from '../types';
import { UpdateModal } from './update-modal';

type Props = {
  todos: Todo[];
  fetchTodos: () => void;
};

export const TodoList = (props: Props) => {
  const { todos, fetchTodos } = props;
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [updateTodo, setUpdateTodo] = useState<Todo | null>(null);

  const handleUpdateTodoStatus = (todo: Todo) => async () => {
    const res = await updateTodoStatus(todo.$id, !todo.completed);
    if (res) fetchTodos();
  };

  const handleDeleteTodo = (todo: Todo) => async () => {
    const res = await deleteTodo(todo.$id);
    if (res) fetchTodos();
  };

  const editTodo = (todo: Todo) => () => {
    setUpdateTodo(todo);
    setTimeout(() => {
      setUpdateModalOpen(true);
    }, 100);
  };

  return (
    <div className="p-4 h-full">
      <h2 className="text-xl font-bold mb-4">Todo List</h2>
      <ul className="">
        {todos.map((todo, index) => (
          <div className="my-4 border border-gray-300 flex items-center justify-between  px-2 py-4 hover:bg-gray-100 hover:shadow-md transition duration-300 ease-in-out hover:text-gray-800 cursor-pointer">
            <li key={index} className="text-left text-lg font-medium ">
              {todo.content}
            </li>
            <div className="flex gap-4 items-center">
              <div className="cursor-pointer flex items-center gap-4 ">
                <input
                  onClick={handleUpdateTodoStatus(todo)}
                  type="checkbox"
                  checked={todo.completed}
                  className="w-6 h-6   "
                />

                <MdModeEditOutline
                  onClick={editTodo(todo)}
                  className="text-3xl "
                />
                <MdDelete
                  onClick={handleDeleteTodo(todo)}
                  className="text-3xl "
                />
              </div>
            </div>
          </div>
        ))}
      </ul>
      <UpdateModal
        todo={updateTodo}
        updateModalOpen={updateModalOpen}
        setUpdateModalOpen={setUpdateModalOpen}
        onClosed={fetchTodos}
      />
    </div>
  );
};
