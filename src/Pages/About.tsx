import React from 'react';

const About: React.FC = () => {
  return (
    <div className="about-container bg-gradient-to-br from-green-100 via-green-50 to-green-200 p-8 sm:p-12 md:p-20 rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold text-center text-green-800 mb-10">About Me</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-center text-green-700 mb-6">เรื่องราวของเรา</h2>
        <p className="text-gray-800 leading-relaxed text-center max-w-3xl mx-auto">
          ทีม <strong>Quantum-Chronicle-Saurus</strong> ได้ถือกำเนิดขึ้นในเดือนพฤศจิกายน 2024 ด้วยวิสัยทัศน์ร่วมกันที่จะเปลี่ยนแปลงวิธีการเตรียมอาหารที่บ้านของผู้คนในยุคปัจจุบัน...
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-center text-green-700 mb-6">พันธกิจของเรา</h2>
        <p className="text-gray-800 leading-relaxed text-center max-w-3xl mx-auto">
          เรามุ่งมั่นที่จะช่วยให้ลูกค้าเพลิดเพลินไปกับศิลปะการทำอาหาร โดยไม่ต้องกังวลกับการซื้อหาวัตถุดิบ...
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-center text-green-700 mb-6">ทำไมต้องเลือกเรา?</h2>
        <ul className="list-disc list-inside space-y-4 text-left text-center text-gray-800 max-w-2xl mx-auto">
          <li><strong>สะดวกสบาย</strong>: ประหยัดเวลาและแรงด้วยชุดอาหารพร้อมปรุง</li>
          <li><strong>หลากหลาย</strong>: เพลิดเพลินไปกับตัวเลือกเมนูอาหารไทย</li>
          <li><strong>คุณภาพ</strong>: ส่วนผสมสดใหม่และคุณภาพสูงที่เตรียมมาอย่างดี</li>
        </ul>
      </section>
    </div>
  );
};

export default About;