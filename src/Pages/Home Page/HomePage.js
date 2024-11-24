import React from "react";
import Navbar from "../../Common Components/NavBar/Navbar";
import SidebarBox from "../../Common Components/SideBar/SideBar";
import { Outlet } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <Navbar date={true} />
      <div className="d-flex">
        <SidebarBox />
        <div className="content">
          <Outlet /> {/* Render the child routes here */}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
