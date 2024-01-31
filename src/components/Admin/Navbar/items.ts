import { GoHomeFill } from "react-icons/go";
import { IoIosInformationCircle } from "react-icons/io";
import { IoIosPaper } from "react-icons/io";
import { FaStar } from "react-icons/fa6";

export const AdminNavbarItems = [
  {
    label: "Início",
    path: "/admin/dashboard",
    icon: GoHomeFill,
  },
  {
    label: "Sobre",
    path: "/admin/about",
    icon: IoIosInformationCircle,
  },
  {
    label: "Editor",
    path: "/admin/editor",
    icon: IoIosInformationCircle,
  },
  {
    label: "Posts",
    path: "/admin/posts",
    icon: IoIosPaper,
  },
  {
    label: "Avaliações",
    path: "/admin/ratings",
    icon: FaStar,
  },
];
