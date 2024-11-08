
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../src/components/Navbar";
import Footer from "../src/components/Footer";
import Home from "../src/Pages/Home";
import Plans from "../src/Pages/Plans";
import Menu from "../src/Pages/Menu";
import Login from "../src/Pages/Login";
import Cart from "../src/Pages/Cart";
import Delivery from "../src/Pages/Delivery";
import Signup from "../src/Pages/Signup";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/delivery" element={<Delivery />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
