import React, { useEffect, useState } from 'react'
import '../../styles/Admin.css'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

const Admin = () => {

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [ordersCount, setOrdersCount] = useState(0);

  useEffect(()=>{
    fetchUsers();
    fetchRestaurants();
    fetchOrders();
    fetchPromotions();
  }, [])

  const fetchUsers = async() =>{
    await axios.get('http://localhost:6001/fetch-users').then(
      (response)=>{
        setUsers(response.data);
        
      }
    )
  }

  const fetchRestaurants = async() =>{
    await axios.get('http://localhost:6001/fetch-restaurants').then(
      (response)=>{
        setRestaurants(response.data);
        
      }
    )
  }

  const fetchOrders = async() =>{
    await axios.get('http://localhost:6001/fetch-orders').then(
      (response)=>{
        setOrdersCount(response.data.length);
        
      }
    )
  }

  const approveUser = async(id) =>{
    await axios.post('http://localhost:6001/approve-user', {id}).then(
      (response)=>{
        alert('Restaurant approved!');
        fetchUsers();
      }
    )
  }

  const rejectUser = async(id) =>{
    await axios.post('http://localhost:6001/reject-user', {id}).then(
      (response)=>{
        alert('Restaurant Rejected!');
        fetchUsers();
      }
    )
  }

  const [promoteList, setPromoteList] = useState([])

  const handlePromoteCheckBox = (e) =>{
    const value = e.target.value;
    if(e.target.checked){
        setPromoteList([...promoteList, value]);
    }else{
        setPromoteList(promoteList.filter(size=> size !== value));
    }
  }

  const handlePromoteUpdate = async() =>{
    await axios.post('http://localhost:6001/update-promote-list', {promoteList}).then(
      (response) =>{
        alert('promote list updated!!')
      }
    )
  }

  const fetchPromotions = async () =>{
    await axios.get('http://localhost:6001/fetch-promoted-list').then(
      (response)=>{
        setPromoteList(response.data);
      }
    )
  }

  return (
    <div className="admin-page">

      <div>
        <div className="admin-home-card">
          <h5>Total users</h5>
          <p>{users.length - 1}</p>
          <button onClick={()=> navigate('/all-users')}>View all</button>
        </div>
      </div>
      
      <div>
        <div className="admin-home-card">
          <h5>All Restaurants</h5>
          <p>{restaurants.length}</p>
          <button onClick={()=> navigate('/all-restaurants')}>View all</button>
        </div>
      </div>

      <div>
        <div className="admin-home-card">
          <h5>All Orders</h5>
          <p>{ordersCount}</p>
          <button onClick={()=> navigate('/all-orders')}>View all</button>
        </div>
      </div>


      


          <div className="admin-promotions-input">
            <h5>Popular Restaurants(promotions)</h5>
            <div className="promotion-restaurant-list">

              {restaurants.map((restaurant)=>{
                return(

                  <div className="form-check" key={restaurant._id}>
                    <input className="form-check-input" type="checkbox" value={restaurant._id} checked={promoteList.includes(restaurant._id)} id="promotionRestaurantCheck1" onChange={handlePromoteCheckBox} />
                    <label className="form-check-label" htmlFor="promotionRestaurantCheck1">
                      {restaurant.title}
                    </label>
                  </div>
                )
              })}
              

            </div>
            <button onClick={handlePromoteUpdate}>Update</button>
          </div>


          <div className=" admin-approval-container">
            <h5>Approvals</h5>
            <div className="approval-restaurant-list">

              {users.filter(user=> user.approval === 'pending').length === 0 ?
              
              <p>No new requests...</p>
              :
              ""}
              
              {users.filter(user=> user.approval === 'pending').map((user)=>{
                return(
                  <div className="approval-request" key={user._id}>
     
                    <span>
                      <h5>Restaurant</h5>
                      <p>{user.username}</p>
                    </span>
                    <div>
                      <button className="btn btn-outline-primary" onClick={()=> approveUser(user._id)}>Approve</button>
                      <button className="btn btn-outline-danger" onClick={()=> rejectUser(user._id)}>Reject</button>
                    </div>
                  </div>
                )
              })}

              

              
              
            </div>
          </div>
      
    </div>
  )
}

export default Admin