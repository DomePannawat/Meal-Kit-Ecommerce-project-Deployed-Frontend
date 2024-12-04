import { useState, useEffect } from "react";
import { useMenuContext } from "../Context/MenuContext";
import { motion } from "framer-motion";
import { productTranslations } from '../components/MenuPage/productTranslations';
import Footer from "../components/Footer";

const Order = () => {
  const { menuItems } = useMenuContext();
  const [orderItems, setOrderItems] = useState<any[]>([]);

  useEffect(() => {
    setOrderItems(menuItems.slice(0, 3));
  }, [menuItems]);


  return (
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto"
      >
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-3"
          >
            My Orders
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600"
          >
            Track and manage your orders
          </motion.p>
        </div>

        <div className="space-y-6">
          {orderItems.map((item, index) => (
            <motion.div
              key={item._id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -2 }}
              className="transition-all duration-300"
            >
              <div className="overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="flex items-start gap-6">
                      <motion.div 
                        className="relative rounded-xl overflow-hidden"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <img
                          className="w-24 h-24 sm:w-32 sm:h-32 object-cover"
                          src={item.image}
                          alt={item.name}
                        />
                        <div className="absolute inset-0 bg-black opacity-0 hover:opacity-10 transition-opacity duration-200" />
                      </motion.div>
                      
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {productTranslations[item.name] || item.name}
                        </h3>
                        <div className="grid grid-cols-3 gap-6 text-sm">
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="font-medium text-gray-900">${item.price}</p>
                            <p className="text-gray-500 text-xs mt-1">Price</p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="font-medium text-gray-900">1</p>
                            <p className="text-gray-500 text-xs mt-1">Quantity</p>
                          </div>
                          
                        </div>
                       
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4 items-start md:items-end">
                      <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        <span className="text-sm font-medium text-blue-700">
                          Ready to ship
                        </span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center px-6 py-2.5 text-sm font-medium rounded-full text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                      >
                        Track Order
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {orderItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16 bg-white rounded-xl shadow-sm"
          >
            <div className="mx-auto h-16 w-16 text-gray-300">
              <span className="text-4xl">📦</span>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No orders yet</h3>
            <p className="mt-2 text-gray-500">
              When you place orders, they will appear here
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
    <Footer />
    </div>
  );
};

export default Order;