import { LuDownload } from 'react-icons/lu';
import TransactionCard from './../Cards/TransactionCard';
import { formatBanglaDate } from '../../utils/helper';

const IncomeList = ({ transactions, onDelete, onDownload }) => {
  
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">আয়ের তালিকা</h5>
                <button className="card-btn" onClick={onDownload}>
                    <LuDownload className="text-base" /> ডাউনলোড
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                {transactions?.map((income) => (
                    <TransactionCard
                        key={income._id}
                        title={income.category}
                        icon={income.icon}
                        date={formatBanglaDate(income.date)}
                        amount={income.amount}
                        type="income"
                        onDelete={() => onDelete(income._id)}
                    />
                ))}
            </div>
        </div>

    );
};

export default IncomeList;
