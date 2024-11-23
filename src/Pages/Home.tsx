import { useState,useEffect } from "react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useMenuContext } from "../../src/Context/MenuContext";
import { productTranslations } from '../../src/components/MenuPage/productTranslations';

const Home = () => {
  // ดึงข้อมูลเมนูจาก Context
  const { menuItems = [] } = useMenuContext(); 

  // กำหนดสถานะการเลื่อนหน้าและการแสดงผล
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationTriggered, setAnimationTriggered] = useState(false); 

  // จำนวนรายการที่จะแสดงต่อหน้า
  const itemsPerPage = 6; 
  // คำนวณจำนวนหน้าทั้งหมด
  const totalPages = Math.ceil(menuItems.length / itemsPerPage);

  // สถานะสำหรับเก็บรายการเมนูที่ถูกสุ่ม
  const [shuffledItems, setShuffledItems] = useState(menuItems);

 // ฟังก์ชันสำหรับสุ่มรายการเมนู
  const shuffleMenuItems = () => {
    const shuffled = [...menuItems].map(item => ({ ...item, random: Math.random() }))
      .sort((a, b) => a.random - b.random) 
      .map(item => { delete (item as any).random; return item });
    setShuffledItems(shuffled); 
  };

  // เรียกใช้ฟังก์ชันสุ่มรายการเมนูเมื่อโหลดหน้า
  useEffect(() => {
    shuffleMenuItems(); 
  }, []);

  // แสดงรายการเมนูที่ตรงกับหน้าปัจจุบัน
  const displayedItems = shuffledItems.slice(
    currentIndex * itemsPerPage,
    currentIndex * itemsPerPage + itemsPerPage
  );

  // ฟังก์ชันสำหรับเลื่อนไปหน้าถัดไป
  const handleNext = () => {
    if (currentIndex < totalPages - 1) {
      setCurrentIndex(currentIndex + 1);
      setAnimationTriggered(true); 
    }
  };
  
  // ฟังก์ชันสำหรับเลื่อนไปหน้าก่อนหน้า
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setAnimationTriggered(true); 
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="flex gap-x-64 pl-64 bg-blue-800 text-white p-2 text-3xl">
        <h1>Become a Home Chef!</h1>
        <h1>There's always something new and exciting to cook.</h1>
      </div>
      <div className="flex w-full">
        <h1 className="w-1/2 flex items-center justify-center text-blue-900 text-4xl text-left bg-blue-200">
          Easy meal kits. <br />
          Quality ingredients. <br />
          Delivered to your door.
        </h1>
        <img
          src="/food7.jpg"
          alt="Delicious Meal"
          className="w-3/4 h-[300px] object-cover"
        />
      </div>
      <section className="flex mt-11">
        <div className="flex justify-center mb-8 mx-auto">
          <div className="text-center">
            <h2 className="text-4xl text-blue-900 font-bold mb-8">
              Meal Kits <br /> Featured
            </h2>
            <img
              src="/Delicious.png"
              alt="Delicious Sign"
              className="w-40 h-30 object-cover mx-auto"
            />
          </div>
        </div>

        <div className="text-center mr-16">
          <div className="grid grid-cols-3 gap-4 justify-items-center">
            {displayedItems.map((product) => (
              <div
                key={product._id}
                className={`bg-white rounded-lg shadow-lg overflow-hidden max-w-xs ${
                  animationTriggered ? "animate-slideInFromRight" : ""
                }`} 
              >
                <Link to={`/product/${product._id}`}>
                  <div className="w-[363px] h-[200px]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <p className="text-lg font-semibold mt-2">
                    {productTranslations[product.name] || product.name}  {/* อันนี้เป็นตัวแปลงจากเมนูที่เป็นตัวแปลเป็นภาษาไทย โดยไปดึงจากไฟล์ productTranslations.tsx */}
                  </p>
                  <p className="text-blue-500 mt-2 font-bold">
                    {product.price} บาท
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 space-x-4">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className={`px-4 py-2 bg-blue-600 text-white rounded-lg shadow ${
                currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === totalPages - 1}
              className={`px-4 py-2 bg-blue-600 text-white rounded-lg shadow ${
                currentIndex === totalPages - 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </section>
      <section>
        <div className="ml-12 mb-12">
          <h1 className="text-3xl font-bold mb-8 mt-8">Shop by Category</h1>
          <div className="flex space-x-4">
            {["Meal Kits", "Wellness Meal Kits", "Prepared & Ready"].map(
              (category, index) => (
                <div
                  key={index}
                  className="text-center flex flex-col items-center min-w-[152px]"
                >
                  <Link to="">
                    <h3 className="text-lg font-semibold">{category}</h3>
                    <div className="flex justify-center mt-2">
                      <img
                        src="/food7.jpg"
                        alt={category}
                        className="w-[100px] h-[100px] object-cover rounded-lg shadow-lg"
                      />
                    </div>
                  </Link>
                </div>
              )
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
