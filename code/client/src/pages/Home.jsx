import React, { useEffect, useState } from 'react'
import '../styles/Home.css'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import PopularRestaurants from '../components/PopularRestaurants'
import axios from 'axios'

const Home = () => {

  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState([]);

    useEffect(()=>{
        fetchRestaurants();
      }, [])

    const fetchRestaurants = async() =>{
        await axios.get('http://localhost:6001/fetch-restaurants').then(
          (response)=>{
            setRestaurants(response.data);
          }
        )
      }

  return (
    <div className="HomePage">

      <div className="home-categories-container">

        <div className="home-category-card" onClick={()=>navigate('/category/Breakfast')}>
          <img src="https://www.lacademie.com/wp-content/uploads/2022/03/indian-breakfast-recipes-500x500.jpg" alt="" />
          <h5>Breakfast</h5>
        </div>

        <div className="home-category-card" onClick={()=>navigate('/category/Biriyani')}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4-VXaTJIkc6rk02DU8r7r9zR-KaeWvH1oKA&usqp=CAU" alt="" />
          <h5>Biriyani</h5>
        </div>

        <div className="home-category-card" onClick={()=>navigate('/category/Pizza')}>
          <img src="https://images.unsplash.com/photo-1628840042765-356cda07504e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTh8fHxlbnwwfHx8fHw%3D&w=1000&q=80" alt="" />
          <h5>Pizza</h5>
        </div>

        <div className="home-category-card" onClick={()=>navigate('/category/Noodles')}>
          <img src="https://www.licious.in/blog/wp-content/uploads/2022/12/Shutterstock_2176816723.jpg" alt="" />
          <h5>Noodles</h5>
        </div>

        <div className="home-category-card" onClick={()=>navigate('/category/Burger')}>
          <img src="https://blogger.googleusercontent.com/img/a/AVvXsEg6esycartoFpA9-3XiXM9WnqI73TjG8TqtCKV1TgAX-V3domquSYAWN65_sR7cD-wJxr5jHP0mq1hVnYcqW9QmjUBfAEtnkIOEluv7hIS03yqd9VP-Cu_IVrjxh9JZlyVLo-9sY7rC8y3VaZ8nfPe2Rx-6gMWh0lTq8_RhFijO3Brw0gEQpFuF13ONJEY" alt="" />
          <h5>Burger</h5>
        </div>

      </div>


      <PopularRestaurants />

      


      <div className="restaurants-container">
        <div className="restaurants-body">
            <h3>All restaurants</h3>
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

export default Home