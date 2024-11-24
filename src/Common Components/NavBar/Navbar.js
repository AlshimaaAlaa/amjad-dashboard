import React, { useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import Logout from "../../Auth/LogOut/Logout";

function Navbar({ title, date }) {
  const navigate = useNavigate();
  const [options, setOptions] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("ar-EG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleLogoutModalClose = () => {
    setShowLogoutModal(false);
  };

  return (
    <div className="d-flex align-items-center justify-content-around navbarContainer">
      <div>
        <div>
          <div>
            <p className="mb-0 fw-bolder">لوحة التحكم</p>
          </div>
          {/* Title */}
          <p className="fw-bolder mb-0">{title}</p>

          {/* Date */}
          {date && (
            <p className="mb-0">
              <span className=" " style={{ fontSize: "", color: "#000" }}>
                {formattedDate}
              </span>
            </p>
          )}
        </div>
      </div>
      <div
        className="d-flex align-items-center position-relative"
        onClick={() => setOptions(!options)}
      >
        <img
          src="/assets/images/user-circle-svgrepo-com 1.png"
          alt="personal"
          width={"35px"}
        />
        <p
          style={{ color: "#909090", cursor: "pointer" }}
          className="mt-3 me-3 ms-3"
        >
          أحمد سلامة
        </p>
        <img src="/assets/images/arrow-down-svgrepo-com.png" alt="arrow" />
        {options && (
          <div className="position-absolute options">
            <p className="mb-0 p-3" style={{ cursor: "pointer" }}>
              تعديل البيانات
            </p>
            <Logout onClose={handleLogoutModalClose} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
