import { useEffect, useRef, useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import { useWorkspace } from "../../context/WorkspaceContext";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import Inputs from "../Inputes/Inputs";

const AddExpenseForm = ({ onAddExpense }) => {
    const { currentWorkspace } = useWorkspace();

    const [loading, setLoading] = useState(false);
    const [expenseType, setExpenseType] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const dropdownRef = useRef();

    const [expense, setExpense] = useState({
        expenseTypeId: '',
        amount: '',
        date: '',
    });
    const [selectedExpenseType, setSelectedExpenseType] = useState(null);

    const handleChange = (key, value) => {
        setExpense((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const workspaceTypeLabel =
        currentWorkspace?.type === "personal" ? "Personal" : "Company";

    const fetchExpenseType = async () => {
        if (loading) return;

        setLoading(true);
        try {
            const response = await axiosInstance.get(
                `${API_PATHS.EXPENSECATEGORY.GET_ALL_EXPENSE_CATEGORY_TYPE}/${workspaceTypeLabel}`
            );
            if (response.data) {
                setExpenseType(response.data);
                setSelectedExpenseType(null);
                setExpense((prev) => ({ ...prev, expenseTypeId: "" }));
            }
        } catch (error) {
            console.log("Something went wrong", error);
            setExpenseType([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        fetchExpenseType();
    }, [workspaceTypeLabel]);

    return (
        <div>
            <div className="mb-4 relative" ref={dropdownRef}>
                <label className="text-sm font-medium">ব্যয়ের ধরন</label>
                <div
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    className="w-1/2 mt-1 p-2 border border-gray-300 rounded-lg flex justify-between items-center cursor-pointer bg-white"
                >
                    <span>
                        {selectedExpenseType?.category || "ব্যয়ের ধরন নির্বাচন করুন"}
                    </span>
                    <HiChevronDown
                        className={`transition duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                    />
                </div>

                {dropdownOpen && (
                    <ul className="absolute w-1/2 bg-white border border-gray-300 rounded-lg mt-1 shadow-lg max-h-60 overflow-auto z-50">
                        {expenseType.length === 0 && (
                            <li className="p-2 text-gray-400">কোনো তথ্য পাওয়া যায়নি</li>
                        )}

                        {expenseType.map((type) => (
                            <li
                                key={type._id}
                                onClick={() => {
                                    setSelectedExpenseType(type);
                                    setExpense((prev) => ({
                                        ...prev,
                                        expenseTypeId: type._id || "",
                                    }));
                                    setDropdownOpen(false);
                                }}
                                className="p-2 hover:bg-gray-100 cursor-pointer transition"
                            >
                                {type.category}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <Inputs
                value={expense.amount}
                onChange={(e) => handleChange("amount", e.target.value)}
                label="পরিমাণ"
                placeholder="পরিমাণ লিখুন"
                type="number"
            />
            <Inputs
                value={expense.date}
                onChange={(e) => handleChange("date", e.target.value)}
                label="তারিখ"
                placeholder=""
                type="date"
            />

            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    className="add-btn add-btn-fill"
                    onClick={() => onAddExpense(expense)}
                >
                    ব্যয় যোগ করুন
                </button>
            </div>
        </div>
    );
};

export default AddExpenseForm;
