import React, { useContext, useEffect, useState } from 'react'
import '../../styles/IndividualRestaurant.css'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContext';

const IndividualRestaurant = () => {


  const {fetchCartCount} = useContext(GeneralContext);

    



  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');

  const {id} = useParams();
  const [restaurant, setRestaurant] = useState();

  const [AvailableCategories, setAvailableCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [visibleItems, setVisibleItems] = useState([])

  useEffect(()=>{
    fetchCategories();
    fetchItems();
    fetchRestaurants();
  },[])

  const fetchRestaurants = async() =>{
    await axios.get(`http://localhost:6001/fetch-restaurant/${id}`).then(
      (response)=>{
        setRestaurant(response.data);
        console.log(response.data)
      }
    ).catch((err)=>{
        console.log(err);
    })
  }

  const fetchCategories = async () =>{
    await axios.get('http://localhost:6001/fetch-categories').then(
      (response)=>{
        setAvailableCategories(response.data);
      }
    )
  }

  const fetchItems = async () =>{
    await axios.get(`http://localhost:6001/fetch-items`).then(
      (response)=>{
        setItems(response.data);
        setVisibleItems(response.data);
      }
    )
  }

  const [sortFilter, setSortFilter] = useState('popularity');
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [typeFilter, settypeFilter] = useState([]);

  const handleCategoryCheckBox = (e) =>{
    const value = e.target.value;
    if(e.target.checked){
        setCategoryFilter([...categoryFilter, value]);
    }else{
        setCategoryFilter(categoryFilter.filter(size=> size !== value));
    }
  }

  const handleTypeCheckBox = (e) =>{
    const value = e.target.value;
    if(e.target.checked){
        settypeFilter([...typeFilter, value]);
    }else{
        settypeFilter(typeFilter.filter(size=> size !== value));
    }
  }

  const handleSortFilterChange = (e) =>{
    const value = e.target.value;
    setSortFilter(value);
    if(value === 'low-price'){
        setVisibleItems(visibleItems.sort((a,b)=>  a.price - b.price))
    } else if (value === 'high-price'){
        setVisibleItems(visibleItems.sort((a,b)=>  b.price - a.price))
    }else if (value === 'discount'){
        setVisibleItems(visibleItems.sort((a,b)=>  b.discount - a.discount))
    }else if (value === 'rating'){
      setVisibleItems(visibleItems.sort((a,b)=>  b.rating - a.rating))
    }
  }

  useEffect(()=>{
    if (categoryFilter.length > 0 && typeFilter.length > 0){
        setVisibleItems(items.filter(product=> categoryFilter.includes(product.menuCategory) && typeFilter.includes(product.category) ));
    }else if(categoryFilter.length === 0 && typeFilter.length > 0){
        setVisibleItems(items.filter(product=> typeFilter.includes(product.category) ));
    } else if(categoryFilter.length > 0 && typeFilter.length === 0){
        setVisibleItems(items.filter(product=> categoryFilter.includes(product.menuCategory)));
    }else{
        setVisibleItems(items);
    }
  }, [categoryFilter, typeFilter])


  const [cartItem, setCartItem] = useState('');

  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = async(foodItemId, foodItemName, restaurantId, foodItemImg, price, discount) =>{
    await axios.post('http://localhost:6001/add-to-cart', {userId, foodItemId, foodItemName, restaurantId, foodItemImg, price, discount, quantity}).then(
        (response)=>{
            alert("product added to cart!!");
            setCartItem('');
            setQuantity(0);
            fetchCartCount();
        }
    ).catch((err)=>{
        alert("Operation failed!!");
    })
}


  return (
    <div className="IndividualRestaurant-page">
        {
            restaurant ?

            <>
                    <h2>{restaurant ? restaurant.title : ""}</h2>
                    <p>{restaurant ? restaurant.address : ""}</p>


                <div className="IndividualRestaurant-body">
                <div className="restaurants-filter">
                    <h4>Filters</h4>
                    <div className="restaurant-filters-body">

                        <div className="filter-sort">
                            <h6>Sort By</h6>
                            <div className="filter-sort-body sub-filter-body">

                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="filter-sort-radio1" value="popularity" onChange={handleSortFilterChange} />
                                    <label class="form-check-label" for="filter-sort-radio1" >
                                        Popularity
                                    </label>
                                </div>

                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="filter-sort-radio4" value="low-price" onChange={handleSortFilterChange} />
                                    <label class="form-check-label" for="filter-sort-radio4">
                                        low-price
                                    </label>
                                </div>

                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="filter-sort-radio4" value="high-price" onChange={handleSortFilterChange} />
                                    <label class="form-check-label" for="filter-sort-radio4">
                                        high-price
                                    </label>
                                </div>

                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="filter-sort-radio4" value="discount" onChange={handleSortFilterChange} />
                                    <label class="form-check-label" for="filter-sort-radio4">
                                        Discount
                                    </label>
                                </div>

                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="filter-sort-radio4" value="rating" onChange={handleSortFilterChange} />
                                    <label class="form-check-label" for="filter-sort-radio4">
                                        Rating
                                    </label>
                                </div>

                            </div>
                        </div>

                        <div className="filter-categories">
                            <h6>Food Type</h6>
                            <div className="filter-categories-body sub-filter-body">

                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="Veg" id="filter-category-check-1" checked={typeFilter.includes('Veg')} onChange={handleTypeCheckBox} />
                                    <label class="form-check-label" for="filter-category-check-1">
                                        Veg
                                    </label>
                                </div>

                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="Non Veg" id="filter-category-check-1" checked={typeFilter.includes('Non Veg')} onChange={handleTypeCheckBox} />
                                    <label class="form-check-label" for="filter-category-check-1">
                                        Non Veg
                                    </label>
                                </div>

                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="Beverages" id="filter-category-check-1" checked={typeFilter.includes('Beverages')} onChange={handleTypeCheckBox} />
                                    <label class="form-check-label" for="filter-category-check-1">
                                        Beverages
                                    </label>
                                </div>

                            </div>
                        </div>

                        <div className="filter-categories">
                            <h6>Categories</h6>
                            <div className="filter-categories-body sub-filter-body">

                            {AvailableCategories.map((category)=>(
                                <div class="form-check" key={category}>
                                    <input class="form-check-input" type="checkbox" value={category} id="filter-category-check-1" checked={categoryFilter.includes(category)} onChange={handleCategoryCheckBox} />
                                    <label class="form-check-label" for="filter-category-check-1">
                                        {category}
                                    </label>
                                </div>
                            ))}
                            </div>
                        </div>
                    
                    </div>
                </div>


                <div className="restaurants-body">
                    <h3>All Items</h3>
                    <div className="restaurants">
                        {visibleItems.filter(item=> item.restaurantId === restaurant._id).map((item)=>(

                        <div className='restaurant-item' key={item._id}>
                            <div className="restaurant">
                                <img src={item.itemImg} alt="" />
                                <div className="restaurant-data">
                                    <h6>{item.title}</h6>
                                    <p>{item.description.slice(0,25) + '...'}</p>
                                    <h6>&#8377; {parseInt(item.price - (item.price*item.discount)/100)} <s>{item.price}</s></h6>
                                    {cartItem === item._id ?
                                        <>
                                            <input type="number" name="" id="" style={{width: '60px', margin: '10px 0', fontSize: '0.7rem'}}  placeholder='count' onChange={(e)=> setQuantity(e.target.value)} /><br />
                                            <button className='btn btn-outline-primary' onClick={()=> handleAddToCart(item._id, item.title, item.restaurantId, item.itemImg, item.price, item.discount)} >Add to cart</button>
                                        </>
                                        :
                                        
                                        <button className='btn btn-outline-primary' onClick={()=> setCartItem(item._id)} >Add item</button>
                                    }
                                </div>
                            </div>
                        </div>
                        ))}




                    </div>
                </div>
                </div>
            </>

            :

            <p>No data found</p>

        }

    </div>
  )
}

export default IndividualRestaurant