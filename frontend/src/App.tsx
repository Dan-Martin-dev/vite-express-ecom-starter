import { ReactLocation, Router, Outlet } from '@tanstack/react-location';
import { ReactLocationDevtools } from '@tanstack/react-location-devtools';

// Import pages
import About from './pages/About';
import Cart from './pages/Cart';
import Collection from './pages/Collection';
import Home from './pages/Home';
import Register from './pages/Register.tsx';
import Orders from './pages/Orders';
import PlaceOrder from './pages/PlaceOrder';
import Header from './components/Header/Header.tsx';
import Sale from './pages/Sale';
import Footer from './components/Footer';
import Login from './pages/Login.tsx';
import ProductDetail from './components/Products/ProductDetail3.tsx';
import '../../frontend/src/App.css';

// Create a new instance of ReactLocation
const location = new ReactLocation();

const App = () => {
  return (
    <div>
      <Header />

      <Router
        location={location}
        routes={[
          { path: '/', element: <Home /> },
          { path: '/about', element: <About /> },
          { path: '/cart', element: <Cart /> },
          { path: '/collection', element: <Collection /> },
          { path: '/login', element: <Login /> },
          { path: '/register', element: <Register /> },
          { path: '/sale', element: <Sale /> },
          { path: '/orders', element: <Orders /> },
          { path: '/placeorder', element: <PlaceOrder /> },
          { path: '/products/:id', element: <ProductDetail /> }, 
        ]}
      >
        <Outlet />
        <ReactLocationDevtools initialIsOpen={false} />

      </Router>


      <Footer />
    </div>
  );
};

export default App;