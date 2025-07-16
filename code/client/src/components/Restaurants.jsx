import React from 'react'
import '../styles/Restaurants.css'

const Restaurants = () => {
  return (
    <div className="restaurants-container">
        <div className="restaurants-filter">
            <h4>Filters</h4>
            <div className="restaurant-filters-body">

                <div className="filter-sort">
                    <h6>Sort By</h6>
                    <div className="filter-sort-body sub-filter-body">

                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="filter-sort-radio1" />
                            <label className="form-check-label" htmlFor="filter-sort-radio1" >
                                Popularity
                            </label>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id="filter-sort-radio4" />
                            <label className="form-check-label" htmlFor="filter-sort-radio4">
                                Rating
                            </label>
                        </div>

                    </div>
                </div>
                <div className="filter-categories">
                    <h6>Categories</h6>
                    <div className="filter-categories-body sub-filter-body">

                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="filter-category-check-1" />
                            <label className="form-check-label" htmlFor="filter-category-check-1">
                                South Indian
                            </label>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="filter-category-check-2" />
                            <label className="form-check-label" htmlFor="filter-category-check-2">
                                North Indian
                            </label>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="filter-category-check-3" />
                            <label className="form-check-label" htmlFor="filter-category-check-3">
                                Chinese
                            </label>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="filter-category-check-4" />
                            <label className="form-check-label" htmlFor="filter-category-check-4">
                                Beverages
                            </label>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="filter-category-check-5" />
                            <label className="form-check-label" htmlFor="filter-category-check-5">
                                Ice Cream
                            </label>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                            <label className="form-check-label" htmlFor="flexCheckChecked">
                                Tiffins
                            </label>
                        </div>
                    </div>
                </div>
            
            </div>
        </div>


        <div className="restaurants-body">
            <h3>All restaurants</h3>
            <div className="restaurants">

                <div className='restaurant-item'>
                    <div className="restaurant">
                        <img src="https://odhi.in/image/cache/catalog/eat/chicken-biryani-odhi-in-eat-online-coimbatore-1000x1000.jpg" alt="" />
                        <div className="restaurant-data">
                            <h6>Product title</h6>
                            <p>Description about product</p>
                            <h5>Rating: <b>3.6/5</b></h5>
                        </div>
                    </div>
                </div>

                <div className='restaurant-item'>
                    <div className="restaurant">
                        <img src="https://odhi.in/image/cache/catalog/eat/chicken-biryani-odhi-in-eat-online-coimbatore-1000x1000.jpg" alt="" />
                        <div className="restaurant-data">
                            <h6>Product title</h6>
                            <p>Description about product</p>
                            <h5>Rating: <b>3.6/5</b></h5>
                        </div>
                    </div>
                </div>

                <div className='restaurant-item'>
                    <div className="restaurant">
                        <img src="https://odhi.in/image/cache/catalog/eat/chicken-biryani-odhi-in-eat-online-coimbatore-1000x1000.jpg" alt="" />
                        <div className="restaurant-data">
                            <h6>Product title</h6>
                            <p>Description about product</p>
                            <h5>Rating: <b>3.6/5</b></h5>
                        </div>
                    </div>
                </div>

                <div className='restaurant-item'>
                    <div className="restaurant">
                        <img src="https://odhi.in/image/cache/catalog/eat/chicken-biryani-odhi-in-eat-online-coimbatore-1000x1000.jpg" alt="" />
                        <div className="restaurant-data">
                            <h6>Product title</h6>
                            <p>Description about product</p>
                            <h5>Rating: <b>3.6/5</b></h5>
                        </div>
                    </div>
                </div>

                <div className='restaurant-item'>
                    <div className="restaurant">
                        <img src="https://odhi.in/image/cache/catalog/eat/chicken-biryani-odhi-in-eat-online-coimbatore-1000x1000.jpg" alt="" />
                        <div className="restaurant-data">
                            <h6>Product title</h6>
                            <p>Description about product</p>
                            <h5>Rating: <b>3.6/5</b></h5>
                        </div>
                    </div>
                </div>




            </div>
        </div>
    </div>
  )
}

export default Restaurants