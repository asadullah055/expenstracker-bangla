
import { addThousandSeparator } from "../../utils/helper";

const CustomTooltip = ({ active, payload }) => {
    if (!active || !Array.isArray(payload) || payload.length === 0) return null;

    const item = payload[0];
    return (
        <div className='bg-white shadow-md rounded-lg p-2 border border-gray-300'>
            <p className="text-xs font-semibold text-purple-800 mb-1">
                {item?.name}
            </p>

            <p className="text-sm text-gray-600">
                পরিমাণ:
                <span className="text-sm font-medium text-gray-900">
                    ৳{addThousandSeparator(item?.value)}
                </span>
            </p>
        </div>
    );
};

export default CustomTooltip;
