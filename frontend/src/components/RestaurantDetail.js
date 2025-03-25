import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../axios.js';
import './RestaurantDetail.css';

const RestaurantDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [restaurant, setRestaurant] = useState(null);
    const [allItems, setAllItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditingMenu, setIsEditingMenu] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        fetchRestaurantAndItems();
    }, [id]);

    const fetchRestaurantAndItems = async () => {
        try {
            setLoading(true);
            const [restaurantRes, itemsRes] = await Promise.all([
                api.get(`/restaurants/${id}`),
                api.get('/items')
            ]);
            
            setRestaurant(restaurantRes.data.data);
            setAllItems(itemsRes.data.data);
            setSelectedItems(restaurantRes.data.data.menu.map(item => item._id));
        } catch (error) {
            setError('Failed to fetch data');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleItemToggle = (itemId) => {
        setSelectedItems(prev => {
            if (prev.includes(itemId)) {
                return prev.filter(id => id !== itemId);
            } else {
                return [...prev, itemId];
            }
        });
    };

    const handleUpdateMenu = async () => {
        try {
            await api.put(`/restaurants/${id}`, {
                menu: selectedItems
            });
            setIsEditingMenu(false);
            fetchRestaurantAndItems();
        } catch (error) {
            setError('menu updated');
            console.log('Error:', error);
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!restaurant) return <div className="error">Restaurant not found</div>;

    return (
        <div className="restaurant-detail">
            <button onClick={() => navigate('/')} className="back-button">
                ← Back to Restaurants
            </button>

            <div className="restaurant-header">
                <img 
                    src={restaurant.image} 
                    alt={restaurant.name} 
                    className="restaurant-banner"
                />
                <div className="restaurant-info">
                    <h1>{restaurant.name}</h1>
                    <p className="location">{restaurant.location}</p>
                </div>
            </div>

            <div className="menu-section">
                <div className="menu-header">
                    <h2>Menu Items</h2>
                    <button 
                        onClick={() => setIsEditingMenu(!isEditingMenu)}
                        className="edit-menu-btn"
                    >
                        {isEditingMenu ? 'Cancel Editing' : 'Update Menu'}
                    </button>
                </div>

                {isEditingMenu ? (
                    <div className="menu-editor">
                        <div className="available-items">
                            <h3>Available Items</h3>
                            <div className="items-grid">
                                {allItems.map(item => (
                                    <div 
                                        key={item._id} 
                                        className={`item-card ${selectedItems.includes(item._id) ? 'selected' : ''}`}
                                        onClick={() => handleItemToggle(item._id)}
                                    >
                                        <img 
                                            src={item.image} 
                                            alt={item.name} 
                                            className="item-image"
                                        />
                                        <div className="item-info">
                                            <h4>{item.name}</h4>
                                            <p className="price">${item.price}</p>
                                            <div className="selection-indicator">
                                                {selectedItems.includes(item._id) ? '✓' : '+'}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button 
                                onClick={handleUpdateMenu}
                                className="save-menu-btn"
                            >
                                Save Menu Changes
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="menu-grid">
                        {restaurant.menu.map(item => (
                            <div key={item._id} className="menu-item-card">
                                <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="menu-item-image"
                                />
                                <div className="menu-item-details">
                                    <h3>{item.name}</h3>
                                    <p className="price">${item.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RestaurantDetail;