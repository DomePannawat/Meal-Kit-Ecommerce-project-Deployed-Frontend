import { useState } from "react";
import { useCartContext } from "../Context/CartContext";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { getCartItemCount } = useCartContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const cartItemCount = getCartItemCount();

  return (
    <div>
      <nav className="bg-white border-gray-200">
        <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
          <NavLink
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="/logo.png"
              className="w-18 h-16 rounded-[100%] "
              alt="Logo"
            />
          </NavLink>

          {/* Cart & Login/Sign Up Button */}
          <div className="flex items-center space-x-4 md:order-2 rtl:space-x-reverse">
            <NavLink to="/cart" className="relative">
              <button className="flex items-center justify-center">
                <img
                  src="/cart.png"
                  className="w-10 h-10"
                  alt="Cart"
                />
                {/* Display cart item count */}
                {cartItemCount > 0 && (
                  <div className="absolute top-6 right-6 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </div>
                )}
              </button>
            </NavLink>

            <NavLink to="/login">
              <button
                type="button"
                className="text-gray-600 hover:text-orange-500 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
              >
                Login
              </button>
            </NavLink>
            <NavLink to="/signup">
              <button
                type="button"
                className="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
              >
                Sign Up
              </button>
            </NavLink>

            {/* Hamburger Menu for Mobile */}
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-cta"
              aria-expanded={isMenuOpen}
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
            
            <ul className="flex flex-col w-40 font-medium p-4 md:p-0 mt-4 md:space-x-8 md:flex-row dark:border-gray-700 ">
              <li>
                <NavLink
                  to="/"
                  className="block py-2 px-3 md:p-0 hover:text-orange-500 text-gray-600"
                  aria-current="page"
                >
                  Home
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
                  to=""
                  className="block py-2 px-3 md:p-0 hover:text-orange-500 text-gray-600"
                >
                  ABOUT
                </NavLink>
              </li>

              <li>
                <NavLink
                  to=""
                  className="block py-2 px-3 md:p-0 hover:text-orange-500 text-gray-600"
                >
                  CONTACT
                </NavLink>
              </li>

              
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
