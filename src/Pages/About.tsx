import React from 'react';
import Footer from "../components/Footer";

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-100 via-gray-100 to-teal-50 flex flex-col justify-between">

      <div className="bg-[#065621] text-white p-2 text-center sm:text-base md:text-2xl lg:text-2xl ">
        <h1 className="font-medium typing-text">
          There's always something new and exciting to cook.
        </h1>
      </div>

      <div className="container max-w-4xl mx-auto py-16 px-6 sm:px-12">
        <h1 className="text-5xl font-extrabold text-center text-green-900 mb-12">ABOUT</h1>

        <section className="bg-white p-10 rounded-xl shadow-xl backdrop-blur-lg bg-opacity-60 mb-12">
          <h2 className="text-4xl font-semibold text-center text-green-700 mb-6">เรื่องราวของเรา</h2>
          <p className="text-xl text-gray-800 leading-relaxed text-center max-w-3xl mx-auto">
            ทีม <strong>Quantum-Chronicle-Saurus</strong> ก่อตั้งขึ้นในเดือนพฤศจิกายน 2024 ด้วยความตั้งใจในการยกระดับประสบการณ์การทำอาหารที่บ้าน โดยการนำเสนอชุดอาหารที่สะดวกและรวดเร็ว พร้อมกับการคัดสรรวัตถุดิบที่ดีที่สุดให้ลูกค้าทุกท่าน
          </p>
        </section>

        <section className="bg-white p-10 rounded-xl shadow-xl backdrop-blur-lg bg-opacity-60 mb-12">
          <h2 className="text-4xl font-semibold text-center text-green-700 mb-6">พันธกิจของเรา</h2>
          <p className="text-xl text-gray-800 leading-relaxed text-center max-w-3xl mx-auto">
            เรามุ่งมั่นที่จะให้ทุกมื้ออาหารกลายเป็นประสบการณ์ที่ไม่ซ้ำใคร ด้วยชุดอาหารที่มีคุณภาพสูงและรสชาติที่อร่อย โดยไม่ต้องกังวลเรื่องการเตรียมวัตถุดิบ
          </p>
        </section>

        <section className="bg-white p-10 rounded-xl shadow-xl backdrop-blur-lg bg-opacity-60">
          <h2 className="text-4xl font-semibold text-center text-green-700 mb-6">ทำไมต้องเลือกเรา?</h2>
          <ul className="list-inside space-y-5 text-xl text-gray-800 max-w-3xl mx-auto">
            <li className="flex items-center">
              <span className="font-semibold text-green-700 mr-4">สะดวกสบาย</span>: ชุดอาหารพร้อมปรุงประหยัดเวลาและพลังงาน
            </li>
            <li className="flex items-center">
              <span className="font-semibold text-green-700 mr-4">หลากหลาย</span>: เลือกจากเมนูอาหารไทยที่หลากหลาย
            </li>
            <li className="flex items-center">
              <span className="font-semibold text-green-700 mr-4">คุณภาพ</span>: วัตถุดิบสดใหม่และมีคุณภาพสูงทุกครั้ง
            </li>
          </ul>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default About;
