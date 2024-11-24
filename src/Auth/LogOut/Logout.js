import React, { useState } from "react";
import Modal from "../../Common Components/Modal/Modal";

function Logout({ onClose }) {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    if (onClose) onClose();
  };

  return (
    <>
      <p
        className="text-danger fw-bolder ps-3 pe-3 pt-3 mb-0 border-0"
        style={{ cursor: "pointer" }}
        onClick={handleOpenModal}
      >
        تسجيل الخروج
      </p>
      {showModal && (
        <Modal isOpen={showModal} onClose={handleCloseModal}>
          <div>
            <p>هل أنت متأكد أنك تريد تسجيل الخروج؟</p>
            <button
              className="btn btn-danger me-2"
              onClick={() => (window.location.href = "/")}
            >
              تسجيل الخروج
            </button>
            <button className="btn btn-secondary" onClick={handleCloseModal}>
              إلغاء
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}

export default Logout;
