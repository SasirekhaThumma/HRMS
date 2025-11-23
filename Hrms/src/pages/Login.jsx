import React, { useState } from 'react';
import api from '../api.js';

import '../style.css'

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      const res = await api.login({ username, password });
      alert(res.message || 'Login successful');
    } catch (err) {
      console.error('Login error:', err.message);
      alert('Login failed');
    }
  };

  return (
    <div className="page-container">
      <div className="content-card">
      <h2>Login</h2>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
      </div>
    </div>
  );
}

export default Login;
