import React, { useEffect, useState } from 'react';
import api from '../axios.js';
import './ItemList.css';

const ItemList = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            setLoading(true);
            const response = await api.get('/items');
            setItems(response.data.data);
            setError(null);
        } catch (error) {
            setError('Failed to fetch items. Please try again later.');
            console.error('Error fetching items:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="loading">Loading items...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="items-container">
            <h2>Menu Items</h2>
            {items.length === 0 ? (
                <p>No items available</p>
            ) : (
                <div className="items-grid">
                    {items.map(item => (
                        <div key={item._id} className="item-card">
                            <img src={item.image} alt={item.name} className="item-image" />
                            <div className="item-details">
                                <h3>{item.name}</h3>
                                <p className="price">${item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ItemList;