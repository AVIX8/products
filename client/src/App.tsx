import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from './components/ProductList/ProductList';
import Navbar from './components/Navbar/Navbar';
import Review from './components/Review/Review';
import AddProduct from './components/AddProduct/AddProduct';
import Admin from './components/Admin/Admin';

function App() {
  return (
    <div className='App'>
    <BrowserRouter>
      <Navbar />
      <>
        <Routes>
          <Route path="/products" element={<ProductList />}></Route>
          <Route path="/addProduct" element={<AddProduct />}></Route>
          <Route path="/review" element={<Review />}></Route>
          <Route path="/admin" element={<Admin />}></Route>
        </Routes>
      </>
    </BrowserRouter>
    </div>
  );
}

export default App;
