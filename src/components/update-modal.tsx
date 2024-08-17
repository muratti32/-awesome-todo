import { updateTodo } from 'lib/appwrite';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import type { Todo } from 'types';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
type Props = {
  todo: Todo | null;
  updateModalOpen: boolean;
  setUpdateModalOpen: (value: boolean) => void;
  onClosed?: () => void;
};

export const UpdateModal = (props: Props) => {
  const {
    todo,
    updateModalOpen: modalIsOpen,
    setUpdateModalOpen: setIsOpen,
    onClosed,
  } = props;
  if (!todo) return null;
  const [value, setValue] = useState<string>();

  useEffect(() => {
    if (todo) setValue(todo.content);
  }, [todo]);

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
    onClosed && onClosed();
  }

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    try {
      if (!value) throw new Error('No value');
      const res = await updateTodo(todo.$id, value);
      if (!res) throw new Error('No todo updated');
      closeModal();
    } catch (error: any) {}
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Update Todo"
    >
      <div className="text-3xl text-gray-600 text-center font-bold">
        Update Todo
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full px-4 py-2 mb-2 border rounded-lg focus:outline-none focus:border-blue-500"
        placeholder="Enter a new todo"
      />
      <button
        onClick={handleUpdate}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Update Todo
      </button>

      <button onClick={closeModal}>Update</button>
      <button onClick={closeModal}>Cancel</button>
    </Modal>
  );
};
