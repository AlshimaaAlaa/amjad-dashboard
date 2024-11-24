import React from "react";
import "./Container.css";
function Container() {
  return (
    <div className="container">
      {/* 1 */}
      <div className="d-flex align-items-center justify-content-around item">
        <div>
          <img
            src="/assets/images/Group 6356134.png"
            alt="icon"
            width={"35px"}
          />
        </div>
        <div className=" mt-3">
          <h4 className="mb-0 fw-bolder">200</h4>
          <p>جميع المنتجات</p>
        </div>
      </div>
      {/* 2 */}
      <div className="d-flex align-items-center justify-content-around item">
        <div>
          <img
            src="/assets/images/Group 6356136.png"
            alt="icon"
            width={"35px"}
          />
        </div>
        <div className=" mt-3">
          <h4 className="mb-0 fw-bolder">150</h4>
          <p>
            {" "}
            جميع المنتجات
            <br /> المعروضة
          </p>
        </div>
      </div>
      {/* 3 */}
      <div className="d-flex align-items-center justify-content-around item">
        <div>
          <img
            src="/assets/images/Group 6356138.png"
            alt="icon"
            width={"35px"}
          />
        </div>
        <div className=" mt-3">
          <h4 className="mb-0 fw-bolder">50</h4>
          <p>
            {" "}
            جميع المنتجات <br />
            المخفية
          </p>
        </div>
      </div>
      {/* 4 */}
      <div className="d-flex align-items-center justify-content-around item">
        <div>
          <img
            src="/assets/images/Group 6356140.png"
            alt="icon"
            width={"35px"}
          />
        </div>
        <div className=" mt-3">
          <h4 className="mb-0 fw-bolder">2</h4>
          <p>
            جميع الانواع <br />
            الحالية
          </p>
        </div>
      </div>
      {/* 5 */}
      <div className="d-flex align-items-center justify-content-around item">
        <div>
          <img
            src="/assets/images/Group 6356138 (1).png"
            alt="icon"
            width={"35px"}
          />
        </div>
        <div className=" mt-3">
          <h4 className="mb-0 fw-bolder">130</h4>
          <p>نيو كلاسيك</p>
        </div>
      </div>
      {/* 6 */}
      <div className="d-flex align-items-center justify-content-around item">
        <div>
          <img
            src="/assets/images/Group 6356136 (1).png"
            alt="icon"
            width={"35px"}
          />
        </div>
        <div className=" mt-3">
          <h4 className="mb-0 fw-bolder">70</h4>
          <p>كلاسيكي</p>
        </div>
      </div>
      {/* 7 */}
      <div className="d-flex align-items-center justify-content-around item">
        <div>
          <img
            src="/assets/images/Group 6356140 (1).png"
            alt="icon"
            width={"35px"}
          />
        </div>
        <div className=" mt-3">
          <h4 className="mb-0 fw-bolder">50</h4>
          <p>جميع الرسائل</p>
        </div>
      </div>
      {/* 8 */}
      <div className="d-flex align-items-center justify-content-around item">
        <div>
          <img
            src="/assets/images/Group 6356138 (2).png"
            alt="icon"
            width={"35px"}
          />
        </div>
        <div className=" mt-3">
          <h4 className="mb-0 fw-bolder">7</h4>
          <p>رسائل جديدة</p>
        </div>
      </div>
    </div>
  );
}
export default Container;