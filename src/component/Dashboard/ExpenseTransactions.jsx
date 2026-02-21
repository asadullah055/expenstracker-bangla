import { LuArrowRight } from 'react-icons/lu';
import TransactionCard from '../Cards/TransactionCard';
import { formatBanglaDate } from '../../utils/helper';

const ExpenseTransactions = ({ transactions, onSeeMore }) => {
    return (
        <div className="card">
            <div className="flex items-center justify-between ">
                <h5 className="text-lg">ব্যয়</h5>
                <button className="card-btn" onClick={onSeeMore}>
                    সব দেখুন <LuArrowRight className="text-base" />
                </button>
            </div>
            <div className="mt-6">

                {transactions?.slice(0, 5)?.map((expense) => (
                    <TransactionCard
                        key={expense._id}
                        title={expense.category}
                        icon={expense.icon}
                        date={formatBanglaDate(expense.date)}
                        amount={expense.amount}
                        type="expense"
                        hideDeleteBtn
                    />
                ))}

            </div>
        </div>
    );
};

export default ExpenseTransactions;
