import React from "react";
import Footer from "../components/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, ChefHat, Utensils } from "lucide-react";

const InfoSection: React.FC<{
  title: string;
  description: string | JSX.Element[];
  gradientFrom: string;
  gradientTo: string;
  icon?: JSX.Element;
}> = ({ title, description, gradientFrom, gradientTo, icon }) => (
  <motion.section
    whileHover={{ scale: 1.02 }}
    className="bg-white/80 p-12 rounded-2xl shadow-2xl backdrop-blur-lg mb-12 transform transition-all duration-300 relative overflow-hidden group"
  >
    <motion.div
      initial={{ opacity: 0 }}
      whileHover={{ opacity: 0.1 }}
      className={`absolute inset-0 bg-gradient-to-r ${gradientFrom} ${gradientTo}`}
    />
    {icon && (
      <motion.h2 className="text-4xl font-semibold text-center text-green-800 mb-8 relative">
        {icon}
        {title}
      </motion.h2>
    )}
    <motion.div className="text-xl text-gray-800 leading-relaxed text-center max-w-3xl mx-auto">
      {Array.isArray(description) ? (
        description.map((item, index) => <p key={index}>{item}</p>)
      ) : (
        <p>{description}</p>
      )}
    </motion.div>
  </motion.section>
);

const About: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-100 via-gray-100 to-teal-50 flex flex-col justify-between overflow-hidden">
      {/* Animated Header Banner */}
      <div className="relative bg-[#065621] text-white py-3 overflow-hidden">
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex items-center gap-4 whitespace-nowrap text-xl md:text-2xl font-medium"
        >
          <span>🌟 There's always something new and exciting to cook</span>
          <span>🍳 Discover the joy of cooking with us</span>
          <span>🥘 Fresh ingredients, amazing flavors</span>
          <span>👨‍🍳 Cook like a pro at home</span>
        </motion.div>
      </div>

      {/* Main Content Section */}
      <motion.div
        style={{ scale }}
        className="container max-w-4xl mx-auto py-16 px-6 sm:px-12 relative"
      >
        {/* Decorative Elements */}
        <motion.div
          animate={{ y: ["-2", "2"] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute -left-20 top-40 text-green-600 opacity-20 transform scale-150"
        >
          <ChefHat size={100} />
        </motion.div>
        <motion.div
          animate={{ y: ["-2", "2"] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute -right-20 top-80 text-green-600 opacity-20 transform scale-150"
        >
          <Utensils size={100} />
        </motion.div>

        <motion.h1
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="text-6xl font-extrabold text-center text-green-900 mb-16 relative"
        >
          <motion.span
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-8 -left-8"
          >
            ✨
          </motion.span>
          ABOUT
          <motion.span
            animate={{ rotate: [360, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-8 -right-8"
          >
            ✨
          </motion.span>
        </motion.h1>

        {/* Info Sections */}
        <InfoSection
          title="เรื่องราวของเรา"
          description="ทีม Quantum-Chronicle-Saurus ก่อตั้งขึ้นในเดือนพฤศจิกายน 2024 ด้วยความตั้งใจในการยกระดับประสบการณ์การทำอาหารที่บ้าน..."
          gradientFrom="from-green-400"
          gradientTo="to-teal-500"
          icon={<Sparkles className="inline-block mr-2 mb-1" />}
        />

        <InfoSection
          title="พันธกิจของเรา"
          description="เรามุ่งมั่นที่จะให้ทุกมื้ออาหารกลายเป็นประสบการณ์ที่ไม่ซ้ำใคร ด้วยชุดอาหารที่มีคุณภาพสูงและรสชาติที่อร่อย โดยไม่ต้องกังวลเรื่องการเตรียมวัตถุดิบ"
          gradientFrom="from-teal-400"
          gradientTo="to-green-500"
        />

        <InfoSection
          title="ทำไมต้องเลือกเรา?"
          description={[
            <span key="1">
              <span className="font-bold text-[#065621]">สะดวกสบาย :</span>{" "}
              ชุดอาหารพร้อมปรุงประหยัดเวลาและพลังงาน
            </span>,
            <span key="2">
              <span className="font-bold text-[#065621]">หลากหลาย :</span>{" "}
              เลือกจากเมนูอาหารไทยที่หลากหลาย
            </span>,
            <span key="3">
              <span className="font-bold text-[#065621]">คุณภาพ :</span>{" "}
              วัตถุดิบสดใหม่และมีคุณภาพสูงทุกครั้ง
            </span>,
          ]}
          gradientFrom="from-green-500"
          gradientTo="to-teal-400"
        />
      </motion.div>

      <Footer />
    </div>
  );
};

export default About;
