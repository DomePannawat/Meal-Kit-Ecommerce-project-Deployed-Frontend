import React from 'react';
import Footer from "../components/Footer";

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r flex flex-col justify-between from-teal-100 via-gray-100 to-teal-50">
      <div className="bg-[#065621] text-white p-2 text-center sm:text-base md:text-2xl lg:text-2xl ">
        <h1 className="font-medium typing-text">
          There's always something new and exciting to cook.
        </h1>
      </div>
    <div className="flex flex-col items-center py-10 bg-gradient-to-r ">
      
      {/* Contact Information */}
      <div className="max-w-3xl w-full px-6 bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-4xl font-bold text-teal-600 text-center mb-6">ข้อมูลติดต่อเรา</h1>
        <p className="text-xl text-gray-700 text-center font-bold mb-6">Quantum-Chronicle-Saurus</p>
        <p className="text-lg text-gray-700 text-center mb-4">
          เลขที่ 120/237 หมู่บ้านสราญธร ถ.ไสวประชาราษฎร์<br />
          ถนนรังสิต-องค์รักษ์ ต.บึงยี่โถ อ.ธัญบุรี<br />
          จังหวัดปทุมธานี
        </p>

        <div className="text-center mt-6">
          <p className="text-lg text-gray-700 mb-2">
            <strong>Email:</strong>{' '}
            <a href="mailto:suur@hotmail.com" className="text-teal-500 hover:underline">
            Quantum_C_S@gmail.com
            </a>
          </p>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Telephone:</strong> 089-999-9999
          </p>
        </div>

        {/* Google Map Location */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-teal-600 mb-4 text-center">
            Google Map Location
          </h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15486.082639163727!2d100.67410225956267!3d13.98711335444578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d7ee90a05f213%3A0x13e8fd43ff036ce!2z4Lir4Lih4Li54LmI4Lia4LmJ4Liy4LiZ4Liq4Lij4Liy4LiN4LiY4LijIOC4leC4s-C4muC4pSDguJrguLbguIfguKLguLXguYjguYLguJYg4Lit4Liz4LmA4Lig4Lit4LiY4Lix4LiN4Lia4Li44Lij4Li1IOC4m-C4l-C4uOC4oeC4mOC4suC4meC4tSAxMjEzMA!5e0!3m2!1sth!2sth!4v1732540457232!5m2!1sth!2sth"
            width="100%"
            height="300"
            className="border rounded-lg shadow-md"
            allowFullScreen={true}
            loading="lazy"
            title="Google Map Location"
          ></iframe>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default Contact;