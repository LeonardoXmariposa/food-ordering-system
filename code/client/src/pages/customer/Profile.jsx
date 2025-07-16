import React, { useContext, useEffect, useState } from 'react'
import '../../styles/Profile.css'
import {AiFillStar} from 'react-icons/ai' 
import { GeneralContext } from '../../context/GeneralContext'
import axios from 'axios'

const Profile = () => {

  const {logout} = useContext(GeneralContext);

  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');
  const email = localStorage.getItem('email');

  const [orders, setOrders] = useState([]);

  useEffect(()=>{
    fetchOrders();
  },[])

  const fetchOrders = async() =>{
    await axios.get('http://localhost:6001/fetch-orders').then(
      (response)=>{
        setOrders(response.data.filter(order=> order.userId === userId).reverse());
      }
    )
  }

  const cancelOrder = async(id) =>{
    await axios.put('http://localhost:6001/cancel-order', {id}).then(
      (response)=>{
        alert('order cancelled!!');
        fetchOrders();
      }
    )
  }

  return ( 
    <div className="profilePage">
      
      <div className="profileCard">

          <span>
            <h5>Username: </h5>
            <p>{username}</p>
          </span>
          <span>
            <h5>Email: </h5>
            <p>{email}</p>
          </span>
          <span>
            <h5>Orders: </h5>
            <p>{orders.length}</p>
          </span>
          <button className='btn btn-danger' onClick={()=> logout()}>Logout</button>

      </div>

      <div className="profileOrders-container">
        <h3>Orders</h3>
        <div className="profileOrders">

          {orders.map((order)=>(

            <div className="profileOrder" key={order._id}>
              <img src={order.foodItemImg} alt="" />
              <div className="profileOrder-data">
                <h4>{order.foodItemName}</h4>
                <p>{order.restaurantName}</p>
                <div>
                  <span><p><b>Quantity: </b> {order.quantity}</p></span>
                  <span><p><b>Total Price: </b> &#8377; {parseInt(order.price - (order.price*order.discount)/100) * order.quantity} <s>&#8377; {order.price * order.quantity}</s> </p></span>
                  <span><p><b>Payment mode: </b> {order.paymentMethod}</p></span>
                </div>
                <div>
                  <span><p><b>Ordered on: </b> {order.orderDate.slice(0,10)} Time: {order.orderDate.slice(11,16)}</p></span>
                  <span><p><b>status: </b> {order.orderStatus}</p></span>
                </div>
                {order.orderStatus === 'order placed' || order.orderStatus === 'In-transit' ?
                  <button className="btn btn-outline-danger" onClick={()=> cancelOrder(order._id)}>Cancel</button>
                :
                ""}
              </div>
            </div>
          ))}


            

        </div>
      </div>

    </div>
  )
}

export default Profile