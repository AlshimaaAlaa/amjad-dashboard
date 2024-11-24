import React, { useEffect, useState } from "react";
import "./AllMessages.css";

function AllMessages() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [allMessages, setAllMessages] = useState([]);
  const [selectedMessageId, setSelectedMessageId] = useState(null);

  useEffect(() => {
    async function getAllMessages() {
      setLoading(true);
      try {
        const response = await fetch("http://104.248.251.235:8080/support/", {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        });
        const messages = await response.json();
        if (response.ok) {
          setAllMessages(messages.data);
        } else {
          setError(true);
        }
      } catch (error) {
        console.error(error);
        setError(true);
      }
      //   } finally {
      //     setLoading(false);
      //   }
    }
    getAllMessages();
  }, []);

  return (
    <div className="allmessagesContainer">
      <div
        className="d-flex align-items-center"
        style={{
          backgroundColor: "#F5F5DC",
          border: "1px solid lightgray",
          borderRadius: "30px",
          padding: "0px 20px 0px 20px",
          width: "200px",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* SVG Content */}
        </svg>
        <p className="mt-3 me-2 ms-2 fw-bolder">جميع الرسائل</p>
      </div>

      {/* عرض التحميل أو رسالة الخطأ */}
      {/* {loading && <p>جاري تحميل البيانات...</p>} */}
      {/* {error && <p>حدث خطأ أثناء تحميل الرسائل!</p>} */}

      {/* عرض الرسائل */}
      {/* {!loading && !error && ( */}
      <div className="mt-5 tableContainer">
        <table className="table">
          <thead>
            <tr>
              <th className="pb-4">م</th>
              <th className="pb-4">الاسم</th>
              <th className="pb-4">رقم التليفون</th>
              <th className="pb-4">البريد الالكتروني</th>
              <th className="pb-4">الرسالة</th>
              <th className="pb-4">خيارات</th>
            </tr>
          </thead>
          <tbody>
            {allMessages.map((message) => (
              <tr key={message.id}>
                <td className="pb-4">{message.id}</td>
                <td className="pb-4">{message.name}</td>
                <td className="pb-4">{message.phone_number}</td>
                <td className="pb-4">{message.email}</td>
                <td className="pb-4">{message.message}</td>
                <td
                  className="text-center position-relative"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    setSelectedMessageId(
                      selectedMessageId === message.id ? null : message.id
                    )
                  }
                >
                  <img src="/assets/images/Group 6356159.png" alt="options" />
                  {/* <div className="option"> */}
                    {selectedMessageId === message.id && (
                      <div className="option">
                        <p className="fw-bolder text-danger  mt-3">حذف الرسالة</p>
                      </div>
                    )}
                  {/* </div> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* )} */}
    </div>
  );
}

export default AllMessages;
