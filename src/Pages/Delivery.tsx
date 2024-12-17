import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import React, { useState } from "react";
import { useCartContext } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useAuthContext } from "../Context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const Delivery = () => {
  const { cartItems, updateUserInfo, clearCart } = useCartContext();
  const { token } = useAuthContext();
  const [showQR, setShowQR] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("");
  const [formErrors, setFormErrors] = useState({
    email: "",
    other: "",
  });
  const navigate = useNavigate();

    

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let validatedValue = value;
    let newFormErrors = { ...formErrors };

    switch (name) {
      case "firstName":
      case "lastName":
      case "country":
        validatedValue = value.replace(/[^a-zA-Z\u0E00-\u0E7F\s]/g, "");
        break;

      case "email":
        validatedValue = value.replace(/[^a-zA-Z0-9@._-]/g, "");
        if (!validatedValue.includes("@")) {
          newFormErrors.email = "กรุณากรอกอีเมลให้ถูกต้อง";
        } else {
          newFormErrors.email = "";
        }
        break;

      case "zipcode":
      case "phone":
        validatedValue = value.replace(/[^0-9]/g, "");
        break;

      default:
        break;
    }

    setFormData({
      ...formData,
      [name]: validatedValue,
    });
    setFormErrors(newFormErrors);
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const name = `${formData.firstName} ${formData.lastName}`;
    const address = `${formData.address}, ${formData.zipcode}, ${formData.country} , ${formData.phone}`;

    if (formErrors.email) {
      toast.error("กรุณากรอกอีเมลให้ถูกต้อง", {
        autoClose: 2000,
      });
      return;
    }

    updateUserInfo(name, address);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/order/insertOrders`,
        {
          name,
          address,
          cartItems,
          paymentMethod,
          totalPrice: calculateTotalPrice(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (paymentMethod === "QR-Payment") {
        setShowQR(true);

        setTimeout(() => {
          clearCart();
          navigate(`/orderConfirmation/${response.data.order}`);
        }, 15000);
      } else if (paymentMethod === "cod") {
        clearCart();
        setTimeout(() => {
          navigate(`/orderConfirmation/${response.data.order}`);
        }, 0);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("เกิดข้อผิดพลาดในการสั่งซื้อ");
    }
  };

  const isFormComplete = Object.values(formData).every((value) => value !== "");
  const isPaymentSelected = paymentMethod !== "";


  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-teal-50 via-white to-teal-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-[#065621] text-white p-2 text-center sm:text-base md:text-2xl lg:text-2xl"
      >
        <h1 className="font-medium typing-text">
          There's always something new and exciting to cook.
        </h1>
      </motion.div>

      <AnimatePresence>
        {showQR && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              className="bg-white p-8 rounded-lg shadow-xl"
              initial={{ y: -50 }}
              animate={{ y: 0 }}
            >
              <h3 className="text-xl font-bold mb-4 text-center">
                สแกน QR Code เพื่อชำระเงิน
              </h3>
              <QRCodeSVG
                value={`00020101021129370016A000000677010111011300660000000005802TH530376463048956`}
                size={256}
                className="mx-auto"
              />
              <p className="mt-4 text-center text-gray-600">
                กำลังรอการชำระเงิน...
              </p>
              
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto p-6 mb-32 mt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Delivery Information */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
              Delivery Information
            </h2>
            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="flex gap-3 mb-4">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  className="border border-gray-300 rounded py-2 px-4 w-full"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  className="border border-gray-300 rounded py-2 px-4 w-full"
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="E-mail address"
                  className="border border-gray-300 rounded py-2 px-4 w-full"
                  required
                />
                {formErrors.email && (
                  <p className="text-red-500 text-xs">{formErrors.email}</p>
                )}
              </div>

              {/* Address */}
              <div className="mb-4">
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Address"
                  className="border border-gray-300 rounded py-2 px-4 w-full"
                  required
                />
              </div>

              {/* Zipcode & Country */}
              <div className="flex gap-3 mb-4">
                <input
                  type="text"
                  name="zipcode"
                  value={formData.zipcode}
                  onChange={handleChange}
                  placeholder="Zipcode"
                  className="border border-gray-300 rounded py-2 px-4 w-full"
                  required
                />
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Country"
                  className="border border-gray-300 rounded py-2 px-4 w-full"
                  required
                />
              </div>

              {/* Phone */}
              <div className="mb-4">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="border border-gray-300 rounded py-2 px-4 w-full"
                  required
                />
              </div>
            </form>
          </div>

          {/* Cart Totals */}
          <div>
            <motion.div
              initial={{ x: 20 }}
              animate={{ x: 0 }}
              className="w-full max-w-md bg-gray-100 p-6 rounded-md shadow-lg lg:mt-10 mx-auto"
            >
              <h2 className="text-xl font-bold mb-4 border-b pb-2">
                Cart Totals
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{calculateTotalPrice().toFixed(2)} บาท</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Fee:</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-bold mb-4">
                  <span>Total:</span>
                  <span>{calculateTotalPrice().toFixed(2)} บาท</span>
                </div>
              </div>

              {/* Payment Method */}
              <h3 className="mt-6 text-lg font-semibold">Payment Method</h3>
              <div className="flex items-center mt-4 gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex justify-center w-full border border-gray-300 p-2 rounded-md"
                >
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="QR-Payment"
                      onChange={handlePaymentChange}
                      className="mr-2"
                    />
                    <span className="h-12 text-center flex justify-center items-center">
                      {/* QR Payment */} <img src="/qrpayment.png"  />
                    </span>
                  </label>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex justify-center w-full border border-gray-300 p-2 rounded-md "
                >
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      onChange={handlePaymentChange}
                      className="mr-2"
                    />
                    <span className="h-12 mx-4 text-center flex justify-center items-center">
                      Cash on Delivery
                    </span>
                  </label>
                </motion.div>
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className={`block w-full text-center bg-green-600 text-white py-2 mt-6 rounded-lg hover:bg-green-700 ${
                  !isFormComplete || !isPaymentSelected
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={!isFormComplete || !isPaymentSelected}
                onClick={handleSubmit}
              >
                Order Confirmation
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Delivery;
