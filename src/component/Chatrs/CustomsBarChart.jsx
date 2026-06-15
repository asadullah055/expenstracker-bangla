import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { addThousandSeparator } from '../../utils/helper';

const CustomsBarChart = ({ data }) => {

    const getBarColor = (index) => {
        return index % 2 === 0 ? '#875cf5' : '#cfbefb';
    }
    const CustomTooltip = ({ active, payload, }) => {
        if (active && payload && payload.length) {
            const label = payload[0]?.payload.category || payload[0]?.payload.month || "";
            return (
                <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
                    <p className="text-xs font-semibold text-purple-800 mb-1">{label}</p>
                    <p className="text-xs text-gray-600">পরিমাণ: <span className='text-sm font-medium text-gray-900'>৳{addThousandSeparator(payload[0].value)}</span></p>
                </div>
            );
        }
        return null;
    };
    return (
        <div className='bg-white mt-6'>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid stroke="none" />
                    <XAxis dataKey={data[0]?.month ? "month" : "category"} tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
                    <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
                    <Tooltip content={CustomTooltip} />
                    <Bar dataKey="amount" fill="#FF8042" radius={[10, 10, 0, 0]} activeDot={{ r: 8, fill: "yellow" }} activeStyle={{ fill: "green" }} >

                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={getBarColor(index)} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomsBarChart;
