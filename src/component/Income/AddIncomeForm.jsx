import { useEffect, useRef, useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import { useWorkspace } from "../../context/WorkspaceContext";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import Inputs from "../Inputes/Inputs";

const toDateInputValue = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().slice(0, 10);
};

const getIncomeTypeId = (incomeTypeId) => {
    if (!incomeTypeId) return "";
    return typeof incomeTypeId === "string" ? incomeTypeId : incomeTypeId._id || "";
};

const AddIncomeForm = ({ onAddIncome, initialData = null, submitLabel = "Save" }) => {
    const { currentWorkspace } = useWorkspace();

    const [loading, setLoading] = useState(false)
    const [incomeType, setIncomeType] = useState([])
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const dropdownRef = useRef()

    // Backend send state (CLEAN)
    const [income, setIncome] = useState({
        incomeTypeId: '',
        amount: '',
        date: '',
    })

    // UI show state (ONLY DISPLAY)
    const [selectedIncomeType, setSelectedIncomeType] = useState(null)

    const handleChange = (key, value) => {
        setIncome(prev => ({
            ...prev,
            [key]: value
        }))
    }
    const workspaceTypeLabel =
        currentWorkspace?.type === "personal" ? "Personal" : "Company";

    // Fetch Income Type
    const fetchIncomeType = async () => {
        if (loading) return;

        setLoading(true);
        try {
            const response = await axiosInstance.get(
                `${API_PATHS.INCOMECATEGORY.GET_ALL_INCOME_CATEGORY_TYPE}/${workspaceTypeLabel}`
            );

            if (response.data) {
                setIncomeType(response.data);
                setSelectedIncomeType(null);
                setIncome((prev) => ({ ...prev, incomeTypeId: "" }));
            }

        } catch (error) {
            console.log("Something went wrong", error)
            setIncomeType([]);
        } finally {
            setLoading(false);
        }
    }

    // Outside click close dropdown
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    useEffect(() => {
        fetchIncomeType();
    }, [workspaceTypeLabel])

    useEffect(() => {
        const selectedTypeId = getIncomeTypeId(initialData?.incomeTypeId);

        setIncome({
            incomeTypeId: selectedTypeId,
            amount: initialData?.amount ?? "",
            date: toDateInputValue(initialData?.date),
        });

        if (!initialData) {
            setSelectedIncomeType(null);
            return;
        }

        setSelectedIncomeType(
            incomeType.find((type) => type._id === selectedTypeId) ||
            (typeof initialData.incomeTypeId === "object" ? initialData.incomeTypeId : null)
        );
    }, [initialData, incomeType])

    return (
        <div>

            {/* Custom Dropdown */}
            <div className="mb-4 relative" ref={dropdownRef}>
                <label className="text-sm font-medium">আয়ের ধরন</label>

                <div
                    onClick={() => setDropdownOpen(prev => !prev)}
                    className="w-1/2 mt-1 p-2 border border-gray-300 rounded-lg flex justify-between items-center cursor-pointer bg-white"
                >
                    <span>
                        {selectedIncomeType?.category || "আয়ের ধরন নির্বাচন করুন"}
                    </span>

                    <HiChevronDown
                        className={`transition duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                    />
                </div>

                {dropdownOpen && (
                    <ul className="absolute w-1/2 bg-white border border-gray-300 rounded-lg mt-1 shadow-lg max-h-60 overflow-auto z-50">

                        {incomeType.length === 0 && (
                            <li className="p-2 text-gray-400">কোনো তথ্য পাওয়া যায়নি</li>
                        )}

                        {incomeType.map((type) => (
                            <li
                                key={type._id}
                                onClick={() => {

                                    // Backend state update
                                    setIncome(prev => ({
                                        ...prev,
                                        incomeTypeId: type._id
                                    }))

                                    // UI state update
                                    setSelectedIncomeType(type)

                                    setDropdownOpen(false)
                                }}
                                className="p-2 hover:bg-gray-100 cursor-pointer transition"
                            >
                                {type.category}
                            </li>
                        ))}

                    </ul>
                )}
            </div>

            {/* Amount */}
            <Inputs
                value={income.amount}
                onChange={(e) => handleChange('amount', e.target.value)}
                label="পরিমাণ"
                placeholder="পরিমান লিখুন"
                type="number"
            />

            {/* Date */}
            <Inputs
                value={income.date}
                onChange={(e) => handleChange('date', e.target.value)}
                label="তারিখ"
                type="date"
            />

            {/* Submit Button */}
            <div className="flex justify-end mt-6">
                <button
                    type='button'
                    className='add-btn add-btn-fill'
                    onClick={() => onAddIncome(income)}
                >
                    {submitLabel}
                </button>
            </div>

        </div>
    );
};

export default AddIncomeForm;
