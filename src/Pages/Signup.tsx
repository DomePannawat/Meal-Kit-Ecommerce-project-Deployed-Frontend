import React, { useState } from "react";
import Footer from "../components/Footer";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
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
    } else if (formData.password.length < 6) {
      formErrors.password = "Password must be at least 6 characters.";
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
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      alert(`Sign-up successful! Welcome, ${formData.username}!`);
      navigate("/login");
    }
  };
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };
  const formVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-teal-50 via-white to-teal-50">
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
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex items-center gap-4 whitespace-nowrap text-xl md:text-3xl font-medium"
        >
          <span>🎉 Welcome To Flavor box 🎉</span>
          <span>🍳 There's always something new and exciting to cook 🍳</span>
        </motion.div>
      </motion.div>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 flex flex-col items-center px-4 py-8 md:py-12"
      >
        <motion.h1
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-[#065621] mb-8 relative"
        >
          Create Your Account!
          <motion.span
            className="absolute -top-2 -right-8 text-yellow-400"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            ✨
          </motion.span>
        </motion.h1>
        <motion.form
          variants={formVariants}
          onSubmit={handleSignUp}
          className="w-full max-w-md bg-white/80 border border-teal-100 rounded-xl shadow-xl p-8 space-y-6"
        >
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <label htmlFor="username" className="block font-semibold text-teal-700">
              Username
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
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
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-2"
          >
            <label htmlFor="password" className="block font-semibold text-teal-700">
              Password
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
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
          </motion.div>
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-2"
          >
            <label htmlFor="confirmedPassword" className="block font-semibold text-teal-700">
              Confirm Password
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
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
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-2"
          >
            <label htmlFor="email" className="block font-semibold text-teal-700">
              Email
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
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
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg shadow-lg transition-colors duration-200"
            type="submit"
          >
            Sign Up
          </motion.button>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-6"
          >
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#065621] hover:text-[#054518] font-semibold hover:underline transition-colors"
              >
                Login Here
              </Link>
            </p>
          </motion.div>
        </motion.form>
      </motion.div>
      <Footer />
    </div>
  );
};
export default Signup;