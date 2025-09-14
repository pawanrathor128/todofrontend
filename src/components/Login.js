import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ login, setShowLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('https://todobackend-5g64.onrender.com/api/auth/login', formData);
      login(res.data.token);
    } catch (err) {
      setError(err.response.data.msg);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={onChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={onChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?{' '}
        <span onClick={() => setShowLogin(false)} className="auth-link">
          Register
        </span>
      </p>
    </div>
  );
};

export default Login;