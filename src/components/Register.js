import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ login, setShowLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const { name, email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('https://todobackend-5g64.onrender.com/api/auth/register', formData);
      login(res.data.token);
    } catch (err) {
      setError(err.response.data.msg);
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={name}
          onChange={onChange}
          required
        />
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
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account?{' '}
        <span onClick={() => setShowLogin(true)} className="auth-link">
          Login
        </span>
      </p>
    </div>
  );
};

export default Register;