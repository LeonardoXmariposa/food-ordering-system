import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import Restaurants from '../../components/Restaurants'
import '../../styles/CategoryProducts.css'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const CategoryProducts = () => {

  const navigate = useNavigate();

  const {category} = useParams();

  const [restaurants, setRestaurants] = useState([]);

    useEffect(()=>{
        fetchRestaurants();
      }, [])

    const fetchRestaurants = async() =>{
        await axios.get('http://localhost:6001/fetch-restaurants').then(
          (response)=>{
            setRestaurants(response.data.filter(restaurant=> restaurant.menu.includes(category)));
          }
        )
      }


  return (
    <div className="categoryProducts-page">

    <h2>Restaurants Serving {category}</h2>

    
    <div className="restaurants-container">
        <div className="restaurants-body">
            <h3></h3>
            <div className="restaurants">

                {restaurants.map((restaurant) =>(

                  <div className='restaurant-item' key={restaurant._id}>
                      <div className="restaurant" onClick={()=> navigate(`/restaurant/${restaurant._id}`)}>
                          <img src={restaurant.mainImg} alt="" />
                          <div className="restaurant-data">
                              <h6>{restaurant.title}</h6>
                              <p>{restaurant.address}</p>
                          </div>
                      </div>
                  </div>
                ))}

 
            </div>
        </div>
    </div>



    <Footer />
    </div>
  )
}

export default CategoryProducts