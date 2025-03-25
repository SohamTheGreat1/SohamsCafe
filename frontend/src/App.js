import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RestaurantList from './components/RestaurantList';
import RestaurantDetail from './components/RestaurantDetail';
import AddRestaurant from './components/AddRestaurant';
import AddItem from './components/AddItem';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <h1>Restaurant and Item Management</h1>
                    <p>Find the best restaurants and their delicious items</p>
                </header>
                <main className="App-main">
                    <Routes>
                        <Route path="/" element={<RestaurantList />} />
                        <Route path="/restaurant/:id" element={<RestaurantDetail />} />
                        <Route path="/add-restaurant" element={<AddRestaurant />} />
                        <Route path="/add-item" element={<AddItem />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;