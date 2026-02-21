import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWorkspace } from '../../context/WorkspaceContext';
import { UserContext } from '../../context/userContext';
import { SIDE_MENU_DATA } from '../../utils/data';
import CharAvatar from '../Cards/CharAvatar';
const SideMenu = ({ activeMenu }) => {
    const { user, clearUser } = useContext(UserContext);
    const { currentWorkspace } = useWorkspace();

    const navigate = useNavigate();
    const displayName = currentWorkspace?.name || currentWorkspace?.companyName || user?.fullName || "";
    const isPersonalWorkspace =
        !currentWorkspace ||
        currentWorkspace?.type === "personal" ||
        currentWorkspace?._id === user?._id;
    const workspaceImageUrl = isPersonalWorkspace
        ? user?.profileImageUrl
        : currentWorkspace?.profileImageUrl ||
        currentWorkspace?.companyImageUrl ||
        currentWorkspace?.logoUrl ||
        currentWorkspace?.imageUrl ||
        "";
    const profileImageSrc = workspaceImageUrl
        ? `${workspaceImageUrl}${workspaceImageUrl.includes("?") ? "&" : "?"}v=${encodeURIComponent(currentWorkspace?.updatedAt || currentWorkspace?._id || user?.updatedAt || user?._id || "1")}`
        : "";

    const handleClick = (route) => {
        if (route === "logout") {
            handelLogout();
            return;
        }
        navigate(route);
    };

    const handelLogout = () => {
        localStorage.clear();
        clearUser();
        navigate("/login");
    };
    return (
        <div className='w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20'>
            <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
                {
                    profileImageSrc ? (
                        <img
                            src={profileImageSrc}
                            alt="প্রোফাইল"
                            className="w-20 h-20 rounded-full bg-slate-400"
                        />
                    ) : <CharAvatar
                        fullName={displayName}
                        width="w-20"
                        height="h-20"
                        style="text-xl"
                    />
                }
                <h5 className='text-gray-950 font-medium leading-6'>
                    {displayName}
                </h5>
            </div>
            {
                SIDE_MENU_DATA.map((menu, index) => (
                    <button
                        key={`menu_${index}`}
                        className={`w-full flex items-center gap-4 text-[15px] ${activeMenu === menu.label ? "text-white bg-primary" : ""} py-3 px-6 rounded-lg mb-3 cursor-pointer`}
                        onClick={() => handleClick(menu.path)}
                    >
                        <menu.icon className="text-xl" />
                        <span>{menu.label}</span>
                    </button>
                ))
            }
        </div>
    );
};

export default SideMenu;
