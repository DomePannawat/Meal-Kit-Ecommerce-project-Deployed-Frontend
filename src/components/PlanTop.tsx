const PlanTop = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-center text-4xl font-semibold mb-6">
        1. Choose Your Preferred Type of Meal
      </h1>

      <div className="flex space-x-4 max-w-4xl mx-auto">
        {/* Meal Kits*/}
        <div className="flex items-center bg-gray-50 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200">
          <div className="w-1/3 flex justify-center">
            <img
              src="../public/plan2.jpeg"
              alt="Meal Kits"
              className="w-28 h-28 rounded-md object-cover"
            />
          </div>
          <div className="w-2/3 pl-2">
            <p className="text-xl font-semibold">Meal Kits</p>
            <p className="text-gray-600">
              Ingredients and easy-to-follow recipes for home-cooked meals.
            </p>
          </div>
        </div>

        {/* Prepared & Ready*/}
        <div className="flex items-center bg-gray-50 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200">
          <div className="w-1/3 flex justify-center">
            <img
              src="../public/Plan3.jpeg"
              alt="Prepared & Ready"
              className="w-28 h-28 rounded-md object-cover"
            />
          </div>
          <div className="w-2/3 pl-2">
            <p className="text-xl font-semibold">Prepared & Ready</p>
            <p className="text-gray-600">
              Pre-made meals delivered fresh, ready in as little as 2 minutes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanTop;
