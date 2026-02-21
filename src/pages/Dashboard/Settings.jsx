import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AddExpenseSourceForm from "../../component/Expense/AddExpenseSourceForm";
import AddIncomeSourceForm from "../../component/Income/AddIncomeSourceForm";
import Inputs from "../../component/Inputes/Inputs";
import Modal from "../../component/Modal";
import ExpenseSettings from "../../component/Settings/ExpenseSettings";
import IncomeSettings from "../../component/Settings/IncomeSettings";
import DashboardLayout from "../../component/layout/DashboardLayout";
import { useWorkspace } from "../../context/WorkspaceContext";
import { useUserAuth } from "../../hooks/useUserAuth";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";

const Settings = () => {
    useUserAuth();

    const [activeTab, setActiveTab] = useState("income");
    const [openAddIncomeSourceModal, setOpenAddIncomeSourceModal] = useState(false);
    const [openAddExpenseSourceModal, setOpenAddExpenseSourceModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [linkingWhatsapp, setLinkingWhatsapp] = useState(false);

    const [incomeSources, setIncomeSources] = useState([]);
    const [expenseSources, setExpenseSources] = useState([
    ]);
    const [whatsappPhone, setWhatsappPhone] = useState("");
    const [linkedWhatsapp, setLinkedWhatsapp] = useState(null);
    const { currentWorkspace } = useWorkspace();


    const fetchExpenseCategoryDetails = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await axiosInstance.get(API_PATHS.EXPENSECATEGORY.GET_ALL_EXPENSE_CATEGORY);
            if (response.data) {
                setExpenseSources(response.data);
            }
        } catch (error) {
            console.log("Something went wrong. Please try again.", error)
        } finally {
            setLoading(false);
        }
    };
    const fetchIncomeCategoryDetails = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const response = await axiosInstance.get(API_PATHS.INCOMECATEGORY.GET_ALL_INCOME_CATEGORY);
            if (response.data) {
                setIncomeSources(response.data);
            }
        } catch (error) {
            console.log("Something went wrong. Please try again.", error)
        } finally {
            setLoading(false);
        }
    };


    const handleAddIncomeSource = async (income) => {
        const { category, type } = income;
        if (!category.trim()) {
            toast.error("ক্যাটাগরি আবশ্যক");
            return;
        }
        if (!type) {
            toast.error("ধরন আবশ্যক");
            return;
        }

        try {

            await axiosInstance.post(API_PATHS.INCOMECATEGORY.ADD_EXPENSE_CATEGORY, {
                category,
                type,
            });
            setOpenAddExpenseSourceModal(false);
            toast.success("আয়ের ক্যাটাগরি সফলভাবে যোগ হয়েছে");
            fetchIncomeCategoryDetails();
        } catch (error) {
            console.error("Error adding expense:", error);
            toast.error(error.response?.data?.message || "আয়ের ক্যাটাগরি যোগ করা যায়নি");
        }
        setOpenAddIncomeSourceModal(false);
    };
    const handleAddExpenseSource = async (expense) => {
        const { category, type } = expense;
        if (!category.trim()) {
            toast.error("ক্যাটাগরি আবশ্যক");
            return;
        }
        if (!type) {
            toast.error("ধরন আবশ্যক");
            return;
        }

        try {

            await axiosInstance.post(API_PATHS.EXPENSECATEGORY.ADD_EXPENSE_CATEGORY, {
                category,
                type,
            });
            setOpenAddExpenseSourceModal(false);
            toast.success("ব্যয়ের ক্যাটাগরি সফলভাবে যোগ হয়েছে");
            fetchExpenseCategoryDetails();
        } catch (error) {
            console.error("Error adding expense:", error);
            toast.error(error.response?.data?.message || "ব্যয়ের ক্যাটাগরি যোগ করা যায়নি");
        }

    };

    const handleLinkWhatsapp = async () => {
        const phoneNumber = whatsappPhone.trim();
        if (!phoneNumber) {
            toast.error("WhatsApp number is required");
            return;
        }

        const workspaceId =
            currentWorkspace?._id ||
            currentWorkspace?.id ||
            currentWorkspace?.companyId;
        const isPersonalWorkspace = !currentWorkspace?.type || currentWorkspace?.type?.toLowerCase() === "personal";

        const payload = { phoneNumber };
        if (workspaceId && !isPersonalWorkspace) {
            payload.workspaceId = workspaceId;
        }

        try {
            setLinkingWhatsapp(true);
            const response = await axiosInstance.post(API_PATHS.WHATSAPP.LINK, payload);
            setLinkedWhatsapp(response?.data || null);
            setWhatsappPhone(response?.data?.phoneNumber || phoneNumber);
            toast.success("WhatsApp linked successfully");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Unable to link WhatsApp");
        } finally {
            setLinkingWhatsapp(false);
        }
    };
    useEffect(() => {
        fetchExpenseCategoryDetails();
        return () => { }
    }, [])
    useEffect(() => {
        fetchIncomeCategoryDetails();
        return () => { }
    }, [])
    return (
        <DashboardLayout  activeMenu={"সেটিংস"}>
            <div className="my-5 mx-auto card">
                <div className="flex items-center gap-3 mb-6">
                    <button
                        onClick={() => setActiveTab("income")}
                        className={`px-8 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${activeTab === "income"
                            ? "bg-primary text-white"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                            }`}
                    >
                        আয়
                    </button>

                    <button
                        onClick={() => setActiveTab("expense")}
                        className={`px-8 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${activeTab === "expense"
                            ? "bg-primary text-white"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                            }`}
                    >
                        ব্যয়
                    </button>
                </div>

                {activeTab === "income" ? (

                    <IncomeSettings
                        onOpenModal={() => setOpenAddIncomeSourceModal(true)}
                        sources={incomeSources}

                    />
                ) : (
                    <ExpenseSettings
                        onOpenModal={() => setOpenAddExpenseSourceModal(true)}
                        sources={expenseSources}
                    />
                )}

                <div className="card mt-6">
                    <h5 className="text-lg">WhatsApp Connection</h5>
                    <p className="text-sm text-gray-600 mt-1">
                        Use this WhatsApp number to connect your account. Enter the same number you will send messages from (example: +8801XXXXXXXXX).
                    </p>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 items-end">
                        <Inputs
                            value={whatsappPhone}
                            onChange={(e) => setWhatsappPhone(e.target.value)}
                            label="WhatsApp Number"
                            placeholder="+8801XXXXXXXXX"
                            type="text"
                        />
                        <button
                            type="button"
                            className="add-btn add-btn-fill h-[48px] px-6 disabled:opacity-60 disabled:cursor-not-allowed"
                            onClick={handleLinkWhatsapp}
                            disabled={linkingWhatsapp}
                        >
                            {linkingWhatsapp ? "Connecting..." : "Connect"}
                        </button>
                    </div>

                    <p className="text-xs text-gray-500 mt-3">
                        After connecting, you can message like: "expense grocery 850" or "this month expense".
                    </p>

                    {linkedWhatsapp?.phoneNumber && (
                        <p className="text-sm text-green-600 mt-3">
                            Connected number: {linkedWhatsapp.phoneNumber}
                        </p>
                    )}
                </div>

                <Modal
                    isOpen={openAddIncomeSourceModal}
                    onClose={() => setOpenAddIncomeSourceModal(false)}
                    title="আয়ের উৎস যোগ করুন"
                >
                    <AddIncomeSourceForm onAddIncome={handleAddIncomeSource} />
                </Modal>
                <Modal
                    isOpen={openAddExpenseSourceModal}
                    onClose={() => setOpenAddExpenseSourceModal(false)}
                    title="ব্যয়ের উৎস যোগ করুন"
                >
                    <AddExpenseSourceForm onAddExpenseSource={handleAddExpenseSource} />
                </Modal>
            </div>
        </DashboardLayout>
    );
};

export default Settings;
