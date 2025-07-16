import React, { useEffect, useState } from 'react'
import '../../styles/AllOrders.css'
import axios from 'axios';

const AllOrders = () => {

  const [orders, setOrders] = useState([]);
  
  const [updateStatus, setUpdateStatus] = useState('');


  useEffect(()=>{
    fetchOrders();
  },[])

  const fetchOrders = async() =>{
    await axios.get('http://localhost:6001/fetch-orders').then(
      (response)=>{
        setOrders(response.data.reverse());
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

  const updateOrderStatus = async(id) =>{
    await axios.put('http://localhost:6001/update-order-status', {id, updateStatus}).then(
      (response)=>{
        alert("Order status updated!!");
        setUpdateStatus('');
        fetchOrders();
      }
    ).catch((err)=>{
      alert("Order update failed!!");
    })
  }

  return (
    <div className="all-orders-page">
        <h3>Orders</h3>

        <div className="all-orders">

            {orders.map((order)=>(
              <div className="all-orders-order" key={order._id}>
              <img src={order.foodItemImg} alt="" />
              <div className="all-orders-order-data">
                <h4>{order.foodItemName}</h4>
                <p>{order.restaurantName}</p>
                <div>
                  <span><p><b>UserId: </b> {order.userId} </p></span>
                  <span><p><b>Name: </b> {order.name}</p></span>
                  <span><p><b>Mobile: </b> {order.mobile}</p></span>
                  <span><p><b>Email: </b> {order.email}</p></span>
                </div>
                <div>
                  <span><p><b>Quantity: </b> {order.quantity}</p></span>
                  <span><p><b>Total Price: </b> &#8377; {parseInt(order.price - (order.price*order.discount)/100) * order.quantity} <s>&#8377; {order.price * order.quantity}</s> </p></span>
                  <span><p><b>Payment mode: </b> {order.paymentMethod}</p></span>
                </div>
                <div>
                  <span><p><b>Address: </b> {order.address}</p></span>
                  <span><p><b>Pincode: </b> {order.pincode}</p></span>
                  <span><p><b>Ordered on: </b> {order.orderDate.slice(0,10)} Time: {order.orderDate.slice(11,16)}</p></span>
                </div>
                <div>
                  <span><p><b>status: </b> {order.orderStatus}</p></span>
                </div>
                

                  {order.orderStatus === 'order placed' || order.orderStatus === 'In-transit' ?

                    <div>

                      <span>
                        <div >
                          <select class="form-select form-select-sm" id='flotingSelect-allOrders' onChange={(e)=> setUpdateStatus(e.target.value)}>
                            <option selected disabled>Update order status</option>
                            <option value="order placed">Order Accepted</option>
                            <option value="In-transit">In-transit</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        </div>
                        <button className='btn btn-primary' onClick={()=> updateOrderStatus(order._id)}>Update</button>
                      </span>

                      <button className="btn btn-outline-danger" onClick={()=> cancelOrder(order._id)}>Cancel</button>
                    
                    </div>
                  :
                  ""}
              </div>
            </div>
            ))}


            



        </div>

    </div>
  )
}

export default AllOrders