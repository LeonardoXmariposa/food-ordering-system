import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const RestaurantMenu = () => {


  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');

  const [AvailableCategories, setAvailableCategories] = useState([]);
  const [restaurant, setRestaurant] = useState();
  const [items, setItems] = useState([]);
  const [visibleItems, setVisibleItems] = useState([])

  useEffect(()=>{
    fetchRestaurant();
    fetchCategories();
    fetchItems();
  },[])
  const fetchCategories = async () =>{
    await axios.get('http://localhost:6001/fetch-categories').then(
      (response)=>{
        setAvailableCategories(response.data);
      }
    )
  }

  const fetchRestaurant = async () =>{
    await axios.get(`http://localhost:6001/fetch-restaurant-details/${userId}`).then(
      (response)=>{
        setRestaurant(response.data);
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



  return (
    <div className="AllRestaurantsPage" style={{marginTop: '14vh'}}>

    <div className="restaurants-container">
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
                              <h6>&#8377; {item.price}</h6>
                              <button className='btn btn-outline-primary' onClick={()=> navigate(`/update-product/${item._id}`)}>Update</button>
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

export default RestaurantMenu