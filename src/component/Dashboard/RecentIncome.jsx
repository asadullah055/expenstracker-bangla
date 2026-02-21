import { LuArrowRight } from "react-icons/lu";
import TransactionCard from "../Cards/TransactionCard";
import { formatBanglaDate } from "../../utils/helper";

const RecentIncome = ({ transactions, onSeeMore }) => {

    return (
        <div className="card">
            <div className="flex items-center justify-between ">
                <h5 className="text-lg">আয়</h5>
                <button className="card-btn" onClick={onSeeMore}>
                    সব দেখুন <LuArrowRight className="text-base" />
                </button>
            </div>
            <div className="mt-6">

                {transactions?.slice(0, 5)?.map((item) => (
                    <TransactionCard
                        key={item._id}
                        title={item.category}
                        icon={item.icon}
                        date={formatBanglaDate(item.date)}
                        amount={item.amount}
                        type="income"
                        hideDeleteBtn
                    />
                ))}
            </div>
        </div>

    );
};

export default RecentIncome;
