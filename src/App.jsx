import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './components/Login';
import Register from './components/Register';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
      getUser();
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
    }
  }, [token]);

  const getUser = async () => {
    try {
      const res = await axios.get('https://todobackend-5g64.onrender.com/api/auth/user');
      setUser(res.data);
      console.log('main hu user',user)
      
    } catch (err) {
      console.error(err.response.data);
      logout();
    }
  };

  const login = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  if (!token) {
    return (
      <div className="App">
        {showLogin ? (
          <Login login={login} setShowLogin={setShowLogin} />
        ) : (
          <Register login={login} setShowLogin={setShowLogin} />
        )}
      </div>
    );
  }

  return (
    <div className="App">
      <nav>
        <h2>Todo App</h2>
        <button onClick={logout}>Logout</button>
      </nav>
      <TodoList User={user} />
    </div>
  );
}

export default App;