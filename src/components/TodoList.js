import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';

const TodoList = ({user}) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name,setname] = useState('User')

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    try {
      const res = await axios.get('https://todobackend-5g64.onrender.com/api/todos');
      setTodos(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const addTodo = async text => {
    try {
      const res = await axios.post('https://todobackend-5g64.onrender.com/api/todos', { text });
      setTodos([res.data, ...todos]);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const updateTodo = async (id, updatedTodo) => {
    try {
      const res = await axios.put(`https://todobackend-5g64.onrender.com/api/todos/${id}`, updatedTodo);
      setTodos(todos.map(todo => (todo._id === id ? res.data : todo)));
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const deleteTodo = async id => {
    try {
      await axios.delete(`https://todobackend-5g64.onrender.com/api/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      console.error(err.response.data);
    }
  };

 //  name
      const getUsername = async () => {
        try {
          const res = await axios.get('https://todobackend-5g64.onrender.com/api/auth/name');
          
        
          
          const fullName = res.data.name; // e.g., "pawan rathore"
          const first = fullName.split(' ')[0]; // "pawan"
          const formattedFirst = first.charAt(0).toUpperCase() + first.slice(1).toLowerCase(); // "Pawan"
          setname(formattedFirst);
          
        } catch (err) {
          console.error(err);
          
        }
      };
      getUsername()


  if (loading) return <div>Loading...</div>;

  return (
    <div className="todo-container">
      <h2>Hello {name}</h2>

      {/* <h2>{user.name}</h2> */}
      <AddTodo addTodo={addTodo} />
      {todos.length === 0 ? (
        <p>No todos yet. Add one above!</p>
      ) : (
        todos.map(todo => (
          <TodoItem
            key={todo._id}
            todo={todo}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
          />
        ))
      )}
    </div>
  );
};

export default TodoList;