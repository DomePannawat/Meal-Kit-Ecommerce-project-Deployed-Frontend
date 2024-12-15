import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useMenuContext } from "../Context/MenuContext";
import { productTranslations } from "../components/MenuPage/productTranslations";
import { motion } from "framer-motion";

const Home = () => {
  const { menuItems = [] } = useMenuContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(menuItems.length / itemsPerPage);
  const [shuffledItems, setShuffledItems] = useState<typeof menuItems>([]);

  const shuffleMenuItems = () => {
    const shuffled = [...menuItems]
      .map((item) => ({ ...item, random: Math.random() }))
      .sort((a, b) => a.random - b.random)
      .map(({ random, ...rest }) => rest);
    setShuffledItems(shuffled);
  };

  useEffect(() => {
    if (Array.isArray(menuItems)) {
      shuffleMenuItems();
    }
  }, [menuItems]);

  const displayedItems = Array.isArray(shuffledItems)
    ? shuffledItems.slice(
        currentIndex * itemsPerPage,
        currentIndex * itemsPerPage + itemsPerPage
      )
    : [];

  const handleNext = () => {
    if (currentIndex < totalPages - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div>
      <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-green-50 to-white">
        {/* Animated Header Banner */}
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
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative h-[80vh] w-full overflow-hidden"
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img
            src="/Designer.jpeg"
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-center mb-6 leading-tight"
            >
              Discover the Joy of <br />
              <span className="text-green-400">Home Cooking</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl md:text-2xl text-center max-w-2xl mb-8"
            >
              Easy meal kits. Quality ingredients. Delivered to your door.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <Link
                to="/menu"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 block text-center"
              >
                Explore Our Menu
              </Link>
            </motion.div>
          </div>
        </motion.div>
        {/* Featured Section */}
<section className="px-4 py-12 bg-white">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="text-center mb-8"
  >
    <img
      src="/Delicious.png"
      alt="Delicious Sign"
      className="w-24 lg:w-32 h-auto mx-auto mb-4"
    />
    <h2 className="text-3xl font-semibold text-gray-800 mb-2">
      Featured Meal Kits
    </h2>
    <div className="w-20 h-1 bg-green-500 mx-auto" />
  </motion.div>
  {/* Product Grid */}
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
  >
    {displayedItems.map((product, index) => (
      <motion.div
        key={product._id}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        className="group relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
      >
        <Link to={`/product/${product._id}`}>
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[200px] object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-800 mb-1 group-hover:text-green-600 transition-colors duration-300">
              {productTranslations[product.name] || product.name}
            </h3>
            <p className="text-green-600 font-bold text-md">
              {product.price} บาท
            </p>
          </div>
        </Link>
      </motion.div>
    ))}
  </motion.div>
  {/* Pagination */}
  <div className="flex justify-center mt-8 space-x-4">
    <button
      onClick={handlePrevious}
      disabled={currentIndex === 0}
      className={`px-6 py-2 bg-green-500 text-white rounded-full shadow-md transition-all duration-300 ${
        currentIndex === 0
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-green-600 hover:scale-105 hover:shadow-lg"
      }`}
    >
      Previous
    </button>
    <button
      onClick={handleNext}
      disabled={currentIndex === totalPages - 1}
      className={`px-6 py-2 bg-green-500 text-white rounded-full shadow-md transition-all duration-300 ${
        currentIndex === totalPages - 1
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-green-600 hover:scale-105 hover:shadow-lg"
      }`}
    >
      Next
    </button>
  </div>
</section>

        <hr />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-600"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <img src="/icon-food1.png" className="w-24 m-auto mb-2" />
            <p className="font-semibold">สะดวกสบาย</p>
            <br />
            <p className="text-gray-500 text-xl">
              ชุดอาหารพร้อมปรุงประหยัดเวลาและพลังงาน
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <img src="/icon-food2.png" className="w-16 m-auto mb-9" />
            <p className="font-semibold">หลากหลาย</p>
            <br />
            <p className="text-gray-500 text-xl">
              เลือกจากเมนูอาหารไทยที่หลากหลาย
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <img src="/icon-food3.png" className="w-20 m-auto mb-5" />
            <p className="font-semibold">คุณภาพ</p>
            <br />
            <p className="text-gray-500 text-xl">
              วัตถุดิบสดใหม่และมีคุณภาพสูงทุกครั้ง
            </p>
          </motion.div>
        </motion.div>

        <hr />
        {/* Subscribe now & get 10% off */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-10 mb-20"
        >
          <p className="text-2xl font-medium text-gray-700">
            Subscribe now & get 10% off
          </p>
          <p className="text-gray-400 mt-3">
            Join us today and enjoy 10% off your first purchase.
          </p>
          <form className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3 rounded-xl">
            <motion.input
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-full sm:flex-1 outline-none rounded-l-xl"
              type="email"
              placeholder="Enter your email"
              required
            />
            <motion.button
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white text-xs px-10 py-4 rounded-r-xl"
            >
              SUBSCRIBE
            </motion.button>
          </form>
        </motion.div>

        <Footer />
      </div>
    </div>
  );
};
export default Home;
