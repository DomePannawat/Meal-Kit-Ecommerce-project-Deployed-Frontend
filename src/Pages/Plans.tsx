import PlanTop from "../components/PlanTop";
import PlanLeft from "../components/PlanLeft";
import PlanRight from "../components/PlanRight";
import OrderSummary from "../components/OrderSummary";

const Plans = () => {
  return (
    <div className="max-w-screen-xl mx-auto">
      <PlanTop />
      <div className="flex">
        <div className="w-1/2">
          <PlanLeft />
        </div>
        <div className="w-1/2">
          <PlanRight />
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};

export default Plans;
