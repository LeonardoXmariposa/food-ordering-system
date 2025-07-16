import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/Restaurants.css';

const AdminRestaurantDashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState(null);
  const [itemsCount, setItemsCount] = useState(0);
  const [items, setItems] = useState([]);
  const [ordersCount, setOrdersCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      const restaurantRes = await axios.get(`http://localhost:6001/fetch-restaurant/${id}`);
      setRestaurant(restaurantRes.data);

      const itemsRes = await axios.get('http://localhost:6001/fetch-items');
      const filteredItems = itemsRes.data.filter(item => item.restaurantId === id);
      setItemsCount(filteredItems.length);
      setItems(filteredItems);

      const ordersRes = await axios.get('http://localhost:6001/fetch-orders');
      const filteredOrders = ordersRes.data.filter(order => order.restaurantId === id);
      setOrdersCount(filteredOrders.length);

      setLoading(false);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data.');
      setLoading(false);
    }
  };

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!restaurant) return <div>No restaurant data found.</div>;

  return (
    <div className="admin-restaurant-dashboard" style={{ marginTop: '14vh', padding: '20px', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto', backgroundColor: '#222831', borderRadius: '8px', color: '#eeeeee' }}>
      <h2>{restaurant.title} - Dashboard</h2>
      <img src={restaurant.mainImg} alt={restaurant.title} style={{ maxWidth: '100%', borderRadius: '8px', marginBottom: '20px' }} />
      <p><strong>Address:</strong> {restaurant.address}</p>
      <p><strong>Description:</strong> {restaurant.description || 'No description provided.'}</p>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '30px' }}>
        <div>
          <h3>Items</h3>
          <p>{itemsCount}</p>
        </div>
        <div>
          <h3>Orders</h3>
          <p>{ordersCount}</p>
        </div>
      </div>
      <div style={{ marginTop: '30px' }}>
        <h3>Products</h3>
        {itemsCount === 0 ? (
          <p>No products found.</p>
        ) : (
          <ul style={{ maxHeight: '200px', overflowY: 'auto', paddingLeft: '20px' }}>
            {items.map(item => (
              <li key={item._id} style={{ marginBottom: '8px' }}>
                <strong>{item.title}</strong> - &#8377;{item.price}
              </li>
            ))}
          </ul>
        )}
      </div>
      <button onClick={() => navigate('/admin/all-restaurants')} style={{ marginTop: '30px', padding: '10px 20px', backgroundColor: '#00adb5', border: 'none', borderRadius: '4px', color: '#eeeeee', cursor: 'pointer' }}>
        Back to All Restaurants
      </button>
    </div>
  );
};

export default AdminRestaurantDashboard;
