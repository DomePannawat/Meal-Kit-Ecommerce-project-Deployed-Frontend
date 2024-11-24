import React, { useState } from "react";
import { useCartContext } from "../Context/CartContext";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { productTranslations } from '../../src/components/MenuPage/productTranslations';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCartContext();
  const [quantity, setQuantity] = useState(
    cartItems.map((item) => item.quantity)
  );

  const handleQuantityChange = (index: number, value: number) => {
    if (value < 1) return;
    setQuantity((prevQuantity) => {
      const newQuantity = [...prevQuantity];
      newQuantity[index] = value;
      updateQuantity(cartItems[index]._id, value);
      return newQuantity;
    });
  };

  const totalPrice = cartItems.reduce(
    (total, item, index) => total + item.price * quantity[index],
    0
  ); <span>Free</span>

  return (
    <div>
    <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-10 mb-32">
      {/* รายการสินค้า */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
          CART
        </h1>
        {cartItems.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-xl text-gray-500">Your cart is empty.</p>
            <Link
              to="/menu"
              className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
            >
              Continue MENU
            </Link>
          </div>
        ) : (
          <ul>
            {cartItems.map((item, index) => (
              <li
                key={item._id}
                className="grid grid-cols-[1fr_2fr_1fr_1fr] items-center p-4 border-b gap-4 sm:grid-cols-[1fr_2fr_1fr] lg:grid-cols-[1fr_3fr_1fr_1fr]"
              >
                {/* รูปสินค้า */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md"
                />

                {/* รายละเอียดสินค้า */}
                <div>
                  <h2 className="font-semibold text-gray-800">
                  {productTranslations[item.name] || item.name}
                    </h2>
                  <p className="text-gray-500">
                    {(item.price * quantity[index]).toFixed(2)} บาท
                  </p>
                </div>

                {/* ปุ่มเพิ่ม/ลด จำนวนสินค้า */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      handleQuantityChange(index, quantity[index] - 1)
                    }
                    className="border px-4 py-2 text-xl rounded-md disabled:opacity-50"
                    disabled={quantity[index] <= 1}
                  >
                    -
                  </button>
                  <span className="text-lg">{quantity[index]}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(index, quantity[index] + 1)
                    }
                    className="border px-4 py-2 text-xl rounded-md"
                  >
                    +
                  </button>
                </div>

                {/* ปุ่มลบสินค้า */}
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ส่วนสรุปยอดรวม */}
      <div>
        <div className="w-full bg-gray-100 p-6 rounded-md shadow-lg lg:mt-10">
          <h2 className="text-xl font-bold mb-4">CART TOTALS</h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span>{totalPrice.toFixed(2)} บาท</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping Fee:</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between font-bold mb-4">
            <span>Total:</span>
            <span>{totalPrice.toFixed(2)}  บาท</span>
          </div>
          <Link
            to="/delivery"
            className="block text-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            PROCEED TO DELIVERY
          </Link>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default CartPage;
