import { IoSettingsOutline } from "react-icons/io5";
import {
  LuHandCoins,
  LuLayoutDashboard,
  LuLogOut,
  LuWalletMinimal,
} from "react-icons/lu";

export const SIDE_MENU_DATA = [
  {
    id: "01",
    label: "ড্যাশবোর্ড",
    icon: LuLayoutDashboard,
    path: "/dashboard",
  },

  {
    id: "02",
    label: "আয়",
    icon: LuWalletMinimal,
    path: "/income",
  },

  {
    id: "03",
    label: "ব্যয়",
    icon: LuHandCoins,
    path: "/expense",
  },
  {
    id: "03",
    label: "সেটিংস",
    icon: IoSettingsOutline,
    path: "/settings",
  },

  {
    id: "06",
    label: "লগআউট",
    icon: LuLogOut,
    path: "logout",
  },
];
