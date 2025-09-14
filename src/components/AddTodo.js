import React, { useState } from 'react';

const AddTodo = ({ addTodo }) => {
  const [text, setText] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText('');
    }
  };

  return (
    <form onSubmit={onSubmit} className="add-todo">
      <input
        type="text"
        placeholder="Add a new todo..."
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTodo;