import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../axios.js';

const AddRestaurant = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        image: '',
        menu: [] 
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [allItems, setAllItems] = useState([]);
    const [menuItemId, setMenuItemId] = useState(''); 

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const fetchMenuItems = async () => {
        try {
            const response = await api.get('/items');
            setAllItems(response.data.data);
        } catch (error) {
            console.error('Error fetching menu items:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleAddMenuItem = (e) => {
        e.preventDefault();
        if (menuItemId && !formData.menu.includes(menuItemId)) {
            setFormData({
                ...formData,
                menu: [...formData.menu, menuItemId]
            });
            setMenuItemId(''); 
        }
    };

    const handleRemoveMenuItem = (idToRemove) => {
        setFormData({
            ...formData,
            menu: formData.menu.filter(id => id !== idToRemove)
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await api.post('/restaurants', formData);
            if (response.data.success) {
                navigate('/');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to add restaurant');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-form-container">
            <h2>Add New Restaurant</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit} className="add-form">
                <div className="form-group">
                    <label htmlFor="name">Restaurant Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="image">Image URL</label>
                    <input
                        type="url"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="menuItem">Add Menu Items</label>
                    <div className="menu-item-input">
                        <select
                            id="menuItem"
                            value={menuItemId}
                            onChange={(e) => setMenuItemId(e.target.value)}
                        >
                            <option value="">Select an item</option>
                            {allItems.map(item => (
                                <option key={item._id} value={item._id}>
                                    {item.name} - ${item.price}
                                </option>
                            ))}
                        </select>
                        <button 
                            type="button" 
                            onClick={handleAddMenuItem}
                            className="add-item-btn"
                        >
                            Add Item
                        </button>
                    </div>
                </div>
                {formData.menu.length > 0 && (
                    <div className="selected-items">
                        <h3>Selected Menu Items:</h3>
                        <ul className="selected-items-list">
                            {formData.menu.map(itemId => {
                                const item = allItems.find(i => i._id === itemId);
                                return (
                                    <li key={itemId}>
                                        {item ? (
                                            <>
                                                {item.name} - ${item.price}
                                                <button 
                                                    type="button"
                                                    onClick={() => handleRemoveMenuItem(itemId)}
                                                    className="remove-item-btn"
                                                >
                                                    ×
                                                </button>
                                            </>
                                        ) : itemId}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}

                <div className="available-items">
                    <h3>Available Menu Items:</h3>
                    <div className="items-grid">
                        {allItems.map(item => (
                            <div key={item._id} className="item-card">
                                <img src={item.image} alt={item.name} />
                                <div className="item-info">
                                    <h4>{item.name}</h4>
                                    <p>${item.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="form-actions">
                    <button type="button" onClick={() => navigate('/')} className="cancel-btn">
                        Cancel
                    </button>
                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Adding...' : 'Add Restaurant'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddRestaurant;