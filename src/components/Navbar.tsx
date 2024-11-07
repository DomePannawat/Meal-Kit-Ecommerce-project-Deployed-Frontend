import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <nav className="bg-white border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="/logo.png" className="w-19 h-16 rounded-[100%]" alt="Logo" /> 
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              FlavorBox
            </span>
          </a>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">

            <a href="/cart">
              <button><img src="https://media.istockphoto.com/id/1206806317/th/%E0%B9%80%E0%B8%A7%E0%B8%84%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B9%8C/%E0%B9%84%E0%B8%AD%E0%B8%84%E0%B8%AD%E0%B8%99%E0%B8%95%E0%B8%B0%E0%B8%81%E0%B8%A3%E0%B9%89%E0%B8%B2%E0%B8%AA%E0%B8%B4%E0%B8%99%E0%B8%84%E0%B9%89%E0%B8%B2%E0%B9%81%E0%B8%A2%E0%B8%81%E0%B8%9A%E0%B8%99%E0%B8%9E%E0%B8%B7%E0%B9%89%E0%B8%99%E0%B8%AB%E0%B8%A5%E0%B8%B1%E0%B8%87%E0%B8%AA%E0%B8%B5%E0%B8%82%E0%B8%B2%E0%B8%A7.jpg?s=612x612&w=0&k=20&c=Qa3Mps2tpvJrgTmBseyv9sBuCvRhK1F_KTUuEpnJpTE="  
              className="flex justify-center mr-2 w-10 h-10"
              /></button>
            </a>

            <a href="/login">
              <button
                type="button"
                className="text-gray-600 hover:text-orange-500 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-5"
              >
                Login
              </button>
            </a>
            <a href="/signup">
              <button
                type="button"
                className="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
              >
                Sign Up
              </button>
            </a>
            <button
              onClick={toggleMenu} 
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
          <div
            className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMenuOpen ? "block" : "hidden"}`}
            id="navbar-cta"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:border-gray-700">
              <li>
                <a
                  href="/"
                  className="block py-2 px-3 md:p-0 hover:text-orange-500 md:hover:bg-transparent text-gray-600  md:dark:hover:bg-transparent"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/plans"
                  className="block py-2 px-3 md:p-0 hover:text-orange-500 md:hover:bg-transparent text-gray-600  md:dark:hover:bg-transparent"
                >
                  PLANS
                </a>
              </li>
              <li>
                <a
                  href="/menu"
                  className="block py-2 px-3 md:p-0 hover:text-orange-500 md:hover:bg-transparent text-gray-600  md:dark:hover:bg-transparent"
                >
                  MENU
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
