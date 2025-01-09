import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import pages
import About from './pages/About';
import Cart from './pages/Cart';
import Collection from './pages/Collection';
import Home from './pages/Home';
import Register from './pages/Register.tsx';
import Orders from './pages/Orders';
import PlaceOrder from './pages/PlaceOrder';
import Product from './pages/Product';
import Header from './components/Header/Header.tsx';
import Sale from './pages/Sale';
import Footer from './components/Footer';
import Login from './pages/Login.tsx';

const App = () => { 
  return (
    <div>
      <Header/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/sale" element={<Sale />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/product/:productId" element={<Product />} />
      </Routes>
      
      <Footer/>
    </div>
  );
};

export default App;
