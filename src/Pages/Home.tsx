import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useMenuContext } from "../../src/Context/MenuContext";
import { productTranslations } from "../../src/components/MenuPage/productTranslations";

const Home = () => {
  const { menuItems = [] } = useMenuContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(menuItems.length / itemsPerPage);
  const [shuffledItems, setShuffledItems] = useState(menuItems);
  const [fade, setFade] = useState(false);  // State สำหรับการเลื่อน

  const shuffleMenuItems = () => {
    const shuffled = [...menuItems]
      .map((item) => ({ ...item, random: Math.random() }))
      .sort((a, b) => a.random - b.random)
      .map(({ random, ...rest }) => rest);
    setShuffledItems(shuffled);
  };

  useEffect(() => {
    shuffleMenuItems();
  }, []);

  useEffect(() => {
    setFade(true); // เริ่มการ fade-out เมื่อมีการเปลี่ยนแปลง currentIndex
    const timer = setTimeout(() => {
      setFade(false); // เริ่ม fade-in หลังจาก 500ms
    }, 500);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const displayedItems = shuffledItems.slice(
    currentIndex * itemsPerPage,
    currentIndex * itemsPerPage + itemsPerPage
  );

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
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-r ">
      {/* Header Section with Typing Animation */}
      <div className="bg-[#065621] text-white p-2 text-center text-3xl">
        <h1 className="font-medium typing-text">
          There's always something new and exciting to cook.
        </h1>
      </div>

      {/* Image Section with Parallax effect */}
      <div className="flex flex-col lg:flex-row w-screen">
        <h1 className="lg:w-1/2 text-[#733028] text-left bg-[#E3CFC7] flex items-center justify-center font-bold p-4 text-2xl">
          Easy meal kits. <br />
          Quality ingredients. <br />
          Delivered to your door.
        </h1>
        <img
          src="/Designer.jpeg"
          alt="Delicious Meal"
          className="w-full lg:w-screen h-[300px] object-cover bg-fixed bg-cover"
        />
      </div>

      <section className="px-6 mt-10">
        <div className="text-center mb-8">
          <img
            src="/Delicious.png"
            alt="Delicious Sign"
            className="w-32 lg:w-40 h-auto mx-auto"
          />
          <h2 className="text-3xl text-[#065621] font-bold mb-8 mt-8">
            Featured Meal Kits
          </h2>
        </div>

        {/* Product Grid with Slide In/Out Animation */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto transition-all duration-500 transform ${
            fade ? "opacity-0" : "opacity-100"
          }`}
          style={{
            transform: fade ? "translateX(100%)" : "translateX(0)", // ทำให้สินค้าเลื่อนไปขวาเมื่อ fade-out
          }}
        >
          {displayedItems.map((product) => (
            <div
              key={product._id}
              className="product-card bg-white rounded-lg shadow-lg overflow-hidden mx-2 transform transition-all duration-500 hover:scale-105 hover:shadow-xl"
            >
              <Link to={`/product/${product._id}`}>
                <div className="w-full h-[200px] transform transition-all duration-500 hover:translate-y-[-10px]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </div>
              </Link>
              <div className="p-4">
                <p className="text-lg font-semibold mt-2 text-gray-600">
                  {productTranslations[product.name] || product.name}
                </p>
                <p className="text-green-600 mt-2 font-bold">
                  {product.price} บาท
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Buttons */}
        <div className="flex justify-center mt-10 mb-16 space-x-4">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`w-[100px] px-6 py-2 bg-[#065621] text-white rounded-lg shadow text-2xl transition-all duration-300 ${
              currentIndex === 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:scale-105 hover:shadow-xl"
            }`}
          >
            &#8678;
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === totalPages - 1}
            className={`w-[100px] px-6 py-2 bg-[#065621] text-white rounded-lg shadow text-2xl transition-all duration-300 ${
              currentIndex === totalPages - 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:scale-105 hover:shadow-xl"
            }`}
          >
            &#8680;
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
