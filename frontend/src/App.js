import React, { useState, useEffect } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate,
  Link,
  useNavigate
} from 'react-router-dom';
import RestaurantList from './components/RestaurantList';
import RestaurantDetail from './components/RestaurantDetail';
import AddRestaurant from './components/AddRestaurant';
import AddItem from './components/AddItem';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Restaurant Management System</h1>
        <nav>
          {isAuthenticated ? (
            <>
              <Link to="/">Home</Link>
              <Link to="/add-restaurant">Add Restaurant</Link>
              <Link to="/add-item">Add Menu Item</Link>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>

      <main className="App-main">
        <Routes>
          <Route path="/login" element={
            !isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" />
          } />
          <Route path="/register" element={
            !isAuthenticated ? <Register setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" />
          } />
          <Route path="/" element={
            isAuthenticated ? <RestaurantList /> : <Navigate to="/login" />
          } />
          <Route path="/restaurant/:id" element={
            isAuthenticated ? <RestaurantDetail /> : <Navigate to="/login" />
          } />
          <Route path="/add-restaurant" element={
            isAuthenticated ? <AddRestaurant /> : <Navigate to="/login" />
          } />
          <Route path="/add-item" element={
            isAuthenticated ? <AddItem /> : <Navigate to="/login" />
          } />
          <Route path="*" element={
            <Navigate to={isAuthenticated ? "/" : "/login"} />
          } />
        </Routes>
      </main>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}