import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useMenuContext } from '../../Context/MenuContext';

const MenuPage: React.FC = () => {
  const { menuItems, filterCategory, sortByPrice } = useMenuContext();
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

  const handleCategoryChange = (category: string) => {
    const newSelectedCategory = selectedCategory.includes(category)
      ? selectedCategory.filter(cat => cat !== category)
      : [...selectedCategory, category];
    setSelectedCategory(newSelectedCategory);

    
    filterCategory(newSelectedCategory.length > 0 ? newSelectedCategory.join('|') : '');
  };

  return (
    <div className="flex p-4 mt-3">
      {/* Filter Sidebar */}
      <aside className="w-1/4 p-4 border-r border-gray-200">
        <h2 className="text-xl font-bold mb-4">คัดกรอง</h2>
        
        {/* Filter Categories */}
        {['Salad', 'Rolls', 'Sandwich', 'Cake', 'Pure Veg', 'Pasta', 'Soup', 'Deserts'].map((category, index) => (
          <label key={index} className="block mb-2 text-gray-700 hover:text-black">
            <input
              type="checkbox"
              checked={selectedCategory.includes(category)}
              onChange={() => handleCategoryChange(category)}
              className="mr-2"
            />
            {category}
          </label>
        ))}
        
        {/* Price Sorting */}
        <div className="mt-4">
          <label className="block mb-2 text-gray-700 font-semibold">เรียงตามราคา:</label>
          <select onChange={(e) => sortByPrice(e.target.value as 'asc' | 'desc' | 'default')} className="p-2 border border-gray-300 rounded">
            <option value="default">เริ่มต้น</option>
            <option value="asc">ราคาจากน้อยไปมาก</option>
            <option value="desc">ราคาจากมากไปน้อย</option>
          </select>
        </div>
      </aside>

      {/* Menu Items */}
      <div className="w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {menuItems.map(item => (
          <Link to={`/product/${item._id}`} key={item._id}>   
            <div className="border p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
              <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded-md" />
              <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
              <p className="text-gray-600 mt-1">{item.description}</p>
              <p className="text-blue-500 mt-2 font-bold">{item.price} บาท</p>
              <p className="text-green-500 mt-2 font-bold">Time to cook : 20 mins</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
