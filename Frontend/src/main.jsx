import { React} from 'react'
import ReactDOM from "react-dom/client";
import App from "./App.jsx"
import "./index.css"
import { Route , RouterProvider , createRoutesFromElements} from "react-router"
import { createBrowserRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "./redux/features/store";
import Register from './pages/Auth/Register.jsx';

import PrivateRoute from './components/PrivateRoute.jsx';

//Home
import Home from './pages/Home.jsx';

//users
import Profile from './pages/User/Profile.jsx';
import  Favorites  from './pages/Products/Favorites.jsx';
import  ProductDetails  from './pages/Products/ProductDetails.jsx';
import Cart from './pages/Cart.jsx';
import  Shop  from './pages/Shop.jsx';

// Auth
import Login from './pages/Auth/Login.jsx'

//Admin
import { AdminRoute } from './pages/Admin/AdminRoute.jsx';
import UserList from './pages/Admin/UserList.jsx';
import CategoryList from './pages/Admin/CategoryList.jsx';
import ProductList from './pages/Admin/ProductList.jsx';
import  ProductUpdate  from '../src/pages/Admin/ProductUpdate.jsx'
import AllProducts from '../src/pages/Admin/AllProducts.jsx'
import Shipping from './pages/orders/Shipping.jsx';
import PlaceOrder from './pages/orders/PlaceOrder.jsx';
import YourOrder from './pages/orders/YourOrder.jsx';

//paypal
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { ORDERS_URL } from './redux/features/constants.js';
import UserOrder from './pages/User/UserOrder.jsx';
import OrderList from './pages/Admin/OrderList.jsx';
import AdminDashBoard from './pages/Admin/AdminDashBoard.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path='/' element = {<App />} >
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route index={true} path='/' element={<Home />} />
      <Route path='/favorite' element={<Favorites />} />
      <Route path='product/:id' element={<ProductDetails/>} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/shop' element={<Shop />} />
      <Route path='/user-orders' element={<UserOrder />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/order/:id" element={<YourOrder/>} />
      </Route>

      <Route path="/admin" element={<AdminRoute/>}>
        <Route path="userlist" element={<UserList />} />
        <Route path="categorylist" element={<CategoryList/>} />
        <Route path='productlist' element={<ProductList />} />
        <Route path='allproductslist' element={<AllProducts/>} />
        <Route path='product/update/:_id' element={<ProductUpdate />} />
        <Route path='orderlist' element={<OrderList />} />
        <Route path='dashboard' element={<AdminDashBoard />} />
      </Route>
    </Route>

  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PayPalScriptProvider>
      <RouterProvider router = {router} />
    </PayPalScriptProvider>
  </Provider>
);