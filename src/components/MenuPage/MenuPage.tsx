import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useMenuContext } from '../../Context/MenuContext';
import { productTranslations } from '../../components/MenuPage/productTranslations';

const MenuPage: React.FC = () => {
  const { menuItems, filterCategory, sortByPrice } = useMenuContext();
  const [selectedMainCategory, setSelectedMainCategory] = useState<string | null>(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number | string>(''); 
  const [maxPrice, setMaxPrice] = useState<number | string>(''); 
  const [searchQuery, setSearchQuery] = useState<string>('');  
  const mainCategories = ['AllProducts', 'MealKits', 'PreparedAndReady']; 
  const subcategories: { [key in 'MealKits' | 'PreparedAndReady']: string[] } = {
    MealKits: ['boil', 'stir_fry','curry','deep_fly','Salad'],
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
  
    // การค้นหาตามชื่อ
    const isSearchMatch = 
      translatedName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()); // ตรวจสอบทั้งภาษาอังกฤษและไทย

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

  return (
    <div className="flex flex-col sm:flex-row p-4 mt-3">
      {/* Filter Sidebar */}
      <aside className="w-full sm:w-1/4 p-4 border-r border-gray-200 mb-4 sm:mb-0">
        <h2 className="text-xl font-bold mb-4">คัดกรอง</h2>

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="ค้นหาชื่อเมนู..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} 
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>

        {/* Main Categories */}
        {mainCategories.map((category, index) => (
          <div key={index} className="mb-4">
            <button
              onClick={() => handleMainCategoryChange(category)}
              className={`font-semibold text-gray-700 hover:text-black ${
                selectedMainCategory === category ? 'text-black' : 'text-gray-700'
              }`}
            >
              {categoryNames[category]} 
            </button>
            {selectedMainCategory === category && category !== 'AllProducts' && (
              <div className="ml-4 mt-2">
                {subcategories[category as 'MealKits' | 'PreparedAndReady'].map((subcategory, subIndex) => (
                  <label key={subIndex} className="block mb-2 text-gray-700 hover:text-black">
                    <input
                      type="checkbox"
                      checked={selectedSubcategories.includes(subcategory)}
                      onChange={() => handleSubcategoryChange(subcategory)}
                      className="mr-2"
                    />
                    {categoryNames[subcategory]} 
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Price Range Filter */}
        <div className="mt-4">
          <label className="block mb-2 text-gray-700 font-semibold">กรอกราคาตั้งแต่:</label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full sm:w-full"
            placeholder="ราคาต่ำสุด"
          />
          <label className="block mt-4 mb-2 text-gray-700 font-semibold">ถึง:</label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full sm:w-full"
            placeholder="ราคาสูงสุด"
          />
        </div>

        {/* Price Sorting */}
        <div className="mt-4">
          <label className="block mb-2 text-gray-700 font-semibold">เรียงตามราคา:</label>
          <select
            onChange={(e) => sortByPrice(e.target.value as 'asc' | 'desc' | 'default')}
            className="p-2 border border-gray-300 rounded w-full"
          >
            <option value="default">เริ่มต้น</option>
            <option value="asc">ราคาจากน้อยไปมาก</option>
            <option value="desc">ราคาจากมากไปน้อย</option>
          </select>
        </div>

        {/* Reset Filters Button */}
        <div className="mt-4">
          <button
            onClick={resetFilters}
            className="w-full sm:w-40 p-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            รีเซ็ตค่าทั้งหมด
          </button>
        </div>
      </aside>

      {/* Menu Items */}
      <div className="w-full sm:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {filteredMenuItems.map(item => (
          <Link to={`/product/${item._id}`} key={item._id}>   
            <div className="border p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
              <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded-md" />
              <h3 className="text-lg font-semibold mt-2">{productTranslations[item.name] || item.name}</h3>
              <p className="text-gray-600 mt-1">{item.description}</p>
              <p className="text-blue-500 mt-2 font-bold">{item.price} บาท</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
