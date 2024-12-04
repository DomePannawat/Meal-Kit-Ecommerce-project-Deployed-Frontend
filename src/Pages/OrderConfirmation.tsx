import { useCartContext } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import { productTranslations } from '../../src/components/MenuPage/productTranslations';
import { motion } from "framer-motion";

const OrderConfirmation = () => {
  const { cartItems, totalAmount, userInfo, clearCart, clearUserInfo } = useCartContext();
  const navigate = useNavigate();

  const handleGoHome = () => {
    clearCart();
    clearUserInfo();
    navigate("/");
  };

  const handleGoToOrders = () => {
    navigate("/order");
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="bg-gradient-to-r from-green-700 to-green-600 text-white p-4 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="font-medium text-xl sm:text-2xl md:text-3xl">
          Thank you for using our shopping service
        </h1>
      </motion.div>

      <motion.div 
        className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-xl mt-10 mb-10 m-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
      >
        <motion.h2 
          className="text-3xl font-semibold text-gray-800 mb-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          การสั่งซื้อเสร็จสมบูรณ์
        </motion.h2>

        <motion.div 
          className="mb-6 p-6 bg-green-50 rounded-xl border border-green-100"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-gray-700 mb-3">ข้อมูลการสั่งซื้อ</h3>
          <p className="text-gray-600 mb-2">
            <strong>ชื่อผู้ซื้อ:</strong> {userInfo.name}
          </p>
          <p className="text-gray-600">
            <strong>ที่อยู่จัดส่ง:</strong> {userInfo.address}
          </p>
          
        </motion.div>

        <motion.div 
          className="mb-6 p-6 bg-green-50 rounded-xl border border-green-100"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-gray-700 mb-3">รายการสินค้า</h3>
          <ul className="space-y-4">
            {cartItems.map((item, index) => (
              <motion.li 
                key={item._id} 
                className="flex justify-between text-gray-600 pb-2 border-b border-green-100 last:border-0"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <span>{productTranslations[item.name] || item.name}</span>
                <span>{item.quantity} x {item.price.toFixed(2)} บาท</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div 
          className="mb-8 p-6 bg-green-50 rounded-xl border border-green-100"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-gray-700 mb-3">สรุปยอดเงิน</h3>
          <p className="text-gray-600 text-lg">
            <strong>ยอดรวม:</strong> {totalAmount.toFixed(2)} บาท
          </p>
        </motion.div>

        <div className="space-y-4">
          <motion.button
            onClick={handleGoToOrders}
            className="w-full py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            ติดตามสถานะสินค้า
          </motion.button>

          <motion.button
            onClick={handleGoHome}
            className="w-full py-3 text-lg font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            กลับไปที่หน้า Homepage
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OrderConfirmation;