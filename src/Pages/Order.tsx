import { useState, useEffect } from "react";
import { useMenuContext } from "../Context/MenuContext";
import { motion } from "framer-motion";
import { productTranslations } from "../components/MenuPage/productTranslations";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../Context/AuthContext";
import moment from "moment";

interface OrderProduct {
  name: string;
  image: string;
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  totalPrice: number;
  status: string;
  orderProduct: OrderProduct[];
  date: string;
}

const formatDate = (dateString: Date) => {
  return moment(dateString).format("DD/MM/YYYY HH:mm:ss");
};

const Order = () => {
  const { menuItems } = useMenuContext();
  const [orderItems, setOrderItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true); // เพิ่มสถานะโหลดข้อมูล
  const { id } = useParams<{ id: string }>();
  const { token } = useAuthContext();

  // for fetching data from backend
  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const _id = id;
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/order/listOrders`,
          { _id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrderItems(response.data.orders);

        // ตรวจสอบข้อมูลก่อนเซ็ต
        if (response.data?.order) {
          setOrderItems(response.data.orders);
        } else {
          console.error("No order data returned from API");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setTimeout(() => setIsLoading(false), 500);
      }
    };

    fetchOrderItems();
  }, [token, menuItems]);

  return (
    <div>
      <div className="relative bg-[#065621] text-white py-3 overflow-hidden">
        <motion.div
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 40,
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
              ติดตามและจัดการคำสั่งซื้อของคุณ
            </motion.p>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
              className="h-1 w-16 bg-green-600 mx-auto mt-4"
            />
          </div>

          {/* ปุ่มรีเฟรชเว็บไซต์ */}
          <div className="flex justify-end mb-2">
            <button
              onClick={() => window.location.reload()}
              className=" bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
            >
              Refresh
            </button>
          </div>

          {isLoading ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 bg-white rounded-xl shadow-sm"
            >
              <div className="mx-auto h-16 w-16 text-gray-300">
                <motion.span
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-4xl"
                >
                  ⏳
                </motion.span>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Loading orders...
              </h3>
            </motion.div>
          ) : orderItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 bg-white rounded-xl shadow-sm"
            >
              <div className="mx-auto h-16 w-16 text-gray-300">
                <motion.span
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-4xl"
                >
                  📦
                </motion.span>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                No orders yet
              </h3>
              <p className="mt-2 text-gray-500">
                When you place orders, they will appear here
              </p>
            </motion.div>
          ) : (
            orderItems.map((order, index) => (
              <motion.div
                key={order._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="transition-transform duration-300 mb-10"
              >
                <div className="overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <div className="p-6">
                    <div className="text-lg font-semibold text-gray-900 mb-3">
                      วันที่สั่งซื้อ: {" "}
                      <span className="text-green-600">
                        {formatDate(order.date)}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {order.orderProduct.map(
                        (product: OrderProduct, idx: number) => (
                          <motion.div
                            key={idx}
                            initial={{ scale: 0.9 }}
                            whileHover={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg"
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded-md shadow-md"
                            />
                            <div>
                              <h4 className="font-medium text-gray-700">
                                {productTranslations[product.name] ||
                                  product.name}
                              </h4>
                              <p className="text-sm text-gray-500">
                                จำนวน: {product.quantity}
                              </p>
                              <p className="text-sm text-gray-500">
                                ราคา: {product.price} บาท
                              </p>
                            </div>
                          </motion.div>
                        )
                      )}
                    </div>
                    <div className="mt-4 text-right">
                      <p className="font-semibold text-lg text-green-600">
                        รวมทั้งหมด: {order.totalPrice} บาท
                      </p>
                      <p className="text-sm text-gray-500">
                        สถานะการจัดส่ง: {order.status}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Order;
