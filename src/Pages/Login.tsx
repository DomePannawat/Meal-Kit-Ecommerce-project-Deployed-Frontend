import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ตรวจสอบความถูกต้องของข้อมูล
    if (!email || !password) {
      setError("กรุณากรอกข้อมูลให้ครบถ้วน.");
      return;
    }

    // ตัวเทสล็อคอิน email และ password บรรทัด 24-33 ต้องเอาออกอยู่ละ อันนี้เอาไว้เทสเฉยๆ ฝั่ง font-end
    if (email === "admin@gmail.com" && password === "12345678") {
      // Login สำเร็จ
      setIsSubmitting(true);
      setTimeout(() => {
        navigate("/"); 
      }, 1000); 
    } else {
      setError("อีเมล์หรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  /*   สำหรับ back-end ตอนนี้คอมเม้นไว้ก่อน เผื่อจะได้กลับมาใช้
  try {
      setIsSubmitting(true);
      // ส่งข้อมูล email และ password ไปยัง back-end ด้วย axios
      const response = await axios.post("http://your-api-endpoint/login", {
        email,
        password,
      });

      // ถ้า response.status === 200 หรือสำเร็จ
      if (response.data.success) {
        // Login สำเร็จ
        setTimeout(() => {
          navigate("/"); // หลังจากล็อกอินเสร็จให้ไปที่หน้า Home
        }, 1000);
      } else {
        setError("อีเมล์หรือรหัสผ่านไม่ถูกต้อง");
      }
    } catch (error) {
      setError("เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์");
    } finally {
      setIsSubmitting(false);
    }
  };
  */

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-teal-50 via-white to-teal-50 ">
      <div className="relative bg-[#065621] text-white py-4 overflow-hidden">
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
          <span> 🎉 Welcome To Flavor box 🎉</span>
          <span>🍳 There's always something new and exciting to cook.🍳</span>
        </motion.div>
      </div>
      <div className="flex-1 mb-20">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mt-8 md:mt-10"
        >
          <motion.h1
            whileHover={{ scale: 1.05 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-teal-700 relative"
          >
            Welcome
            <motion.span
              className="absolute -top-1 -right-20 text-yellow-400 "
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              ✨
            </motion.span>
          </motion.h1>
        </motion.div>

        {/* Login Form Container */}
        <motion.div
          className="flex justify-center px-4 sm:px-6 lg:px-8"
        >
          <motion.form
            className="flex flex-col justify-center items-center bg-white/80  border border-teal-100 rounded-2xl shadow-xl p-8 w-full max-w-md mt-8 md:mt-12"
            onSubmit={handleSubmit}
          >
            <motion.div
              className="w-full space-y-2"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <label htmlFor="email" className="block font-semibold text-teal-700">
                Email
              </label>
              <motion.input
                type="email"
                id="email"
                className="border-2 border-teal-100 rounded-lg w-full h-12 px-4 focus:outline-none focus:border-teal-500 transition-colors"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </motion.div>

            <motion.div
              className="w-full space-y-2 mt-6"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <label htmlFor="password" className="block font-semibold text-teal-700">
                Password
              </label>
              <motion.input
                type="password"
                id="password"
                className="border-2 border-teal-100 rounded-lg w-full h-12 px-4 focus:outline-none focus:border-teal-500 transition-colors"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </motion.div>

            {/* แสดงข้อผิดพลาด */}
            {error && (
              <motion.p
                className="text-red-500 text-sm mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {error}
              </motion.p>
            )}

            {/* Login Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 w-full max-w-[200px] h-12 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg shadow-lg transition-colors duration-200"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </motion.button>

            {/* Create Account Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-center"
            >
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-teal-600 hover:text-teal-700 font-semibold hover:underline transition-colors"
                >
                  Create account
                </Link>
              </p>
            </motion.div>

          </motion.form>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;