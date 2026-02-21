import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { addThousandSeparator } from '../../utils/helper';

const CustomsLineChart = ({ data }) => {
    const CustomsTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (<div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
                <p className='text-xs font-semibold text-purple-800 mb-1'>{payload[0].payload.category}</p>
                <p className='text-sm text-gray-600'>পরিমাণ: <span className='text-sm font-medium text-gray-900'>৳{addThousandSeparator(payload[0].payload.amount)}</span></p>
            </div>
            )
        }
        return null;
    };

    return (
        <div className='bg-white'>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#875cf5" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#875cf5" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid stroke='none' />
                    <XAxis dataKey="month" stroke="none" tick={{ fill: '#555', fontSize: 12 }} />
                    <YAxis stroke='none' tick={{ fill: '#555', fontSize: 12 }} />
                    <Tooltip content={<CustomsTooltip />} />
                    <Area type="monotone" dataKey="amount" stroke="#875cf5" fillOpacity={1} fill="url(#incomeGradient)" strokeWidth={3} dot={{ r: 3, fill: '#ab8df8' }} />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomsLineChart;
