import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar'
import Home from './pages/Home';
import Authentication from './pages/Authentication';

import Cart from './pages/customer/Cart';
import Profile from './pages/customer/Profile';
import CategoryProducts from './pages/customer/CategoryProducts';
import IndividualRestaurant from './pages/customer/IndividualRestaurant';

import Admin from './pages/admin/Admin';
import AllUsers from './pages/admin/AllUsers';
import AllOrders from './pages/admin/AllOrders';
import AllRestaurants from './pages/admin/AllRestaurants';

import RestaurantHome from './pages/restaurant/RestaurantHome'
import RestaurantOrders from './pages/restaurant/RestaurantOrders'
import RestaurantMenu from './pages/restaurant/RestaurantMenu'
import NewProduct from './pages/restaurant/NewProduct';
import EditProduct from './pages/restaurant/EditProduct'
import EditRestaurant from './pages/admin/EditRestaurant'
import AdminRestaurantDashboard from './pages/admin/AdminRestaurantDashboard'

function App() {
  return (
    <div className="App">
      
      <Navbar />
      
      <Routes>

        <Route path='/auth' element={<Authentication />} />

        <Route exact path='' element={<Home />}/>
        <Route path='/cart' element={<Cart />} />
        <Route path='/restaurant/:id' element={<IndividualRestaurant />} />
        <Route path='/category/:category' element={<CategoryProducts />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/auth' element={<Authentication />} />

        <Route path='/admin' element={<Admin />} />
        <Route path='/all-restaurants' element={<AllRestaurants />} />
        <Route path='/admin/edit-restaurant/:id' element={<EditRestaurant />} />
        <Route path='/admin/restaurant-dashboard/:id' element={<AdminRestaurantDashboard />} />
        <Route path='/all-users' element={<AllUsers />} />
        <Route path='/all-orders' element={<AllOrders />} />

        <Route path='/restaurant' element={<RestaurantHome />} />
        <Route path='/restaurant-orders' element={<RestaurantOrders />} />
        <Route path='/restaurant-menu' element={<RestaurantMenu />} />
        <Route path='/new-product' element={<NewProduct />} />
        <Route path='/update-product/:id' element={<EditProduct />} />

      </Routes>

    </div>
  );
}

export default App;
