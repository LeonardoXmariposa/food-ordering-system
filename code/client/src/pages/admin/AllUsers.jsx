import React, { useEffect, useState } from 'react'
import '../../styles/AllUsers.css'
import axios from 'axios';

const AllUsers = () => {

  const [users, setUsers] = useState([]);

  useEffect(()=>{
    fetchUsers();
  }, [])

  const fetchUsers = async() =>{
    await axios.get('http://localhost:6001/fetch-users').then(
      (response)=>{
        setUsers(response.data);
        
      }
    )
  }

  return (
    <div className="all-users-page">
      <h3>All Users</h3>

      <div className="user-cards">

        {users.filter(user=> user.usertype !== 'admin').map((user)=>{
          return(
            <div className="user-card">
              <span>
                <h5>User Id </h5>
                <p>{user._id}</p>
              </span>
              <span>
                <h5>User Name </h5>
                <p>{user.username}</p>
              </span>
              <span>
                <h5>Email Address </h5>
                <p>{user.email}</p>
              </span>
              <span>
                <h5>User Type </h5>
                <p>{user.usertype}</p>
              </span>
            </div>
          )
        })}
        

      </div>

    </div>
  )
}

export default AllUsers