import "./SidebarBottom.css";
import { User, Settings, LayoutDashboard } from "lucide-react";
import Sidebarnavigation from "../../../components/sidebarnavigations/Sidebarnavigation";

const navigations = [
  { to: "/myprofile", label: "Мой профиль", Icon: User },
  { to: "/feed", label: "Лента", Icon: LayoutDashboard },
];

const settings = [
  { to: "/settings", label: "Настройки", Icon: Settings },
]

const SidebarBottom = () => {
  return (
    <div className="navigations">
      <div className="sidebar-nav-group">
        <p className="sidebar-nav-title">Навигация</p>
        <div className="sidebar-card-button">
          {navigations.map((item) => (
            <Sidebarnavigation key={item.to} {...item} />
          ))}
        </div>
      </div>

      <div className="sidebar-nav-group">
        <p className="sidebar-nav-title">Система</p>
        <div className="sidebar-card-button">
          {settings.map((item) => (
            <Sidebarnavigation key={item.to} {...item} />
          ))}
        </div>
      </div>
    </div >
  );
};

export default SidebarBottom;
