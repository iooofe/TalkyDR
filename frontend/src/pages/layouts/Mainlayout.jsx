import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import SidebarTop from "../components/Sidebar/SidebarTop";
import SidebarBottom from "../components/Sidebar/SidebarBottom";
import './Mainlayout.css';

const Mainlayout = () => {
  return (
    <div className="main-layout-wrapper">
      <div className="sidebar-top"><SidebarTop /></div>
      <div className="sidebar-bottom"><SidebarBottom /></div>
            <div className="header"><Header /></div>
            <main className="content"><Outlet /></main>
        </div>
    )
}

export default Mainlayout