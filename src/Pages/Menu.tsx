import Footer from "../components/Footer";
import React from 'react';
import MenuPage from '../components/MenuPage/MenuPage';
import { MenuProvider } from '../Context/MenuContext';

const Menu: React.FC = () => {
  return (
    <MenuProvider>
      <div>
      <div className="bg-[#065621] text-white p-2 text-center sm:text-base md:text-2xl lg:text-2xl">
        <h1 className="font-medium typing-text">
          There's always something new and exciting to cook.
        </h1>
      </div>
          <h1 className='flex justify-center text-5xl font-semibold text-gray-500 mt-8'>Menu</h1>
      </div>
      <MenuPage />
      <Footer />
    </MenuProvider>
    
  );
};

export default Menu;
