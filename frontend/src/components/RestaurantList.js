import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../axios.js';
import './RestaurantList.css';

const RestaurantList = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const fetchRestaurants = async () => {
        try {
            setLoading(true);
            const response = await api.get('/restaurants');
            setRestaurants(response.data.data);
        } catch (error) {
            setError('Failed to fetch restaurants');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddRestaurant = () => {
        navigate('/add-restaurant');
    };

    const handleAddMenuItem = () => {
        navigate('/add-item');
    };

    if (loading) return <div className="loading">Loading restaurants...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="restaurants-page">
            <div className="restaurants-header">
                <h2>Our Restaurants</h2>
                <div className="action-buttons">
                    <button onClick={handleAddRestaurant} className="add-button">
                        Add Restaurant
                    </button>
                    <button onClick={handleAddMenuItem} className="add-button">
                        Add Menu Item
                    </button>
                </div>
            </div>

            <div className="restaurants-grid">
                {restaurants.length === 0 ? (
                    <p className="no-data">No restaurants available</p>
                ) : (
                    restaurants.map(restaurant => (
                        <div 
                            key={restaurant._id} 
                            className="restaurant-card"
                            onClick={() => navigate(`/restaurant/${restaurant._id}`)}
                        >
                            <div className="restaurant-image-container">
                                <img 
                                    src={restaurant.image} 
                                    alt={restaurant.name}
                                    className="restaurant-image"
                                />
                            </div>
                            <div className="restaurant-info">
                                <h3>{restaurant.name}</h3>
                                <p className="location">{restaurant.location}</p>
                                <p className="menu-count">
                                    Menu Items: {restaurant.menu?.length || 0}
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default RestaurantList;