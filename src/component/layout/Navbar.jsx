import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiChevronDown, HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { UserContext } from "../../context/userContext";
import { useWorkspace } from "../../context/WorkspaceContext";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import Inputs from "../Inputes/Inputs";
import Modal from "../Modal";
import SideMenu from "./SideMenu";

const Navbar = ({ activeMenu }) => {
    const { user } = useContext(UserContext);

    const [openSideMenu, setOpenSideMenu] = useState(false);
    const [openWorkspace, setOpenWorkspace] = useState(false);
    const [openAddCompanyModal, setOpenAddCompanyModal] = useState(false);

    const [companyName, setCompanyName] = useState("");
    const [loading, setLoading] = useState(false);

    const [workspaces, setWorkspaces] = useState([]);

    const { currentWorkspace, setCurrentWorkspace } = useWorkspace();
    const getWorkspaceId = (workspace) =>
        workspace?._id || workspace?.id || workspace?.companyId || null;
    const isSameWorkspace = (a, b) => {
        const idA = getWorkspaceId(a);
        const idB = getWorkspaceId(b);
        if (idA && idB) return idA === idB;

        const nameA = a?.name || a?.companyName;
        const nameB = b?.name || b?.companyName;
        return !!nameA && !!nameB && nameA === nameB && a?.type === b?.type;
    };

    // ================= FETCH ALL WORKSPACES =================
    const fetchAllWorkspaces = async (preferredWorkspaceId = null) => {
        try {
            setLoading(true);

            const res = await axiosInstance.get(
                API_PATHS.COMPANY.GET_ALL_COMPANY
            );

            const companies = res?.data || [];

            // Personal Workspace from User
            const personalWorkspace = user
                ? {
                    _id: user._id,
                    name: user.fullName,
                    type: "personal",
                }
                : null;

            const finalWorkspaces = personalWorkspace
                ? [personalWorkspace, ...companies]
                : companies;

            setWorkspaces(finalWorkspaces);

            if (finalWorkspaces.length > 0) {
                const preferredWorkspace = preferredWorkspaceId
                    ? finalWorkspaces.find((ws) => getWorkspaceId(ws) === preferredWorkspaceId)
                    : null;
                const currentWorkspaceId = getWorkspaceId(currentWorkspace);
                const matchedById = currentWorkspaceId
                    ? finalWorkspaces.find((ws) => getWorkspaceId(ws) === currentWorkspaceId)
                    : null;
                const currentWorkspaceName = currentWorkspace?.name || currentWorkspace?.companyName;
                const matchedByName = !matchedById && currentWorkspaceName
                    ? finalWorkspaces.find(
                        (ws) =>
                            (ws.name || ws.companyName) === currentWorkspaceName &&
                            ws.type === currentWorkspace?.type
                    )
                    : null;
                const matchedWorkspace = preferredWorkspace || matchedById || matchedByName;

                if (matchedWorkspace) {
                    if (!isSameWorkspace(matchedWorkspace, currentWorkspace)) {
                        setCurrentWorkspace(matchedWorkspace);
                    }
                } else if (!currentWorkspace) {
                    setCurrentWorkspace(finalWorkspaces[0]);
                }
            }
        } catch (error) {
            console.log(error);
            toast.error("ওয়ার্কস্পেস লোড করা যায়নি");
        } finally {
            setLoading(false);
        }
    };

    // ================= ADD COMPANY =================
    const handleAddWorkspace = async () => {
        if (!companyName.trim()) {
            toast.error("প্রতিষ্ঠানের নাম আবশ্যক");
            return;
        }

        try {
            const addCompanyRes = await axiosInstance.post(API_PATHS.COMPANY.ADD_COMPANY, {
                companyName,
            });
            const createdCompany =
                addCompanyRes?.data?.company ||
                addCompanyRes?.data?.data ||
                addCompanyRes?.data;
            const newCompanyId = getWorkspaceId(createdCompany);

            toast.success("প্রতিষ্ঠান সফলভাবে যোগ হয়েছে");

            setCompanyName("");
            setOpenAddCompanyModal(false);

            await fetchAllWorkspaces(newCompanyId); // Refresh list + focus new company
        } catch (error) {
            toast.error(error.response?.data?.message || "প্রতিষ্ঠান যোগ করা যায়নি");
        }
    };

    // ================= LOAD WHEN USER READY =================
    useEffect(() => {
        if (user) {
            fetchAllWorkspaces();
        }
    }, [user]);

    // ================= RENDER =================
    return (
        <>
            <div className="flex items-center justify-between gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
                {/* LEFT */}
                <div className="flex items-center gap-4">
                    <button
                        className="block lg:hidden text-black"
                        onClick={() => setOpenSideMenu(!openSideMenu)}
                    >
                        {openSideMenu ? (
                            <HiOutlineX className="text-2xl" />
                        ) : (
                            <HiOutlineMenu className="text-2xl" />
                        )}
                    </button>

                    <h2 className="text-lg font-semibold text-black">
                        খরচ ট্র্যাকার
                    </h2>

                    {/* WORKSPACE SWITCHER */}
                    <div className="relative">
                        <button
                            onClick={() => setOpenWorkspace(!openWorkspace)}
                            className="flex items-center justify-between gap-2 border border-gray-300 px-3 py-2 rounded-lg min-w-60 hover:bg-gray-50 transition cursor-pointer"
                        >
                            <span className="text-sm font-medium">
                                {currentWorkspace?.name || currentWorkspace?.companyName || "লোড হচ্ছে..."}
                            </span>
                            <HiChevronDown />
                        </button>

                        {openWorkspace && (
                            <div className="absolute top-12 left-0 min-w-60 bg-white border border-gray-200 rounded-xl shadow-lg p-2 z-50">
                                {workspaces.map((ws) => (
                                    <button
                                        key={ws._id}
                                        onClick={() => {
                                            setCurrentWorkspace(ws);
                                            setOpenWorkspace(false);
                                        }}
                                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-sm cursor-pointer"
                                    >
                                        {ws.name || ws.companyName}
                                    </button>
                                ))}

                                <div className="border-t border-gray-300 my-2"></div>

                                <button
                                    onClick={() => {
                                        setOpenAddCompanyModal(true);
                                        setOpenWorkspace(false);
                                    }}
                                    className="w-full text-left px-3 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded-lg cursor-pointer"
                                >
                                    + প্রতিষ্ঠান যোগ করুন
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* MOBILE SIDE MENU */}
                {openSideMenu && (
                    <div className="fixed top-[61px] -ml-4 bg-white">
                        <SideMenu activeMenu={activeMenu} />
                    </div>
                )}
            </div>

            {/* ADD COMPANY MODAL */}
            <Modal
                isOpen={openAddCompanyModal}
                onClose={() => {
                    setOpenAddCompanyModal(false);
                    setCompanyName("");
                }}
                title="প্রতিষ্ঠান যোগ করুন"
            >
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleAddWorkspace();
                    }}
                >
                    <Inputs
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        label="প্রতিষ্ঠানের নাম"
                        placeholder="প্রতিষ্ঠানের নাম লিখুন"
                        type="text"
                    />

                    <div className="flex justify-end mt-6">
                        <button
                            type="submit"
                            className="add-btn add-btn-fill"
                        >
                            ওয়ার্কস্পেস যোগ করুন
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default Navbar;
