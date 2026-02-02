import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import './Mainlayout.css';

const Mainlayout = () => {
  return (
    <div className="main-layout-wrapper">
      <div className="sidebar"><Sidebar /></div>
      <div className="header"><Header /></div>
      <main className="content"><Outlet /></main>
    </div>
  );
}

export default Mainlayout