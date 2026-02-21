import { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { prepareIncomeBarChartData } from "../../utils/helper";
import CustomsBarChart from "../Chatrs/CustomsBarChart";

const IncomeOverview = ({ transactions, onAddIncome }) => {
    const [chatData, setChatData] = useState([]);
    useEffect(() => {
        const result = prepareIncomeBarChartData(transactions);
        setChatData(result);
    }, [transactions]);
    return <div className="card">
        <div className="flex items-center justify-between ">
            <div className="">
                <h5 className="text-xl">আয়ের সারসংক্ষেপ</h5>
                <p className="text-xs  text-gray-800 mt-0.5">
                    সময়ের সাথে আপনার আয়ের প্রবণতা ট্র্যাক করুন ও বিশ্লেষণ করুন।
                </p>
            </div>
            <button className="add-btn" onClick={onAddIncome}>
                <LuPlus className="text-lg" />
                আয় যোগ করুন
            </button>
        </div>
        <div className="mt-10">
            <CustomsBarChart data={chatData} />
        </div>

    </div>;
};

export default IncomeOverview;
