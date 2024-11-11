import Footer from "../../components/Footer";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMenuContext } from "../../Context/MenuContext";
import { useCartContext } from "../../Context/CartContext";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { menuItems } = useMenuContext();
  const { addToCart } = useCartContext();
  const [productData, setProductData] = useState<any>(null);
  const [quantity, setQuantity] = useState<number>(1); // สถานะสำหรับจำนวนที่เลือก
  const navigate = useNavigate();

  useEffect(() => {
    const item = menuItems.find((menuItem) => menuItem._id === id);
    if (item) {
      setProductData(item);
    }
  }, [id, menuItems]);

  if (!productData)
    return <p className="text-center mt-10">กำลังโหลดข้อมูลสินค้า...</p>;

  const handleAddToCart = () => {
    // ส่งข้อมูลสินค้าและจำนวนแยกกันไปยัง addToCart
    addToCart(productData, quantity); // ส่งทั้ง item และ quantity
  };

  return (
    <div className="min-h-screen flex flex-col justify-between ">
      <div className="container mx-auto p-6">
        {/* ปุ่มย้อนกลับ */}
        <button
          onClick={() => navigate(-1)}
          className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg shadow-md mb-5"
        >
          ย้อนกลับ
        </button>
      </div>
      <div className="flex flex-col md:flex-row gap-8 container mx-auto p-6">
        {/* ภาพสินค้า */}
        <div className="flex-1">
          <img
            src={productData.image}
            alt={productData.name}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* ข้อมูลสินค้า */}
        <div className="flex-1 space-y-4">
          <h1 className="text-4xl font-bold text-gray-800">
            {productData.name}
          </h1>
          <p className="text-2xl font-semibold text-green-600">
            {productData.price} บาท
          </p>
          <p className="text-gray-600">{productData.description}</p>
          
          <p className="text-gray-900 text-lg font-bold" >รายละเอียดของสินค้า</p>
          <p className="text-gray-600">วิธีเก็บรักษา : {productData.ingredients}</p>
          <p className="text-gray-600">วิธีเก็บรักษา : {productData.storageInstructions}</p>
          <p className="text-gray-600">คุณค่าทางโภชนาการ : {productData.nutrition}</p>
          <p className="text-gray-600">ขนาด : {productData.size}</p>

          {/* การเลือกจำนวนสินค้า */}
          <div className="flex items-center space-x-4 mt-4">
            <label
              htmlFor="quantity"
              className="text-lg font-medium text-gray-800"
            >
              จำนวน:
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              min="1"
              className="w-20 text-center border border-gray-300 rounded-lg py-2 px-4"
            />
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition duration-200 mt-6"
          >
            เพิ่มลงตะกร้า
          </button>
        </div>
      </div>

      {/* ข้อมูลเพิ่มเติมและรีวิว */}
      <div className="mt-12 container mx-auto p-6">
        <hr className="my-8 border-gray-300" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          ข้อมูลเพิ่มเติม
        </h3>
        <p className="text-gray-600 mb-6">
          {productData.longDescription || "รายละเอียดเพิ่มเติมยังไม่มี"}
        </p>

        {/* ตัวอย่างรีวิว */}
        <div className="mt-8 mb-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            รีวิวจากลูกค้า
          </h3>
          <div className="space-y-6">
            {/* ตัวอย่างรีวิว */}
            <div className="p-4 bg-gray-100 rounded-lg shadow-md">
              <p className="font-semibold">ผู้ใช้: John Doe</p>
              <p>“สินค้านี้ยอดเยี่ยมมาก! คุณภาพดีและรสชาติถูกปาก”</p>
            </div>

            <div className="p-4 bg-gray-100 rounded-lg shadow-md">
              <p className="font-semibold">ผู้ใช้: John Doe</p>
              <p>“สินค้านี้ยอดเยี่ยมมาก! คุณภาพดีและรสชาติถูกปาก”</p>
            </div>

            <div className="p-4 bg-gray-100 rounded-lg shadow-md">
              <p className="font-semibold">ผู้ใช้: John Doe</p>
              <p>“สินค้านี้ยอดเยี่ยมมาก! คุณภาพดีและรสชาติถูกปาก”</p>
            </div>

            <div className="p-4 bg-gray-100 rounded-lg shadow-md">
              <p className="font-semibold">ผู้ใช้: John Doe</p>
              <p>“สินค้านี้ยอดเยี่ยมมาก! คุณภาพดีและรสชาติถูกปาก”</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
