
import { useEffect, useState } from "react";
import { IoMdCard } from "react-icons/io";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import InfoCard from "../../component/Cards/InfoCard";
import ExpenseTransactions from "../../component/Dashboard/ExpenseTransactions";
import FinanceOverview from "../../component/Dashboard/FinanceOverview";
import Last30DaysExpenses from "../../component/Dashboard/Last30DaysExpenses";
import RecentIncomeWithChart from "../../component/Dashboard/RecentIncomeWithChart";
import RecentTransactions from "../../component/Dashboard/RecentTransactions";
import DashboardLayout from "../../component/layout/DashboardLayout";
import { useWorkspace } from "../../context/WorkspaceContext";
import { useUserAuth } from "../../hooks/useUserAuth";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import { addThousandSeparator } from "../../utils/helper";
import RecentIncome from './../../component/Dashboard/RecentIncome';

const Home = () => {
    useUserAuth()
    const { currentWorkspace } = useWorkspace();

    const navigation = useNavigate();
    const [dashboardData, setDashboardData] = useState(null)
    const [loading, setLoading] = useState(false);

    const fetchDashboardData = async () => {
        const workspaceId =
            currentWorkspace?._id ||
            currentWorkspace?.id ||
            currentWorkspace?.companyId;

        if (!workspaceId) {
            setDashboardData(null);
            return;
        }

        setLoading(true);
        try {
            const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA, {
                params: { workspaceId },
            })
            if (response.data) {
                setDashboardData(response.data);
            }
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchDashboardData();
    }, [currentWorkspace])

    return (
        <DashboardLayout activeMenu="ড্যাশবোর্ড">
            <div className="my-5 mx-auto ">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InfoCard
                        icon={<IoMdCard />}
                        label="মোট ব্যালেন্স"
                        value={addThousandSeparator(dashboardData?.totalBalance || 0)}
                        color="bg-primary"
                    />
                    <InfoCard
                        icon={<LuWalletMinimal />}
                        label="মোট আয়"
                        value={addThousandSeparator(dashboardData?.totalIncome || 0)}
                        color="bg-orange-500"
                    />
                    <InfoCard
                        icon={<LuHandCoins />}
                        label="মোট ব্যয়"
                        value={addThousandSeparator(dashboardData?.totalExpenses || 0)}
                        color="bg-red-500"
                    />

                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <RecentTransactions
                        transaction={dashboardData?.recentTransactions}
                        onSeeMore={() => navigation("/expense")}
                    />
                    <FinanceOverview
                        totalBalance={dashboardData?.totalBalance || 0}
                        totalIncome={dashboardData?.totalIncome || 0}
                        totalExpenses={dashboardData?.totalExpenses || 0}
                    />
                    <ExpenseTransactions
                        transactions={dashboardData?.last30DaysExpenses?.transactions || []}
                        onSeeMore={() => navigation("/expense")}
                    />
                    <Last30DaysExpenses
                        data={dashboardData?.last30DaysExpenses?.transactions || []}

                    />
                    <RecentIncomeWithChart
                        data={dashboardData?.last60DaysIncome?.transactions.slice(0, 4) || []}
                        totalIncome={dashboardData?.totalIncome || 0}
                    />
                    <RecentIncome
                        transactions={dashboardData?.last60DaysIncome?.transactions || []}
                        onSeeMore={() => navigation("/income")}
                    />
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Home;
