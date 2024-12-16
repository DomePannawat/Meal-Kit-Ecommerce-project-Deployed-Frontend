import React, { useState } from "react";
import Footer from "../components/Footer";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

interface FormData {
  username: string;
  password: string;
  confirmedPassword: string;
  email: string;
}

const Signup = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    confirmedPassword: "",
    email: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let formErrors: Record<string, string> = {};
    if (!formData.username.trim()) {
      formErrors.username = "Username is required.";
    }
    if (!formData.password) {
      formErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      formErrors.password = "Password must be at least 8 characters.";
    }
    if (!formData.confirmedPassword) {
      formErrors.confirmedPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmedPassword) {
      formErrors.confirmedPassword = "Passwords do not match.";
    }
    if (!formData.email) {
      formErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      formErrors.email = "Invalid email format.";
    }
    return formErrors;
  };

  // ฟังก์ชันตรวจสอบ username และ email
  const checkUserExists = async (username: string, email: string) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user`);
      const existingUsers = Array.isArray(response.data) ? response.data : [];
  
      const usernameSet = new Set(existingUsers.map((user: { name: string }) => user.name));
      const emailSet = new Set(existingUsers.map((user: { email: string }) => user.email));
  
      const usernameExists = usernameSet.has(username);
      const emailExists = emailSet.has(email);
  
      return { usernameExists, emailExists };
    } catch (error) {
      console.error("Error checking username or email:", error);
      return { usernameExists: false, emailExists: false };
    }
  };
  
  
  
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);
  
    if (Object.keys(formErrors).length === 0) {
      setLoading(true);
  
      // ตรวจสอบ username และ email ก่อนการสมัคร
      const { usernameExists, emailExists } = await checkUserExists(formData.username, formData.email);
  
      // เพิ่มการตรวจสอบ username และ email ซ้ำ
      if (usernameExists && emailExists) {
        toast.error("Both username and email are already taken. Please choose another one.");
        setLoading(false);
        return;
      }
  
      // กรณีที่ username ซ้ำ
      if (usernameExists) {
        toast.error("Username is already taken. Please choose another one.");
        setLoading(false);
        return;
      }
  
      // กรณีที่ email ซ้ำ
      if (emailExists) {
        toast.error("Email is already registered. Please choose another one.");
        setLoading(false);
        return;
      }
  
      try {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/user/register`,
          {
            name: formData.username,
            email: formData.email,
            password: formData.password,
          }
        );
        toast.success("🎉สมัครสำเร็จ! กำลังผ่านไปหน้า Login", { autoClose: 1500 });
        setTimeout(() => {
          navigate("/login", { replace: true });
          window.location.reload(); 
        }, 3000); 
      } catch (error: any) {
        console.error("Sign-up error:", error);
        
        // เพิ่มการจัดการข้อผิดพลาดจาก API ที่ตอบกลับผิด
        if (error.response) {
          const errorMessage = error.response.data.message || "Something went wrong.";
          toast.error(errorMessage);
        } else {
          toast.error("Network or server error. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    }
  };
  
  
  

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-teal-50 via-white to-teal-50">
      <ToastContainer />
      <motion.div 
        className="relative bg-[#065621] text-white py-4 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex items-center gap-4 whitespace-nowrap text-xl md:text-3xl font-medium"
        >
          <span>🎉 Welcome To Flavor Box 🎉</span>
          <span>🍳 There's always something new and exciting to cook 🍳</span>
        </motion.div>
      </motion.div>
      <div className="flex-1 flex flex-col items-center px-4 py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-[#065621] mb-8">
          Create Your Account!
        </h1>
        <form
          onSubmit={handleSignUp}
          className="w-full max-w-md bg-white/80 border border-teal-100 rounded-xl shadow-xl p-8 space-y-6"
        >
          <div className="space-y-2">
            <label htmlFor="username" className="block font-semibold text-teal-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full h-12 px-4 rounded-lg border-2 border-teal-100 focus:border-teal-500 focus:outline-none transition-colors"
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block font-semibold text-teal-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full h-12 px-4 rounded-lg border-2 border-teal-100 focus:border-teal-500 focus:outline-none transition-colors"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="confirmedPassword" className="block font-semibold text-teal-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmedPassword"
              value={formData.confirmedPassword}
              onChange={handleChange}
              className="w-full h-12 px-4 rounded-lg border-2 border-teal-100 focus:border-teal-500 focus:outline-none transition-colors"
              placeholder="Confirm your password"
            />
            {errors.confirmedPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmedPassword}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block font-semibold text-teal-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full h-12 px-4 rounded-lg border-2 border-teal-100 focus:border-teal-500 focus:outline-none transition-colors"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <button
            disabled={loading}
            className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg shadow-lg transition-colors duration-200"
            type="submit"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#065621] hover:text-[#054518] font-semibold hover:underline transition-colors"
              >
                Login Here
              </Link>
            </p>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
