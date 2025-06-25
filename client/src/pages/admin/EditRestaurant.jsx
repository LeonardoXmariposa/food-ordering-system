import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/Restaurants.css';

const EditRestaurant = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState({
    title: '',
    address: '',
    mainImg: '',
    description: '',
    pictureUrl: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRestaurantDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchRestaurantDetails = async () => {
    try {
      console.log('Fetching restaurant details for id:', id);
      const response = await axios.get(`http://localhost:6001/fetch-restaurant/${id}`);
      console.log('Response data:', response.data);
      setRestaurant((prev) => ({
        ...prev,
        title: response.data.title || '',
        address: response.data.address || '',
        mainImg: response.data.mainImg || '',
        description: response.data.description || '',
        pictureUrl: response.data.pictureUrl || '',
      }));
      setLoading(false);
    } catch (err) {
      console.error('Error fetching restaurant details:', err);
      setError('Failed to fetch restaurant details.');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setRestaurant({
      ...restaurant,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:6001/update-restaurant/${id}`, restaurant);
      alert('Restaurant details updated successfully.');
      navigate('/all-restaurants'); // Redirect to all restaurants page after update
    } catch (err) {
      console.error('Update restaurant error:', err.response || err.message || err);
      alert('Failed to update restaurant details.');
    }
  };

  if (loading) {
    return <div>Loading restaurant details...</div>;
  }

  if (error) {
    return <div style={{color: 'red'}}>{error}</div>;
  }

  return (
    <div className="new-product-page" style={{ marginTop: '14vh', backgroundColor: '#222831', minHeight: '80vh', padding: '20px', borderRadius: '8px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
      <h3 style={{ color: '#eeeeee', marginBottom: '20px' }}>Edit Restaurant Details</h3>
      <form onSubmit={handleSubmit} className="new-product-form">
        <div className="form-group">
          <label htmlFor="title" style={{ color: '#eeeeee' }}>Restaurant Name:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={restaurant.title}
            onChange={handleChange}
            required
            className="input-field"
            style={{ backgroundColor: '#393e46', color: '#eeeeee', border: 'none', padding: '10px', borderRadius: '4px', width: '100%' }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address" style={{ color: '#eeeeee' }}>Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={restaurant.address}
            onChange={handleChange}
            required
            className="input-field"
            style={{ backgroundColor: '#393e46', color: '#eeeeee', border: 'none', padding: '10px', borderRadius: '4px', width: '100%' }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" style={{ color: '#eeeeee' }}>Description:</label>
          <textarea
            id="description"
            name="description"
            value={restaurant.description || ''}
            onChange={handleChange}
            rows="4"
            className="input-field"
            style={{ backgroundColor: '#393e46', color: '#eeeeee', border: 'none', padding: '10px', borderRadius: '4px', width: '100%' }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="mainImg" style={{ color: '#eeeeee' }}>Image URL or Upload Image:</label>
          <input
            type="text"
            id="mainImg"
            name="mainImg"
            value={restaurant.mainImg}
            onChange={handleChange}
            placeholder="Enter image URL or upload below"
            className="input-field"
            style={{ backgroundColor: '#393e46', color: '#eeeeee', border: 'none', padding: '10px', borderRadius: '4px', width: '100%', marginBottom: '10px' }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setRestaurant(prev => ({ ...prev, mainImg: reader.result }));
                };
                reader.readAsDataURL(file);
              }
            }}
            className="input-field"
            style={{ backgroundColor: '#393e46', color: '#eeeeee', border: 'none', padding: '10px', borderRadius: '4px', width: '100%' }}
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#00adb5', border: 'none', padding: '10px 20px', borderRadius: '4px', color: '#eeeeee', cursor: 'pointer', marginTop: '10px' }}>Update Restaurant</button>
      </form>
      <hr style={{ margin: '20px 0', borderColor: '#393e46' }} />
      <div>
        <h4 style={{ color: '#eeeeee' }}>Delete Restaurant</h4>
        <button
          onClick={async () => {
            if (window.confirm('Are you sure you want to delete this restaurant? This action cannot be undone.')) {
              try {
                await fetch(`http://localhost:6001/delete-restaurant/${id}`, { method: 'DELETE' });
                alert('Restaurant deleted successfully.');
                navigate('/all-restaurants');
              } catch (error) {
                alert('Failed to delete restaurant.');
              }
            }
          }}
          style={{ backgroundColor: '#ff4d4d', border: 'none', padding: '10px 20px', borderRadius: '4px', color: '#eeeeee', cursor: 'pointer' }}
        >
          Delete Restaurant
        </button>
      </div>
    </div>
  );
};

export default EditRestaurant;
