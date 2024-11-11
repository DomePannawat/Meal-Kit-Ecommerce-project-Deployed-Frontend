
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../src/components/Navbar";
import Home from "../src/Pages/Home";
import Menu from "../src/Pages/Menu";
import Login from "../src/Pages/Login";
import Cart from "../src/Pages/Cart";
import Delivery from "../src/Pages/Delivery";
import Signup from "../src/Pages/Signup";
import { MenuProvider } from '../src/Context/MenuContext';
import { CartProvider } from "../src/Context/CartContext"; 
import ProductDetail from '../src/Pages/ProductDetail/ProductDetail';

function App() {
  return (
    <div>
      <BrowserRouter>
      <CartProvider>
      <MenuProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/delivery" element={<Delivery />} />
        </Routes>
        </MenuProvider>
        </CartProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
