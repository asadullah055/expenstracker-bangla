import { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import Inputs from '../Inputes/Inputs';

const AddIncomeSourceForm = ({ onAddIncome }) => {

    const [income, setIncome] = useState({
        type: '',
        category: '',
    });

    const [openType, setOpenType] = useState(false);

    const types = ["Personal", "Company"];
    const typeLabelMap = {
        Personal: "ব্যক্তিগত",
        Company: "প্রতিষ্ঠান",
    };

    const handleChange = (key, value) => {
        setIncome(prev => ({ ...prev, [key]: value }));
    };

    const handleSelectType = (value) => {
        handleChange("type", value);
        setOpenType(false);
    };

    return (
        <div className="space-y-5">

            {/* TYPE DROPDOWN */}
            <div className="relative">
                <label className="block text-[14px] text-slate-800 font-semibold mb-1">
                    ধরন
                </label>

                <div
                    onClick={() => setOpenType(!openType)}
                    className="w-1/2 border border-gray-300 rounded-lg px-4 py-2 cursor-pointer bg-white flex justify-between items-center"
                >
                    <span className={income.type ? "text-gray-800" : "text-gray-400"}>
                        {income.type ? typeLabelMap[income.type] : "ধরন নির্বাচন করুন"}
                    </span>

                    <span ><MdKeyboardArrowDown size={20} />
                    </span>
                </div>

                {openType && (
                    <ul className="absolute z-50 mt-2 w-1/2 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                        {types.map((item) => (
                            <li
                                key={item}
                                onClick={() => handleSelectType(item)}
                                className="px-4 py-2 hover:bg-purple-50 hover:text-purple-600 cursor-pointer transition"
                            >
                                {typeLabelMap[item]}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* SOURCE INPUT */}
            <Inputs
                value={income.category}
                onChange={(e) => handleChange('category', e.target.value)}
                label="আয়ের ক্যাটাগরি"
                placeholder="আয়ের ক্যাটাগরি লিখুন"
                type="text"
            />

            {/* BUTTON */}
            <div className="flex justify-end mt-6">
                <button
                    type='button'
                    className='add-btn add-btn-fill'
                    onClick={() => onAddIncome(income)}
                >
                    আয়ের ক্যাটাগরি যোগ করুন
                </button>
            </div>

        </div>
    );
};

export default AddIncomeSourceForm;
