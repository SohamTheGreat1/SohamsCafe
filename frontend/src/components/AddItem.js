import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../axios.js';

const AddItem = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        image: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await api.post('/items', {
                name: formData.name,
                price: Number(formData.price),
                image: formData.image
            });

            if (response.data.success) {
                navigate('/');
            }
        } catch (error) {
            setError('Failed to add item');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-form-container">
            <h2>Add New Menu Item</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit} className="add-form">
                <div className="form-group">
                    <label htmlFor="name">Item Name</label>
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
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        min="0"
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
                <div className="form-actions">
                    <button type="button" onClick={() => navigate('/')} className="cancel-btn">
                        Cancel
                    </button>
                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Adding...' : 'Add Item'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddItem;