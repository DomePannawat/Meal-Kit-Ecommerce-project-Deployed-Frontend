const PlanRight = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-center text-4xl font-semibold mb-6">
        3. Select your plan
      </h1>
      <div className="space-y-4">
        <div className="flex gap-4">
          <label htmlFor="" className="text-xl font-semibold">
            Serving per meal
          </label>
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button className="px-8 py-2 text-white bg-blue-900 font-semibold">
              2
            </button>
            <button className="px-8 py-2 text-gray-700 bg-white hover:bg-gray-100">
              4
            </button>
          </div>
        </div>
        <div className="flex gap-4">
          <label htmlFor="" className="text-xl font-semibold">
            Meals per week
          </label>
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button className="px-8 py-2 text-gray-700 bg-blue-00 font-semibold">
              2
            </button>
            <button className="px-8 py-2 text-gray-700 bg-white hover:bg-gray-100 border-l border-gray-300">
              3
            </button>
            <button className="px-8 py-2 text-gray-700 bg-white hover:bg-gray-100 border-l border-gray-300">
              4
            </button>
            <button className="px-8 py-2 text-gray-700 bg-white hover:bg-gray-100 border-l border-gray-300">
              5
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanRight;
