import React from "react";
import Footer from "../components/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Mail, Phone } from "lucide-react";

const Contact: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-100 via-gray-100 to-teal-50 flex flex-col justify-between overflow-hidden">
      {/* Animated Header Banner */}
      <div className="relative bg-[#065621] text-white py-4 overflow-hidden">
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
          <span>📞 Contact us for more information</span>
          <span>📧 We'd love to hear from you</span>
          <span>📍 Find us easily</span>
          <span>💬 Let's connect</span>
        </motion.div>
      </div>

      <motion.div
        style={{ scale }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 py-12 md:py-16 lg:py-20"
      >
        <motion.div
          variants={itemVariants}
          className="max-w-4xl mx-auto bg-white/80 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header Section */}
          <motion.div
            initial={{ backgroundColor: "rgba(255,255,255,0)" }}
            whileHover={{ backgroundColor: "rgba(13, 148, 136, 0.1)" }}
            className="p-8 md:p-12 border-b border-teal-100"
          >
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-teal-600 text-center mb-4"
            >
              ข้อมูลติดต่อเรา
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-xl md:text-2xl text-gray-700 text-center font-bold"
            >
              Quantum-Chronicle-Saurus
            </motion.p>
          </motion.div>

          {/* Contact Information Grid */}
          <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
            {/* Address Section */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="space-y-4"
            >
              <div className="flex items-start space-x-4">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="bg-teal-100 p-3 rounded-full"
                >
                  <MapPin className="w-6 h-6 text-teal-600" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-semibold text-teal-600 mb-2">ที่อยู่</h3>
                  <p className="text-gray-600 leading-relaxed">
                    เลขที่ 120/237 หมู่บ้านสราญธร<br />
                    ถ.ไสวประชาราษฎร์<br />
                    ถนนรังสิต-องค์รักษ์ ต.บึงยี่โถ<br />
                    อ.ธัญบุรี จังหวัดปทุมธานี
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact Details */}
            <motion.div
              variants={itemVariants}
              className="space-y-6"
            >
              {/* Email */}
              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-center space-x-4"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="bg-teal-100 p-3 rounded-full"
                >
                  <Mail className="w-6 h-6 text-teal-600" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-semibold text-teal-600 mb-2">อีเมล</h3>
                  <a
                    href="mailto:Quantum_C_S@gmail.com"
                    className="text-gray-600 hover:text-teal-600 transition-colors duration-300"
                  >
                    Quantum_C_S@gmail.com
                  </a>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div
                whileHover={{ x: 10 }}
                className="flex items-center space-x-4"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="bg-teal-100 p-3 rounded-full"
                >
                  <Phone className="w-6 h-6 text-teal-600" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-semibold text-teal-600 mb-2">โทรศัพท์</h3>
                  <p className="text-gray-600">089-999-9999</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Map Section */}
          <motion.div
            variants={itemVariants}
            className="p-8 md:p-12 bg-gradient-to-b from-white/50 to-teal-50/30"
          >
            <motion.h2
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-2xl md:text-3xl font-semibold text-teal-600 mb-6 text-center flex items-center justify-center gap-2"
            >
              <MapPin className="inline-block" />
              แผนที่การเดินทาง
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="rounded-xl overflow-hidden shadow-lg"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15486.082639163727!2d100.67410225956267!3d13.98711335444578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d7ee90a05f213%3A0x13e8fd43ff036ce!2z4Lir4Lih4Li54LmI4Lia4LmJ4Liy4LiZ4Liq4Lij4Liy4LiN4LiY4LijIOC4leC4s-C4muC4pSDguJrguLbguIfguKLguLXguYjguYLguJYg4Lit4Liz4LmA4Lig4Lit4LiY4Lix4LiN4Lia4Li44Lij4Li1IOC4m-C4l-C4uOC4oeC4mOC4suC4meC4tSAxMjEzMA!5e0!3m2!1sth!2sth!4v1732540457232!5m2!1sth!2sth"
                width="100%"
                height="400"
                className="border-0"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map Location"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default Contact;