import { useEffect, useState } from 'react';
import CustomPieChart from '../Chatrs/CustomPieChart';
import { addThousandSeparator } from '../../utils/helper';
const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4f39f6"];
const RecentIncomeWithChart = ({ data, totalIncome }) => {
    const [chartData, setChartData] = useState([]);

    const prepareChartData = () => {

        const dataArr = data?.map((item) => ({
            name: item?.category,
            amount: item?.amount,
        }));
        setChartData(dataArr);
    };
    useEffect(() => {
        prepareChartData();
        return () => { };
    }, [data]);

    return (

        <div className="card">
            <div className="flex items-center justify-between ">
                <h5 className="text-lg">গত ৬০ দিনের আয়</h5>
            </div>
            <CustomPieChart
                data={chartData}
                label="মোট আয়"
                totalAmount={`৳${addThousandSeparator(totalIncome)}`}
                showTextAnchor
                colors={COLORS}
            />
        </div>
    )
};

export default RecentIncomeWithChart;
