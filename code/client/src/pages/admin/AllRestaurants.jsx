import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../../styles/Restaurants.css'
import axios from 'axios';

const AllRestaurants = () => {
    const navigate = useNavigate();

    const [restaurants, setRestaurants] = useState([]);

    useEffect(()=>{
        fetchRestaurants();
      }, [])

    const fetchRestaurants = async()=>{
        await axios.get('http://localhost:6001/fetch-restaurants').then(
          (response)=>{
            setRestaurants(response.data);
          }
        )
      }

    const handleDelete = async (id) => {
        if(window.confirm('Are you sure you want to delete this restaurant?')){
            try{
                await axios.delete(`http://localhost:6001/api/delete-restaurant/${id}`);
                fetchRestaurants();
            }catch(error){
                console.error('Error deleting restaurant:', error);
                alert('Failed to delete restaurant');
            }
        }
    }

  return (
    <div className="AllRestaurantsPage" style={{marginTop: '14vh'}}>

    <div className="restaurants-container">
 
        <div className="restaurants-body">
            <h3>All restaurants</h3>
            <div className="restaurants">

{restaurants.map((restaurant) =>(

    <div className='restaurant-item' key={restaurant._id} style={{border: '1px solid #ccc', borderRadius: '8px', padding: '15px', marginBottom: '20px', maxWidth: '400px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', backgroundColor: '#f9f9f9'}}>
        <div className="restaurant" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <img src={restaurant.mainImg} alt="" style={{width: '180px', height: '135px', objectFit: 'cover', borderRadius: '8px', marginBottom: '15px'}} />
            <div className="restaurant-data" style={{textAlign: 'center'}}>
                <h6 style={{margin: '0 0 8px 0', fontSize: '1.2rem', color: '#333'}}>{restaurant.title}</h6>
                <p style={{margin: '0 0 12px 0', color: '#666'}}>{restaurant.address}</p>
                <div>
                    <button onClick={() => navigate(`/admin/edit-restaurant/${restaurant._id}`)} style={{marginRight: '10px', padding: '6px 12px', borderRadius: '4px', border: '1px solid #007bff', backgroundColor: '#007bff', color: 'white', cursor: 'pointer'}}>Edit</button>
                    <button onClick={() => navigate(`/admin/restaurant-dashboard/${restaurant._id}`)} style={{marginRight: '10px', padding: '6px 12px', borderRadius: '4px', border: '1px solid #17a2b8', backgroundColor: '#17a2b8', color: 'white', cursor: 'pointer'}}>View Dashboard</button>
                    <button onClick={() => handleDelete(restaurant._id)} style={{padding: '6px 12px', borderRadius: '4px', border: '1px solid #dc3545', backgroundColor: '#dc3545', color: 'white', cursor: 'pointer'}}>Delete</button>
                </div>
            </div>
        </div>
    </div>
))}

            </div>
        </div>
    </div>
    </div>
  )
}

export default AllRestaurants
