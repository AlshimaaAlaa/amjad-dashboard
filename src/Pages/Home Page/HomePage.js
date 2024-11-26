import React from "react";
import Navbar from "../../Common Components/NavBar/Navbar";
import SidebarBox from "../../Common Components/SideBar/SideBar";
import { Outlet } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <div>
        <Navbar date={true} />
      </div>
      <div className="d-flex">
        <SidebarBox />
        <Outlet />
      </div>
    </div>
  );
}
export default HomePage;