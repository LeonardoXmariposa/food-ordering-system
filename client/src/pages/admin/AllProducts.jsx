import React from 'react'
import '../../styles/AllProducts.css'

const AllProducts = () => {
  return (
    <div className="all-products-page">
        <div className="all-products-container">
        <div className="all-products-filter">
            <h4>Filters</h4>
            <div className="all-product-filters-body">

                <div className="all-product-filter-sort">
                    <h6>Sort</h6>
                    <div className="all-product-filter-sort-body all-product-sub-filter-body">

                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="filter-sort-radio1" />
                            <label class="form-check-label" for="filter-sort-radio1" >
                                Popular
                            </label>
                        </div>

                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="filter-sort-radio2"  />
                            <label class="form-check-label" for="filter-sort-radio2">
                                Price (low to high)
                            </label>
                        </div>

                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="filter-sort-radio3" />
                            <label class="form-check-label" for="filter-sort-radio3">
                                Price (high to low)
                            </label>
                        </div>

                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="filter-sort-radio4" />
                            <label class="form-check-label" for="filter-sort-radio4">
                                Discount
                            </label>
                        </div>

                    </div>
                </div>
                <div className="all-product-filter-categories">
                    <h6>Categories</h6>
                    <div className="all-product-filter-categories-body all-product-sub-filter-body">

                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="filter-category-check-1" />
                            <label class="form-check-label" for="filter-category-check-1">
                                Bithday Gifts
                            </label>
                        </div>

                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="filter-category-check-2" />
                            <label class="form-check-label" for="filter-category-check-2">
                                Anniversary Gifts
                            </label>
                        </div>

                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="filter-category-check-3" />
                            <label class="form-check-label" for="filter-category-check-3">
                                Cakes
                            </label>
                        </div>

                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="filter-category-check-4" />
                            <label class="form-check-label" for="filter-category-check-4">
                                Chocolates
                            </label>
                        </div>

                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="filter-category-check-5" />
                            <label class="form-check-label" for="filter-category-check-5">
                                Flowers
                            </label>
                        </div>

                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                            <label class="form-check-label" for="flexCheckChecked">
                                Valentines day Gifts
                            </label>
                        </div>

                    </div>
                </div>
                <div className="all-product-filter-gender">
                    <h6>Gender</h6>
                    <div className="all-product-filter-gender-body all-product-sub-filter-body">
                        
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="filter-gender-check-1" />
                            <label class="form-check-label" for="filter-gender-check-1">
                                Men
                            </label>
                        </div>

                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="filter-gender-check-2" />
                            <label class="form-check-label" for="filter-gender-check-2">
                                Women
                            </label>
                        </div>

                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="filter-gender-check-3" />
                            <label class="form-check-label" for="filter-gender-check-3">
                                Unisex
                            </label>
                        </div>

                    </div>
                </div>
                {/* <div className="filter-price">
                    <h6>Price</h6>
                    <div className="filter-price-body">

                    </div>
                </div> */}
            </div>
        </div>


        <div className="all-products-body">
            <h3>All Products</h3>
            <div className="all-products">

                <div className='all-product-item'>
                    <div className="all-product">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGnbY9YlH663xUNGHOe0lS9n-zSwrLtiEFVw&usqp=CAU" alt="" />
                        <div className="all-product-data">
                            <h6>Product title</h6>
                            <p>Description about product</p>
                            <h5>&#8377; 499 <s>799</s><p>( 30% off)</p></h5>
                        </div>
                        <button>Update</button>
                    </div>
                </div>

                <div className='all-product-item'>
                    <div className="all-product">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGnbY9YlH663xUNGHOe0lS9n-zSwrLtiEFVw&usqp=CAU" alt="" />
                        <div className="all-product-data">
                            <h6>Product title</h6>
                            <p>Description about product</p>
                            <h5>&#8377; 499 <s>799</s><p>( 30% off)</p></h5>
                        </div>
                        <button>Update</button>
                    </div>
                </div>

                <div className='all-product-item'>
                    <div className="all-product">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGnbY9YlH663xUNGHOe0lS9n-zSwrLtiEFVw&usqp=CAU" alt="" />
                        <div className="all-product-data">
                            <h6>Product title</h6>
                            <p>Description about product</p>
                            <h5>&#8377; 499 <s>799</s><p>( 30% off)</p></h5>
                        </div>
                        <button>Update</button>
                    </div>
                </div>

                <div className='all-product-item'>
                    <div className="all-product">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGnbY9YlH663xUNGHOe0lS9n-zSwrLtiEFVw&usqp=CAU" alt="" />
                        <div className="all-product-data">
                            <h6>Product title</h6>
                            <p>Description about product</p>
                            <h5>&#8377; 499 <s>799</s><p>( 30% off)</p></h5>
                        </div>
                        <button>Update</button>
                    </div>
                </div>

                <div className='all-product-item'>
                    <div className="all-product">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGnbY9YlH663xUNGHOe0lS9n-zSwrLtiEFVw&usqp=CAU" alt="" />
                        <div className="all-product-data">
                            <h6>Product title</h6>
                            <p>Description about product</p>
                            <h5>&#8377; 499 <s>799</s><p>( 30% off)</p></h5>
                        </div>
                        <button>Update</button>
                    </div>
                </div>




            </div>
        </div>
    </div>
    </div>
  )
}

export default AllProducts