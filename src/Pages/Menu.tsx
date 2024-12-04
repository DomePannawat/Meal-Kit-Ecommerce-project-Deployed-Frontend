import Footer from "../components/Footer";
import React from 'react';
import MenuPage from '../components/MenuPage/MenuPage';
import { MenuProvider } from '../Context/MenuContext';
import { motion } from "framer-motion";

const Menu: React.FC = () => {
  return (
    <MenuProvider>
      <div>
      <div className="relative bg-[#065621] text-white py-3 overflow-hidden">
          <motion.div
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex items-center gap-4 whitespace-nowrap text-xl md:text-2xl font-medium"
          >
            <span>🌟 There's always something new and exciting to cook</span>
            <span>🍳 Discover the joy of cooking with us</span>
            <span>🥘 Fresh ingredients, amazing flavors</span>
            <span>👨‍🍳 Cook like a pro at home</span>
          </motion.div>
        </div>
          <h1 className='flex justify-center text-5xl font-semibold text-gray-500 mt-8'>Menu</h1>
      </div>
      <MenuPage />
      <Footer />
    </MenuProvider>
    
  );
};

export default Menu;
