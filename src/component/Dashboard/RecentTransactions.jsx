import { LuArrowRight } from 'react-icons/lu';
import TransactionCard from '../Cards/TransactionCard';
import { formatBanglaDate } from '../../utils/helper';

const RecentTransactions = ({ transaction, onSeeMore }) => {

    return (
        <div className="card">
            <div className="flex items-center justify-between ">
                <h5 className="text-lg">সাম্প্রতিক লেনদেন</h5>
                <button className="card-btn" onClick={onSeeMore}>
                    সব দেখুন <LuArrowRight className="text-base" />
                </button>
            </div>
            <div className="mt-6">
                {
                    transaction?.slice(0, 5).map((item) => (
                        <TransactionCard
                            key={item._id}
                            title={item.type === "expense" ? item.category : item.category}
                            icon={item.icon}
                            date={formatBanglaDate(item.date)}
                            amount={item.amount}
                            type={item.type}
                            hideDeleteBtn
                        />
                    ))
                }
            </div>

        </div>
    );
};

export default RecentTransactions;
