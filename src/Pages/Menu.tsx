import Footer from "../components/Footer";
import React from 'react';
import MenuPage from '../components/MenuPage/MenuPage';
import { MenuProvider } from '../Context/MenuContext';

const Menu: React.FC = () => {
  return (
    <MenuProvider>
      <div>
        <div className="flex justify-center bg-blue-800 text-white p-2 text-2xl h-12">
        <h1>Experience the Joy of Home Cooking With Creative Recipes That Make Every Meal a Masterpiece!</h1>
        </div>
          <h1 className='flex justify-center text-5xl font-semibold text-gray-500 mt-8'>Menu</h1>
      </div>
      <MenuPage />
      <Footer />
    </MenuProvider>
    
  );
};

export default Menu;
