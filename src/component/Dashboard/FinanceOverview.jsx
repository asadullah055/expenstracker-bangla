import CustomPieChart from "../Chatrs/CustomPieChart";
import { addThousandSeparator } from "../../utils/helper";

const COLORS = ["#875CF5", "#FA2C37", "#FF6900"];
const FinanceOverview = ({ totalBalance, totalIncome, totalExpenses }) => {
    const balanceData = [
        { name: "মোট ব্যালেন্স", amount: totalBalance },
        { name: "মোট ব্যয়", amount: totalExpenses },
        { name: "মোট আয়", amount: totalIncome },

    ]
    return (

        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">আর্থিক সারসংক্ষেপ</h5>
            </div>
            <CustomPieChart
                data={balanceData}
                label="মোট ব্যালেন্স"
                totalAmount={`৳${addThousandSeparator(totalBalance)}`}
                colors={COLORS}
                showTextAnchor
            />
        </div>
    );
};

export default FinanceOverview;
