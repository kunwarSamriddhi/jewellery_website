import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShopState from './context/ShopState';
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import Footer from './components/Footer';
import Home from './components/Home';
import Shop from './components/Shop';
import ProductDetails from './components/ProductDetails';
import CartItems from './components/CartItems';
import Wishlist from './components/Wishlist';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  return (
    <ShopState>
      <Router>
        <div className="app-wrapper">
          <Navbar showAlert={showAlert} />
          <Alert alert={alert} />

          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home showAlert={showAlert} />} />
              <Route path="/shop" element={<Shop showAlert={showAlert} />} />
              <Route path="/products" element={<Shop showAlert={showAlert} />} />
              <Route path="/blogs" element={<Shop showAlert={showAlert} />} />
              <Route path="/product/:id" element={<ProductDetails showAlert={showAlert} />} />
              <Route path="/cart" element={<CartItems showAlert={showAlert} />} />
              <Route path="/cartitems" element={<CartItems showAlert={showAlert} />} />
              <Route path="/wishlist" element={<Wishlist showAlert={showAlert} />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login showAlert={showAlert} />} />
              <Route path="/signup" element={<Signup showAlert={showAlert} />} />
              <Route path="*" element={<Shop showAlert={showAlert} />} />
            </Routes>
          </main>

          <Footer showAlert={showAlert} />
        </div>
      </Router>
    </ShopState>
  );
}

export default App;
