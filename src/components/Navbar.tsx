import { useState } from "react";
import { useCartContext } from "../Context/CartContext";
import { NavLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const { getCartItemCount } = useCartContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const cartItemCount = getCartItemCount();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.reload();
  };

  return (
    <div>
      <ToastContainer />
      <nav className="bg-white shadow-md">
        <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* Logo */}
          <NavLink
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src="/logoFlavor.png" className="w-24 h-24" alt="Logo" />
          </NavLink>

          {/* Cart & Login/Sign Up Button */}
          <div className="flex items-center space-x-4 md:space-x-6 lg:space-x-6 md:order-2 rtl:space-x-reverse">
            {/* Cart Icon */}
            <NavLink
              to={localStorage.getItem("authToken") ? "/cart" : "#"}
              className="relative"
              onClick={(e) => {
                if (!localStorage.getItem("authToken")) {
                  e.preventDefault();
                  toast.warn("กรุณาล็อคอินเข้าสู่ระบบก่อน", {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                  });
                }
              }}
            >
              <button className="flex items-center justify-center">
                <img
                  src="/cart.png"
                  className="w-8 cursor-pointer"
                  alt="Cart"
                />
                {cartItemCount > 0 && (
                  <div className="absolute top-6 right-6 bg-green-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </div>
                )}
              </button>
            </NavLink>

            {/* Profile Icon with Dropdown */}
            <div className="relative group">
              <NavLink
                to={localStorage.getItem("authToken") ? "#" : "/login"} // ถ้ามี token ให้เป็น # (ไม่ทำอะไร) ถ้าไม่มีให้ลิงก์ไป /login
                className={`text-gray-600 hover:text-orange-500 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 flex items-center ${
                  localStorage.getItem("authToken") ? "cursor-default" : ""
                }`}
              >
                <img
                  className="w-6 cursor-pointer"
                  src="/profile_icon.png"
                  alt="Profile"
                />
              </NavLink>

              <div>
                {localStorage.getItem("authToken") && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <NavLink
                      to="/order/:id"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-orange-500 text-center rounded-md"
                    >
                      Orders
                    </NavLink>
                    <button
                      onClick={handleLogout}
                      className="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-orange-500 text-center rounded-md"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Hamburger Menu for Mobile */}
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-cta"
              aria-expanded={isMenuOpen ? "true" : "false"}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Menu */}
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } items-center justify-center w-full md:flex md:w-auto md:order-1`}
            id="navbar-cta"
          >
            <ul className="flex flex-col w-40 font-medium p-4 mr-20 md:mr-44 lg:mr-44 md:p-0 mt-4 md:space-x-5 md:flex-row dark:border-gray-700">
              <li>
                <NavLink
                  to="/"
                  className="block py-2 px-3 md:p-0 hover:text-orange-500 text-gray-600"
                  aria-current="page"
                >
                  HOME
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/menu"
                  className="block py-2 px-3 md:p-0 hover:text-orange-500 text-gray-600"
                >
                  MENU
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/about"
                  className="block py-2 px-3 md:p-0 hover:text-orange-500 text-gray-600"
                >
                  ABOUT
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/contact"
                  className="block py-2 px-3 md:p-0 hover:text-orange-500 text-gray-600"
                >
                  CONTACT
                </NavLink>
              </li>

              <li>
                <a
                  href="https://meal-kits-admin-vercel.vercel.app"
                  target="_blank"
                  className="hidden md:flex border px-5 py-2 text-xs rounded-full -mt-1.5  text-center  items-center justify-center bg-white text-black hover:bg-black hover:text-white transition-colors duration-300"
                >
                  <span className="block">Admin</span>
                  <span className="block">Panel</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
