import { IconType } from "react-icons/lib";
import {
  LuBadgeCheck,
  LuBookmark,
  LuLayoutDashboard,
  LuLogOut,
  LuPenTool,
  LuVote,
} from "react-icons/lu";

export type SideMenuItem = {
  id: string;
  label: string;
  icon: IconType;
  path: string;
};

export const SIDE_MENU_DATA: SideMenuItem[] = [
  {
    id: "01",
    label: "Dashboard",
    icon: LuLayoutDashboard,
    path: "/dashboard",
  },
  {
    id: "02",
    label: "Yeni Anket",
    icon: LuVote,
    path: "/yeni-anket",
  },
  {
    id: "03",
    label: "Benim Anketlerim",
    icon: LuPenTool,
    path: "/anketlerim",
  },
  {
    id: "04",
    label: "Oylanan Anketler",
    icon: LuBadgeCheck,
    path: "/oylananlar",
  },
  {
    id: "05",
    label: "Kaydedilenler",
    icon: LuBookmark,
    path: "/kaydedilenler",
  },
  {
    id: "06",
    label: "Çıkış",
    icon: LuLogOut,
    path: "/cikis",
  },
];
