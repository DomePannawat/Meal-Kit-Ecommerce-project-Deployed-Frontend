import React, { useState } from "react";
import { useCartContext } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useAuthContext } from "../Context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
const Delivery = () => {
  const { cartItems, updateUserInfo, clearCart } = useCartContext();
  const { token } = useAuthContext(); // ดึง token จาก AuthContext
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
        // ตรวจสอบให้ใส่ได้แค่ตัวอักษรภาษาอังกฤษและภาษาไทย (ไม่มีตัวเลขและสัญลักษณ์พิเศษ)
        validatedValue = value.replace(/[^a-zA-Z\u0E00-\u0E7F\s]/g, "");
        break;

      case "email":
        // ตรวจสอบให้เป็นอีเมลที่มี @
        validatedValue = value.replace(/[^a-zA-Z0-9@._-]/g, "");
        // เช็คว่าอีเมลมี @ หรือไม่
        if (!validatedValue.includes("@")) {
          newFormErrors.email = "กรุณากรอกอีเมลให้ถูกต้อง";
        } else {
          newFormErrors.email = ""; // ถ้าอีเมลถูกต้องก็ลบข้อความ error
        }
        break;

      case "zipcode":
        // ตรวจสอบให้เป็นตัวเลขเท่านั้น
        validatedValue = value.replace(/[^0-9]/g, "");
        break;

      case "phone":
        // ตรวจสอบให้เป็นตัวเลขเท่านั้น
        validatedValue = value.replace(/[^0-9]/g, "");
        break;

      default:
        break;
    }

    setFormData({
      ...formData,
      [name]: validatedValue,
    });
    setFormErrors(newFormErrors); // อัปเดต error ของฟอร์ม
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

      clearCart();

      if (paymentMethod === "cod") {
        // รอ state cartItems อัปเดตสำเร็จ ก่อน navigate ในกรณี COD
        setTimeout(() => {
          navigate(`/orderConfirmation/${response.data.order}`); //api ไปหา stripe
        }, 0); // หรือปรับเวลาถ้าจำเป็น
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  // เช็คว่า formData ทุกตัวถูกกรอกครบหรือไม่ และมีการเลือกวิธีการชำระเงิน
  const isFormComplete = Object.values(formData).every((value) => value !== "");
  const isPaymentSelected = paymentMethod !== "";

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-teal-50 via-white to-teal-50 ">
      <div className="bg-[#065621] text-white p-2 text-center sm:text-base md:text-2xl lg:text-2xl">
        <h1 className="font-medium typing-text">
          There's always something new and exciting to cook.
        </h1>
      </div>
      <div className="container mx-auto p-6 mb-32 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
            <div className="w-full max-w-md bg-gray-100 p-6 rounded-md shadow-lg lg:mt-10 mx-auto">
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
                {/* <div className="flex justify-center w-full border border-gray-300 p-2 rounded-md">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="stripe"
                      onChange={handlePaymentChange}
                      className="mr-2"
                    />
                    <span>
                      <img className="h-8 mx-4" src="/visa_master_logo.png" />
                    </span>
                  </label>
                </div> */}
                <div className="flex justify-center w-full border border-gray-300 p-2 rounded-md ">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      onChange={handlePaymentChange}
                      className="mr-2 "
                    />
                    <span className="h-8 mx-4 text-center flex justify-center items-center">
                      Cash on Delivery
                    </span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
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
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Delivery;
