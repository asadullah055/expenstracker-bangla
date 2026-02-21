import { useEffect, useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import { prepareExpenseLineChartData } from '../../utils/helper';
import CustomsLineChart from '../Chatrs/CustomsLineChart';

const ExpenseOverview = ({ transactions, onExpenseIncome }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareExpenseLineChartData(transactions);
        setChartData(result);
        return () => { };
    }, [transactions]);
    return <div className="card">

        <div className="flex items-center justify-between">
            <div className="">
                <h5 className="">ব্যয়ের সারসংক্ষেপ</h5>
                <p className="text-xs text-gray-400 mt-0.5">
                    সময়ের সাথে খরচের প্রবণতা ট্র্যাক করুন এবং টাকা কোথায় ব্যয় হচ্ছে তা বুঝুন।
                </p>
            </div>
            <button className="add-btn" onClick={onExpenseIncome}>
                <LuPlus className="text-lg" />
                ব্যয় যোগ করুন
            </button>
        </div>
        <div className="mt-10">
            <CustomsLineChart data={chartData} />
        </div>
    </div>;
};

export default ExpenseOverview;
