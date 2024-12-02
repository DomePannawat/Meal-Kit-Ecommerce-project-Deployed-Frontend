import { useCartContext } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import { productTranslations } from '../../src/components/MenuPage/productTranslations';

const OrderConfirmation = () => {
  const { cartItems, totalAmount, userInfo, clearCart, clearUserInfo } =
    useCartContext(); 
  const navigate = useNavigate(); // ใช้สำหรับการนำทางไปหน้า Homepage

  // ฟังก์ชันรีเซ็ตตระกร้าและไปหน้า Homepage
  const handleGoHome = () => {
    clearCart(); 
    clearUserInfo(); 
    navigate("/"); 
  };

  return (
    <div>
      <div className="bg-[#065621] text-white p-2 text-center sm:text-base md:text-2xl lg:text-2xl">
        <h1 className="font-medium typing-text">
        Thank you for using our shopping service..
        </h1>
      </div>
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-2xl mt-10 mb-10">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        การสั่งซื้อเสร็จสมบูรณ์
      </h2>

      {/* ข้อมูลการสั่งซื้อ */}
      <div className="mb-6 p-4 bg-green-50 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">ข้อมูลการสั่งซื้อ</h3>
        <p className="text-gray-600 mb-1">
          <strong>ชื่อผู้ซื้อ:</strong> {userInfo.name}
        </p>
        <p className="text-gray-600">
          <strong>ที่อยู่จัดส่ง:</strong> {userInfo.address}
        </p>
      </div>

      {/* รายการสินค้า */}
      
      <div className="mb-6 p-4 bg-green-50 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">รายการสินค้า</h3>
        <ul className="space-y-4">
          {cartItems.map((item) => (
            <li key={item._id} className="flex justify-between text-gray-600">
              <span>
              {productTranslations[item.name] || item.name}
                </span>
              <span>
                {item.quantity} x {item.price.toFixed(2)} บาท
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* สรุปยอดเงิน */}
      <div className="mb-6 p-4 bg-green-50 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">สรุปยอดเงิน</h3>
        <p className="text-gray-600">
          <strong>ยอดรวม:</strong> {totalAmount.toFixed(2)} บาท
        </p>
      </div>

      {/* ปุ่มกลับไปหน้า Homepage */}
      <button
        onClick={handleGoHome}
        className="w-full py-3 text-lg font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-200"
      >
        กลับไปที่หน้า Homepage
      </button>
    </div>
    </div>
  );
};

export default OrderConfirmation;
