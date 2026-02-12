import "./SidebarBottom.css";
import { User, Settings, LayoutDashboard, Users, UserPen } from "lucide-react";
import Sidebarnavigation from "../../../components/sidebarnavigations/Sidebarnavigation";

const navigations = [
  { to: "/myprofile", label: "Мой профиль", Icon: User },
  { to: "/feed", label: "Лента", Icon: LayoutDashboard },
];

const settings = [
  { to: "/settings", label: "Настройки", Icon: Settings },
  { to: "/EditProfile", label: "Редактировать профиль", Icon: UserPen },
]

const SidebarBottom = () => {
  return (
    <div className="navigations">
      <div className="sidebar-card-button">
        {navigations.map((item) => (
          <Sidebarnavigation key={item.to} {...item} />
        ))}
      </div>
      <div className="sidebar-card-button">
        {settings.map((item) => (
          <Sidebarnavigation key={item.to} {...item} />
        ))}
      </div>
    </div >
  );
};

export default SidebarBottom;