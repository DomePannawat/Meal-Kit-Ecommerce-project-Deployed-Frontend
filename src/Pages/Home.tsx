import Footer from "../components/Footer";
import { Link } from "react-router-dom";
const Home = () => {
  const products = [
    {
      id: 1,
      image: "/food6.png",
      category: "Dinner",
      name: "Spaghetti Carbonara",
      cookTime: "20 mins",
      link: "",
    },
    {
      id: 2,
      image: "/food1.png",
      category: "Lunch",
      name: "Grilled Chicken Salad",
      cookTime: "15 mins",
      link: "",
    },
    {
      id: 3,
      image: "/food2.png",
      category: "Breakfast",
      name: "Pancmt-8 akes",
      cookTime: "10 mins",
      link: "",
    },
    {
      id: 4,
      image: "/food3.png",
      category: "Dinner",
      name: "Beef Stir Fry",
      cookTime: "25 mins",
      link: "",
    },
    {
      id: 5,
      image: "/food4.png",
      category: "Snack",
      name: "Smoothie Bowl",
      cookTime: "5 mins",
      link: "",
    },
    {
      id: 6,
      image: "/food5.png",
      category: "Lunch",
      name: "Chicken Tacos",
      cookTime: "20 mins",
      link: "",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between ">
      <div className="flex gap-x-64 pl-64 bg-blue-800 text-white p-2 text-3xl j">
        <h1>Become a Home Chef!</h1>
        <h1>There's always something new and exciting to cook.</h1>
      </div>
      <div className="flex w-full">
        <h1 className="w-1/2  flex items-center justify-center text-blue-900 text-4xl text-left bg-blue-200">
          Easy meal kits. <br />
          Quality ingredients. <br />
          Delivered to your door.
        </h1>
        <img
          src="/food7.jpg"
          alt="Lead Image"
          className="w-3/4 h-[300px] object-cover"
        />
      </div>
      <section className="flex mt-11 ">
        <div className="flex justify-center mb-8 mx-auto">
          <div className="text-center">
            <h2 className="text-4xl text-blue-900 font-bold mb-8">
              Meal Kits <br /> Featured
            </h2>
            <img
              src="/Delicious.png"
              alt="Delicious Sign"
              className="w-40 h-30 object-cover mx-auto"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 grid-rows-2 gap-4 mx-autoin-w-7xl justify-items-center mx-auto">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden max-w-xs"
            >
              <Link to={product.link}>
                <div className="w-[363px] h-[200px]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
              <div className="p-4">
                <h2 className="text-xl font-semibold">{product.category}</h2>
                <p className="text-lg mt-2">{product.name}</p>
                <p className="text-sm text-gray-600 mt-1">
                  Time to cook: {product.cookTime}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section>
        <div className="ml-12 mb-12">
          <h1 className="text-3xl font-bold mb-8 mt-8 ">Shop by Category</h1>

          <div className="flex space-x-4 ">
            <div className="text-center flex flex-col items-center min-w-[152px]  ">
              <Link to="">
                <h3 className="text-lg font-semibold">Meal Kits</h3>
                <br />
                <div className="flex justify-center">
                  <img
                    src="/food7.jpg"
                    alt="Meal Kits"
                    className="w-[100px] h-[100px] object-cover rounded-lg shadow-lg"
                  />
                </div>
              </Link>
            </div>

            <div className="text-center flex flex-col items-center min-w-[152px] ">
              <Link to="">
                <h3 className="text-lg font-semibold text-center">
                  Wellness Meal Kits
                </h3>
                <br />
                <div className="flex justify-center">
                  <img
                    src="/food7.jpg"
                    alt="Wellness Meal Kits"
                    className="w-[100px] h-[100px] object-cover rounded-lg shadow-lg"
                  />
                </div>
              </Link>
            </div>

            <div className="text-center flex flex-col items-center min-w-[152px] ">
              <Link to="">
                <h3 className="text-lg font-semibold text-center">
                  Prepared & Ready
                </h3>
                <br />
                <div className="flex justify-center">
                  <img
                    src="/food7.jpg"
                    alt="Prepared & Ready"
                    className="w-[100px] h-[100px] object-cover rounded-lg shadow-lg"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
