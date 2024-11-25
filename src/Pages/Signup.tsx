import React, { useState } from "react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

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

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="flex justify-center mt-10 font-bold text-3xl">
        <h1>Create Your Account!</h1>
      </div>
      <div className="flex justify-center mt-6">
        <form
          onSubmit={handleSignUp}
          className="flex flex-col justify-center items-center bg-gray-50 border border-gray-50 rounded-lg shadow-lg p-8 w-[350px]"
        >
          <label htmlFor="username" className="font-semibold">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="border rounded w-full h-[35px] mt-2 px-2"
            placeholder="Username"
          />
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">{errors.username}</p>
          )}
          <label htmlFor="password" className="font-semibold mt-4">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="border rounded w-full h-[35px] mt-2 px-2"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
          <label htmlFor="confirmedPassword" className="font-semibold mt-4">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmedPassword"
            value={formData.confirmedPassword}
            onChange={handleChange}
            className="border rounded w-full h-[35px] mt-2 px-2"
            placeholder="Confirm Password"
          />
          {errors.confirmedPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.confirmedPassword}
            </p>
          )}
          <label htmlFor="email" className="font-semibold mt-4">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border rounded w-full h-[35px] mt-2 px-2"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
          <button className="border h-[35px] w-[120px] bg-orange-500 text-white font-semibold rounded mt-6">
            Sign Up
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
