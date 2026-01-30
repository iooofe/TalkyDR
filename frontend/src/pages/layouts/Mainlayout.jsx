import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";

const Mainlayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Mainlayout