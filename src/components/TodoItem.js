import React, { useState } from 'react';

const TodoItem = ({ todo, updateTodo, deleteTodo }) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  const onEdit = () => {
    setEditing(true);
  };

  const onSave = () => {
    updateTodo(todo._id, { text, completed: todo.completed });
    setEditing(false);
  };

  const onCancel = () => {
    setText(todo.text);
    setEditing(false);
  };

  const onToggleComplete = () => {
    updateTodo(todo._id, { text: todo.text, completed: !todo.completed });
  };

  const onDelete = () => {
    deleteTodo(todo._id);
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      {editing ? (
        <>
          <input
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <button onClick={onSave}>Save</button>
          <button onClick={onCancel}>Cancel</button>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={onToggleComplete}
          />
          <span>{todo.text}</span>
          <button onClick={onEdit}>Edit</button>
          <button onClick={onDelete}>Delete</button>
        </>
      )}
    </div>
  );
};

export default TodoItem;