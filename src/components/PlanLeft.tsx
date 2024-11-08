const PlanLeft = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-center text-4xl font-semibold mb-6">
        2. Choose your Preferences
      </h1>

      <div className="space-y-4 max-w-md mx-auto">
        {/* Chef Favorites*/}
        <div className="flex items-center bg-gray-50 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200">
          <div className="w-1/3 flex justify-center">
            <img
              src="../public/chef.png"
              alt="Meal Kits"
              className="w-16 h-16 rounded-md object-cover"
            />
          </div>
          <div className="w-2/3 ">
            <p className="text-xl font-semibold">Chef Favorites</p>
            <p className="text-gray-600">Our Test Kitchen's top picks</p>
          </div>
        </div>

        {/* Wellness*/}
        <div className="flex items-center bg-gray-50 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200">
          <div className="w-1/3 flex justify-center">
            <img
              src="../public/wellness.png"
              alt="Prepared & Ready"
              className="w-16 h-16 rounded-md object-cover"
            />
          </div>
          <div className="w-2/3 ">
            <p className="text-xl font-semibold">Wellness</p>
            <p className="text-gray-600">
              Nutritionist-approved recipes that don't sacrifice flavor.
            </p>
          </div>
        </div>

        {/* Family Friendly*/}
        <div className="flex items-center bg-gray-50 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200">
          <div className="w-1/3 flex justify-center">
            <img
              src="../public/family.png"
              alt="Prepared & Ready"
              className="w-16 h-16 rounded-md object-cover"
            />
          </div>
          <div className="w-2/3 ">
            <p className="text-xl font-semibold">Family Friendly</p>
            <p className="text-gray-600">
              Classic flavor the whole family will love.
            </p>
          </div>
        </div>

        {/* Fast and Easy*/}
        <div className="flex items-center bg-gray-50 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200">
          <div className="w-1/3 flex justify-center">
            <img
              src="../public/clock.png"
              alt="Prepared & Ready"
              className="w-16 h-16 rounded-md object-cover"
            />
          </div>
          <div className="w-2/3 ">
            <p className="text-xl font-semibold">Fast & Easy</p>
            <p className="text-gray-600">
              Recipe designed for low prep or quick cook times.
            </p>
          </div>
        </div>

        {/* Veggies*/}
        <div className="flex items-center bg-gray-50 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200">
          <div className="w-1/3 flex justify-center">
            <img
              src="../public/broccoli.png"
              alt="Prepared & Ready"
              className="w-16 h-16 rounded-md object-cover"
            />
          </div>
          <div className="w-2/3 ">
            <p className="text-xl font-semibold">Veggies</p>
            <p className="text-gray-600">
              Meat free meal highlighting seasonally inspired produce.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanLeft;
