import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DeleteAlert from "../../component/DeleteAlert";
import AddIncomeForm from "../../component/Income/AddIncomeForm";
import IncomeList from "../../component/Income/IncomeList";
import IncomeOverview from "../../component/Income/IncomeOverview";
import DashboardLayout from "../../component/layout/DashboardLayout";
import Modal from "../../component/Modal";
import { useWorkspace } from "../../context/WorkspaceContext";
import { useUserAuth } from "../../hooks/useUserAuth";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";

const Income = () => {
    useUserAuth()
    const { currentWorkspace } = useWorkspace();
    const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
    const [incomeData, setIncomeData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    });
    // Get All Income Details
    const fetchIncomeDetails = async () => {
        const workspaceId =
            currentWorkspace?._id ||
            currentWorkspace?.id ||
            currentWorkspace?.companyId;

        if (!workspaceId) {
            setIncomeData([]);
            return;
        }

        if (loading) return;
        setLoading(true);
        try {
            const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME, {
                params: { workspaceId },
            });
            if (response.data) {
                setIncomeData(response.data);
            }
        } catch (error) {
            console.log("Something went wrong. Please try again.", error)
        } finally {
            setLoading(false);
        }
    };
    // Handle Add Income

    const handleAddIncome = async (income) => {
        const workspaceId =
            currentWorkspace?._id ||
            currentWorkspace?.id ||
            currentWorkspace?.companyId;
        const { amount, date, incomeTypeId } = income;
        if (!incomeTypeId.trim()) {
            toast.error("আয়ের ধরন নির্বাচন করুন");
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

            await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
                incomeTypeId,
                amount,
                date,
                workspaceId,
            });
            setOpenAddIncomeModal(false);
            toast.success("আয়ের তথ্য সফলভাবে যোগ হয়েছে");
            fetchIncomeDetails();
        } catch (error) {
            console.error("Error adding income:", error);
            toast.error(error.response?.data?.message || "আয়ের তথ্য যোগ করা যায়নি");
        }
    };
    // Delete Income

    const deleteIncome = async (id) => {
        try {
            await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
            setOpenDeleteAlert({ show: false, data: null });
            toast.success("আয়ের তথ্য সফলভাবে মুছে ফেলা হয়েছে");
            fetchIncomeDetails();
        } catch (error) {
            console.error("Error deleting income:", error.response?.data?.message || error.message);
            toast.error("আয়ের তথ্য মুছে ফেলা যায়নি");
        }
    };

    // handle download income details
    const handleDownloadIncomeDetails = async () => {
        const workspaceId =
            currentWorkspace?._id ||
            currentWorkspace?.id ||
            currentWorkspace?.companyId;

        if (!workspaceId) {
            toast.error("ওয়ার্কস্পেস নির্বাচন করুন");
            return;
        }

        try {
            const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
                responseType: 'blob',
                params: { workspaceId },
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'income_details.xlsx');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            toast.error("আয়ের তথ্য ডাউনলোড করা যায়নি");
        }

    };
    useEffect(() => {
        fetchIncomeDetails();
        return () => { }
    }, [currentWorkspace])
    return (
        <DashboardLayout activeMenu="আয়">
            <div className="my-5 mx-auto ">
                <div className="grid grid-cols-1 gap-6">
                    <div className=""><IncomeOverview
                        transactions={incomeData}
                        onAddIncome={() => setOpenAddIncomeModal(true)}
                    /></div>
                    <IncomeList
                        transactions={incomeData}
                        onDelete={(id) => {
                            setOpenDeleteAlert({ show: true, data: id });
                        }}
                        onDownload={handleDownloadIncomeDetails}
                    />
                </div>
                <Modal
                    isOpen={openAddIncomeModal}
                    onClose={() => setOpenAddIncomeModal(false)}
                    title="আয় যোগ করুন"
                >
                    <AddIncomeForm onAddIncome={handleAddIncome} />
                </Modal>
                <Modal
                    isOpen={openDeleteAlert.show}
                    onClose={() => setOpenDeleteAlert({ show: false, data: null })}
                    title="মুছে ফেলা নিশ্চিত করুন"
                >
                    <DeleteAlert
                        content="আপনি কি এই আয়ের তথ্য মুছে ফেলতে চান?"
                        onDelete={() => {
                            deleteIncome(openDeleteAlert.data);
                        }}
                    />
                </Modal>
            </div>
        </DashboardLayout>
    );
};

export default Income;
