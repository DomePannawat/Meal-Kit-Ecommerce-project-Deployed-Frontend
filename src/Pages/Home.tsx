import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useMenuContext } from "../../src/Context/MenuContext";
import { productTranslations } from '../../src/components/MenuPage/productTranslations';

const Home = () => {
  const { menuItems = [] } = useMenuContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationTriggered, setAnimationTriggered] = useState(false);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(menuItems.length / itemsPerPage);
  const [shuffledItems, setShuffledItems] = useState(menuItems);

  const shuffleMenuItems = () => {
    const shuffled = [...menuItems].map(item => ({ ...item, random: Math.random() }))
      .sort((a, b) => a.random - b.random)
      .map(item => { delete item.random; return item });
    setShuffledItems(shuffled);
  };

  useEffect(() => {
    shuffleMenuItems();
  }, []);

  const displayedItems = shuffledItems.slice(currentIndex * itemsPerPage, currentIndex * itemsPerPage + itemsPerPage);

  const handleNext = () => {
    if (currentIndex < totalPages - 1) {
      setCurrentIndex(currentIndex + 1);
      setAnimationTriggered(true);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setAnimationTriggered(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-r from-teal-100 via-gray-100 to-teal-50">
      <div className="bg-[#065621] text-white p-6 text-3xl text-center">
        <h1 className="font-bold">Become a Home Chef!</h1>
        <p>There's always something new and exciting to cook.</p>
      </div>

      <div className="flex flex-col lg:flex-row w-full p-6">
        <h1 className="lg:w-1/2 text-blue-900 text-4xl text-left bg-blue-200 flex items-center justify-center mb-4 lg:mb-0 font-bold ">
          Easy meal kits. <br />
          Quality ingredients. <br />
          Delivered to your door.
        </h1>
        <img
          src="/food7.jpg"
          alt="Delicious Meal"
          className="w-full lg:w-3/4 h-[300px] object-cover "
        />
      </div>

      <section className="px-6 mt-11">
        <div className="text-center mb-8">
          <h2 className="text-4xl text-[#065621] font-bold mb-8">Featured Meal Kits</h2>
          <img src="/Delicious.png" alt="Delicious Sign" className="w-32 lg:w-40 h-auto mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
          {displayedItems.map((product) => (
            <div key={product._id} className="bg-white rounded-lg shadow-lg overflow-hidden mx-2">
              <Link to={`/product/${product._id}`}>
                <div className="w-full h-[200px]">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-t-lg" />
                </div>
              </Link>
              <div className="p-4">
                <p className="text-lg font-semibold mt-2">{productTranslations[product.name] || product.name}</p>
                <p className="text-blue-500 mt-2 font-bold">{product.price} บาท</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6 mb-6 space-x-4">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`w-[100px] px-6 py-2 bg-[#065621] text-white rounded-lg shadow ${currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === totalPages - 1}
            className={`w-[100px] px-6 py-2 bg-[#065621] text-white rounded-lg shadow ${currentIndex === totalPages - 1 ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Next
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
