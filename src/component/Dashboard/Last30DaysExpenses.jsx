import { useEffect, useState } from 'react';
import { prepareExpenseBarChartData } from '../../utils/helper';
import CustomsBarChart from '../Chatrs/CustomsBarChart';

const Last30DaysExpenses = ({ data }) => {


    const [chartData, setChartData] = useState([]);


    useEffect(() => {
        const result = prepareExpenseBarChartData(data);
        setChartData(result);
        return () => { };
    }, [data]);

    return (

        <div className="card col-span-1">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">গত ৩০ দিনের ব্যয়</h5>
            </div>
            <CustomsBarChart data={chartData} />
        </div>
    );
};

export default Last30DaysExpenses;
