import { LuDownload } from "react-icons/lu";
import TransactionCard from "../Cards/TransactionCard";
import { formatBanglaDate } from "../../utils/helper";

const ExpenseList = ({ transactions, onDelete, onEdit, onDownload }) => {
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">সব ব্যয়ের তালিকা</h5>
                <button className="card-btn" onClick={onDownload}>
                    <LuDownload className="text-base" /> ডাউনলোড
                </button>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {transactions?.map((expense) => (
                    <TransactionCard
                        key={expense._id}
                        title={expense.category}
                        icon={expense.icon}
                        date={formatBanglaDate(expense.date)}
                        amount={expense.amount}
                        type="expense"
                        onEdit={onEdit ? () => onEdit(expense) : undefined}
                        onDelete={() => onDelete(expense._id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ExpenseList;
