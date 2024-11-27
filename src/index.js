import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Index from './component/Blog/Index';
import Detail from './component/Blog/Detail';
import Register from './component/Member/Register';
import Login from './component/Member/Login';
import Home from './component/Home/Home';
import Update from './component/Member/Update';
import Product from './component/Product/Product';
import AddProduct from './component/Product/AddProduct';
import UpdateProduct from './component/Product/UpdateProduct';
import ProductDetail from './component/Product/ProductDetail';
import Cart from './component/Product/Cart';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>
          {/* <Route exact path='/' element={<Home/>}></Route> */}
          <Route path='/' element={<Home />}></Route>
          <Route path='/blog/list' element={<Index />}></Route>
          <Route path='/blog/detail/:id' element={<Detail />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/account/update' element={<Update />}></Route>
          <Route path='/account/my-product' element={<Product />}></Route>
          <Route path='/account/create-product' element={<AddProduct />}></Route>
          <Route path='/account/update/:id' element={<UpdateProduct />}></Route>
          <Route path='/product/detail/:id' element={<ProductDetail />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </App>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
