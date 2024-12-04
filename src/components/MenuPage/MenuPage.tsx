import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { useMenuContext } from '../../Context/MenuContext';
import { productTranslations } from '../MenuPage/productTranslations';
import { motion, AnimatePresence } from 'framer-motion';


const MenuPage: React.FC = () => {
  const { menuItems, filterCategory, sortByPrice } = useMenuContext();
  const [selectedMainCategory, setSelectedMainCategory] = useState<string | null>(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number | string>('');
  const [maxPrice, setMaxPrice] = useState<number | string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const menuItemsRef = useRef<HTMLDivElement>(null);
  const mainCategories = ['AllProducts', 'MealKits', 'PreparedAndReady'];
  const subcategories: { [key in 'MealKits' | 'PreparedAndReady']: string[] } = {
    MealKits: ['boil', 'stir_fry', 'curry', 'deep_fly', 'Salad'],
    PreparedAndReady: ['Savory_food', 'Dessert'],
  };

  const categoryNames: { [key: string]: string } = {
    MealKits: 'Meal Kits',
    PreparedAndReady: 'Prepared & Ready',
    boil: 'เมนูต้ม',
    stir_fry: 'เมนูผัด',
    curry: 'เมนูแกง',
    deep_fly: 'เมนูทอด',
    Salad: 'เมนูสลัด',
    Savory_food: 'เมนูของคาว',
    Dessert: 'เมนูของหวาน',
    AllProducts: 'สินค้าทั้งหมด',
  };

  const handleMainCategoryChange = (category: string) => {
    setSelectedMainCategory(prev => (prev === category ? null : category));
    setSelectedSubcategories([]);
    if (category === 'AllProducts') {
      filterCategory('');
    } else {
      filterCategory('');
    }
  };

  

  const handleSubcategoryChange = (subcategory: string) => {
    const updatedSubcategories = selectedSubcategories.includes(subcategory)
      ? selectedSubcategories.filter(cat => cat !== subcategory)
      : [...selectedSubcategories, subcategory];

    setSelectedSubcategories(updatedSubcategories);
    filterCategory(updatedSubcategories.length > 0 ? updatedSubcategories.join('|') : '');
  };

  const filteredMenuItems = menuItems.filter(item => {
    const translatedName = productTranslations[item.name] || item.name;
    const isSearchMatch =
      translatedName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase());

    const isWithinPriceRange =
      (minPrice === '' || item.price >= Number(minPrice)) &&
      (maxPrice === '' || item.price <= Number(maxPrice));

    return isWithinPriceRange && isSearchMatch;
  });

  

  const resetFilters = () => {
    setSelectedMainCategory(null);
    setSelectedSubcategories([]);
    setMinPrice('');
    setMaxPrice('');
    setSearchQuery('');
    filterCategory('');
  };



  useEffect(() => {
    if (menuItemsRef.current) {
      const yOffset = -100; 
      const element = menuItemsRef.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  }, [filteredMenuItems]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col lg:flex-row p-2 sm:p-4 mt-2 sm:mt-3 bg-gray-50 min-h-screen max-w-[2000px] mx-auto"
    >
      {/* Filter Sidebar */}
      <motion.aside 
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sidebar w-full lg:w-1/4 xl:w-1/5 p-3 sm:p-4 md:p-6 bg-white rounded-lg shadow-lg mb-4 lg:mb-0 lg:mr-4 sticky top-4 h-auto lg:h-[calc(100vh-2rem)] overflow-y-auto"
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">คัดกรอง</h2>

        {/* Search Bar */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-4 sm:mb-6"
        >
          <input
            type="text"
            placeholder="ค้นหาชื่อเมนู..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-200 rounded-lg 
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50"
          />
        </motion.div>

        {/* Main Categories */}
        <div className="space-y-3 sm:space-y-4">
          {mainCategories.map((category, index) => (
            <motion.div 
              key={index}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() => handleMainCategoryChange(category)}
                className={`w-full text-left py-2 px-3 sm:px-4 rounded-lg transition-all duration-300 text-sm sm:text-base
                          ${selectedMainCategory === category 
                            ? 'bg-blue-500 text-white font-semibold shadow-md' 
                            : 'hover:bg-gray-100 text-gray-700'}`}
              >
                {categoryNames[category]}
              </button>
              <AnimatePresence mode="wait">
                {selectedMainCategory === category && category !== 'AllProducts' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="ml-2 sm:ml-4 mt-2 space-y-1 sm:space-y-2"
                  >
                    {subcategories[category as 'MealKits' | 'PreparedAndReady'].map((subcategory, subIndex) => (
                      <motion.label
                        key={subIndex}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: subIndex * 0.05 }}
                        className="flex items-center space-x-2 cursor-pointer p-1.5 sm:p-2 hover:bg-gray-50 rounded text-sm sm:text-base"
                      >
                        <input
                          type="checkbox"
                          checked={selectedSubcategories.includes(subcategory)}
                          onChange={() => handleSubcategoryChange(subcategory)}
                          className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500 rounded focus:ring-blue-500"
                        />
                        <span className="text-gray-700">{categoryNames[subcategory]}</span>
                      </motion.label>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Price Range Filter */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 sm:mt-6 space-y-3 sm:space-y-4"
        >
          <h3 className="font-semibold text-gray-800 mb-2 sm:mb-3 text-sm sm:text-base">ช่วงราคา</h3>
          <div className="space-y-2">
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-200 rounded-lg 
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50"
              placeholder="ราคาต่ำสุด"
            />
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-200 rounded-lg 
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50"
              placeholder="ราคาสูงสุด"
            />
          </div>
        </motion.div>

        {/* Price Sorting */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 sm:mt-6"
        >
          <h3 className="font-semibold text-gray-800 mb-2 sm:mb-3 text-sm sm:text-base">เรียงตามราคา</h3>
          <select
            onChange={(e) => sortByPrice(e.target.value as 'asc' | 'desc' | 'default')}
            className="w-full p-2 sm:p-3 text-sm sm:text-base border border-gray-200 rounded-lg 
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50"
          >
            <option value="default">เริ่มต้น</option>
            <option value="asc">ราคาจากน้อยไปมาก</option>
            <option value="desc">ราคาจากมากไปน้อย</option>
          </select>
        </motion.div>

        {/* Reset Filters Button */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={resetFilters}
          className="w-full mt-4 sm:mt-6 p-2 sm:p-3 text-sm sm:text-base bg-red-500 text-white rounded-lg 
                   hover:bg-red-600 transition-all duration-300 transform hover:scale-105 
                   focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          รีเซ็ตค่าทั้งหมด
        </motion.button>
      </motion.aside>

      {/* Menu Items Grid */}
      <motion.div 
        ref={menuItemsRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.08 }}
        className="content w-full lg:w-3/4 xl:w-4/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-3 sm:gap-4 md:gap-6 p-2 sm:p-4"
      >
        <AnimatePresence mode="wait">
          {filteredMenuItems.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.01 }}
            >
              <Link to={`/product/${item._id}`}>
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full"
                >
                  <div className="relative h-36 sm:h-48 overflow-hidden">
                    <motion.img
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2 line-clamp-2">
                      {productTranslations[item.name] || item.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2">{item.description}</p>
                    <p className="text-base sm:text-lg text-green-600 font-bold">{item.price} บาท</p>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default MenuPage;