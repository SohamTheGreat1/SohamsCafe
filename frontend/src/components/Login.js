import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../axios.js';
import './Auth.css';

const Login = (props) => {
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '' 
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await api.post('/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      props.setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.error || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Welcome Back</h2>
      <p className="auth-subtitle">Please enter your login details</p>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="username"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />
        </div>

        <button 
          type="submit" 
          className="auth-button"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div className="auth-footer">
        <p>
          Don't have an account?{' '}
          <span className="auth-link" onClick={() => navigate('/register')}>
            Create one
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;