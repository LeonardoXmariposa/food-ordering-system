import React, { useEffect, useState } from 'react'
import '../../styles/RestaurantHome.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RestaurantHome = () => {

  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const [restaurant, setRestaurant] = useState('pending');

  useEffect(()=>{
      fetchUserData();
  },[])
 
  const fetchUserData = async () =>{
    await axios.get(`http://localhost:6001/fetch-user-details/${userId}`).then(
      (response) =>{
        setRestaurant(response.data);
        console.log(response.data._id);
      }
    )
  }

  const [ItemsCount, setItemsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);
  const [restaurantData, setRestaurantData] = useState();

  useEffect(()=>{
    fetchRestaurantData();
  }, [])



  const fetchRestaurantData = async () =>{
    await axios.get(`http://localhost:6001/fetch-restaurant-details/${userId}`).then(
      (response) =>{
        setRestaurantData(response.data);
        console.log(response.data)
      }
    )
  }

  useEffect(()=>{
    if(restaurantData){
      fetchItems();
      fetchOrders();
    }
  },[restaurantData])

  const fetchItems = async() =>{
    await axios.get('http://localhost:6001/fetch-items').then(
      (response)=>{
        setItemsCount(response.data.filter(item=> item.restaurantId === restaurantData._id).length);

      }
    )
  }

  const fetchOrders = async() =>{
    await axios.get('http://localhost:6001/fetch-orders').then(
      (response)=>{
        setOrdersCount(response.data.filter(item=> item.restaurantId === restaurantData._id).length);
      }
    )
  }

  return (
    <div className="restaurantHome-page">

      {restaurant.approval === 'pending' ?
      
        <div className="restaurant-approval-required">
          <h3>Approval required!!</h3>
          <p>You need to get approval from the admin to make this work. Please be patient!!!</p>
        </div>
      : 
        <>
          <div>
            <div className="admin-home-card">
              <h5>All Items</h5>
              <p>{ItemsCount}</p>
              <button onClick={()=> navigate('/restaurant-menu')}>View all</button>
            </div>
          </div>

          <div>
            <div className="admin-home-card">
              <h5>All Orders</h5>
              <p>{ordersCount}</p>
              <button onClick={()=> navigate('/restaurant-orders')}>View all</button>
            </div>
          </div>

          <div>
            <div className="admin-home-card">
              <h5>Add Item</h5>
              <p>(new)</p>
              <button onClick={()=> navigate('/new-product')}>Add now</button>
            </div>
          </div>
        </>
      }

      

    </div>
  )
}

export default RestaurantHome