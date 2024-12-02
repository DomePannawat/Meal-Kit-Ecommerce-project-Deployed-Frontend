import React, { useState } from "react";
import { useCartContext } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Delivery = () => {
  const { cartItems, updateUserInfo } = useCartContext();
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
  const navigate = useNavigate();

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value); 
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const name = `${formData.firstName} ${formData.lastName}`;
    const address = `${formData.address}, ${formData.zipcode}, ${formData.country}`;

    updateUserInfo(name, address); 
    console.log("Form data submitted:", formData, "Payment Method:", paymentMethod);

    
    navigate("/orderConfirmation"); 
  };

  // เช็คว่า formData ทุกตัวถูกกรอกครบหรือไม่ และมีการเลือกวิธีการชำระเงิน
  const isFormComplete = Object.values(formData).every((value) => value !== "");
  const isPaymentSelected = paymentMethod !== ""; 

  return (
    <div>
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
              <div className="flex justify-center w-full border border-gray-300 p-2 rounded-md">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="stripe"
                    onChange={handlePaymentChange}
                    className="mr-2"
                  />
                  <span><img className="h-8 mx-4" src="/visa_master_logo.png"  /></span>
                </label>
              </div>
              <div className="flex justify-center w-full border border-gray-300 p-2 rounded-md ">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    onChange={handlePaymentChange}
                    className="mr-2 "
                  />
                  <span className="h-8 mx-4 text-center flex justify-center items-center">Cash on Delivery</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`block w-full text-center bg-green-600 text-white py-2 mt-6 rounded-lg hover:bg-green-700 ${
                !isFormComplete || !isPaymentSelected ? "opacity-50 cursor-not-allowed" : ""
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
