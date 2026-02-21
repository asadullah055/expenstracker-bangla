import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DeleteAlert from "../../component/DeleteAlert";
import AddExpenseForm from "../../component/Expense/AddExpenseForm";
import ExpenseList from "../../component/Expense/ExpenseList";
import ExpenseOverview from "../../component/Expense/ExpenseOverview";
import DashboardLayout from "../../component/layout/DashboardLayout";
import Modal from "../../component/Modal";
import { useWorkspace } from "../../context/WorkspaceContext";
import { useUserAuth } from "../../hooks/useUserAuth";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";

const Expense = () => {
    useUserAuth()
    const { currentWorkspace } = useWorkspace();
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
    const [expenseData, setExpenseData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    });
    // Get All Expense Details

    const fetchExpenseDetails = async () => {
        const workspaceId =
            currentWorkspace?._id ||
            currentWorkspace?.id ||
            currentWorkspace?.companyId;
        if (!workspaceId) {
            setExpenseData([]);
            return;
        }
        if (loading) return;
        setLoading(true);
        try {
            const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE, {
                params: { workspaceId },
            });
            if (response.data) {
                setExpenseData(response.data);
            }
        } catch (error) {
            console.log("Something went wrong. Please try again.", error)
        } finally {
            setLoading(false);
        }
    };
    // Handle Add Expense

    const handleAddExpense = async (expense) => {
        const workspaceId =
            currentWorkspace?._id ||
            currentWorkspace?.id ||
            currentWorkspace?.companyId;
        const { expenseTypeId, amount, date } = expense;
        if (!expenseTypeId?.trim()) {
            toast.error("খরচের ধরন নির্বাচন করুন");
            return;
        }
        if (!workspaceId) {
            toast.error("ওয়ার্কস্পেস নির্বাচন করুন");
            return;
        }
        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            toast.error("সঠিক পরিমাণ লিখুন");
            return;
        }
        if (!date) {
            toast.error("তারিখ নির্বাচন করুন");
            return;
        }
        try {

            await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
                expenseTypeId,
                amount,
                date,
                workspaceId,
            });
            setOpenAddExpenseModal(false);
            toast.success("খরচের তথ্য সফলভাবে যোগ হয়েছে");
            fetchExpenseDetails();
        } catch (error) {
            console.error("Error adding expense:", error);
            toast.error(error.response?.data?.message || "খরচের তথ্য যোগ করা যায়নি");
        }
    };
    // handle delete expense details
    const deleteExpense = async (id) => {
        try {
            await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
            setOpenDeleteAlert({ show: false, data: null });
            toast.success("খরচের তথ্য সফলভাবে মুছে ফেলা হয়েছে");
            fetchExpenseDetails();
        } catch (error) {
            console.error("Error deleting expense:", error.response?.data?.message || error.message);
            toast.error("খরচের তথ্য মুছে ফেলা যায়নি");
        }
    };
    // handle download expense details
    const handleDownloadExpenseDetails = async () => {
        const workspaceId =
            currentWorkspace?._id ||
            currentWorkspace?.id ||
            currentWorkspace?.companyId;

        if (!workspaceId) {
            toast.error("ওয়ার্কস্পেস নির্বাচন করুন");
            return;
        }

        try {
            const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
                responseType: 'blob',
                params: { workspaceId },
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'expense_details.xlsx');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            toast.error("খরচের তথ্য ডাউনলোড করা যায়নি");
        }

    };
    useEffect(() => {
        fetchExpenseDetails();
        return () => { }
    }, [currentWorkspace])

    return (
        <DashboardLayout activeMenu="ব্যয়">
            <div className="my-5 mx-auto ">
                <div className="grid grid-cols-1 gap-6">
                    <ExpenseOverview transactions={expenseData}
                        onExpenseIncome={() => setOpenAddExpenseModal(true)}
                    />
                    <ExpenseList
                        transactions={expenseData}
                        onDelete={(id) => {
                            setOpenDeleteAlert({ show: true, data: id });
                        }}
                        onDownload={handleDownloadExpenseDetails}
                    />
                </div>


                <Modal
                    isOpen={openAddExpenseModal}
                    onClose={() => setOpenAddExpenseModal(false)}
                    title="ব্যয় যোগ করুন"
                >
                    <AddExpenseForm onAddExpense={handleAddExpense}
                    />
                </Modal>
                <Modal
                    isOpen={openDeleteAlert.show}
                    onClose={() => setOpenDeleteAlert({ show: false, data: null })}
                    title="মুছে ফেলা নিশ্চিত করুন"
                >
                    <DeleteAlert
                        content="আপনি কি এই খরচের তথ্য মুছে ফেলতে চান?"
                        onDelete={() => {
                            deleteExpense(openDeleteAlert.data);
                        }}
                    />
                </Modal>
            </div>
        </DashboardLayout>
    );
};

export default Expense;
