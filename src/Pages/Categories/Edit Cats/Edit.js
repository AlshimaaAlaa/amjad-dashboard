import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../../../Common Components/Modal/Modal";
import "./Edit.css";
function EditProductForm() {
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    category_id: 0,
    name: "",
    description: "",
    price: "",
    color: "",
    length_cm: "",
    width_cm: "",
    height_cm: "",
    depth_cm: "",
    stock: 0,
    country_of_origin: "",
    wood_material: "",
    fabric_material: "",
    upholstery_material: "",
    warranty_months: 0,
    uploaded_images: [""],
    // product_video: "",
    is_active: true,
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://104.248.251.235:8080/categories")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setCategories(data.data);
        }
      })
      .catch((error) => console.error("Error fetching categories:", error));

    if (state) {
      setProductData(state.product);
    }
  }, [state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const updatedProductData = {
      ...productData,
      price: parseFloat(productData.price),
      stock: parseInt(productData.stock),
    };
  
    try {
      setLoading(true);
      const response = await fetch(
        `http://104.248.251.235:8080/products/${state.product.id}/`,
        {
          method: "PATCH",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("access token"),
          },
          body: JSON.stringify(updatedProductData),
        }
      );
  
      // Log response for debugging
      const responseData = await response.json();
      console.log("API Response:", responseData);
  
      if (response.ok) {
        setLoading(false);
        setShowModal(true);
        setShowModalError(false);
      } else {
        setLoading(false);
        setShowModal(false);
        setShowModalError(true);
        console.error("Failed to update product. Response:", responseData);
      }
    } catch (error) {
      setLoading(false);
      setShowModal(false);
      setShowModalError(true);
      console.error("Error updating product:", error);
    }
  };
  
  return (
    <div className="editContainer">
      <div
        className="d-flex align-items-center mb-3"
        style={{
          backgroundColor: "#F5F5DC",
          border: "1px solid lightgray",
          borderRadius: "30px",
          padding: "0px 20px 0px 20px",
          width: "200px",
          height: "45px",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.196 8.5V3C16.196 1.89543 15.3006 1 14.196 1H3.19605C2.09148 1 1.19604 1.89543 1.19604 3V14C1.19604 15.1046 2.09148 16 3.19604 16H8.69604"
            stroke="#909090"
            stroke-width="1.5"
          />
          <rect
            x="8.19604"
            y="8"
            width="15"
            height="15"
            rx="2"
            stroke="#909090"
            stroke-width="1.5"
          />
        </svg>

        <p className="mt-3 me-2 ms-2 fw-bolder">تعديل المنتج</p>
      </div>
      <div>
        <p className="fw-bolder mt-5">المعلومات الاساسية : </p>
      </div>
      <form className="editForm" onSubmit={handleSubmit}>
        <div className="d-flex align-items-center justify-content-between">
          <div className="ms-5">
            <label className="mb-2 d-block">اسم المنتج</label>
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
            />
          </div>
          <div className="me-5">
            <label className="d-block mb-2">النوع</label>
            <select
              className="input"
              name="category_id"
              value={productData.category_id}
              onChange={handleChange}
            >
              <option value=""> اختر النوع</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* 2 */}
        <div className="d-flex align-items-center justify-content-between">
          <div className="">
            <label className="d-block mb-2 mt-4">السعر بالجنيه المصري</label>
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="mt-4 mb-2 d-block">عدد القطع</label>
            <input
              type="number"
              name="stock"
              value={productData.stock}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <label className="d-block mb-2 mt-4">كتابة وصف المنتج</label>
          <textarea
            className="input"
            style={{ height: "150px" }}
            name="description"
            value={productData.description}
            onChange={handleChange}
          />
        </div>
        <hr className="mt-5" style={{ position: "relative", zIndex: "-1" }} />
        <div>
          <p className="fw-bolder mt-3">تفاصيل : </p>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <label className="d-block mb-2">خامة الخشب </label>
            <input
              type="text"
              name="wood_material"
              value={productData.wood_material}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-2 d-block"> خامة القماش</label>
            <input
              type="text"
              name="fabric_material"
              value={productData.fabric_material}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <label className="mb-2 mt-4 d-block">خامة التنجيد</label>
            <input
              type="text"
              name="upholstery_material"
              value={productData.upholstery_material}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-2 mt-4 d-block">عدد شهور الضمان</label>
            <input
              type="number"
              name="warranty_months"
              value={productData.warranty_months}
              onChange={handleChange}
            />
          </div>
        </div>
        <hr className="mt-5" style={{ position: "relative", zIndex: "-1" }} />
        <div>
          <p className="fw-bolder">المواصفات : </p>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <label className="d-block mb-2">الطول ( cm )</label>
            <input
              type="number"
              name="length_cm"
              value={productData.length_cm}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-2 d-block">العرض ( cm )</label>
            <input
              type="number"
              name="width_cm"
              value={productData.width_cm}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <label className="mb-2 mt-4 d-block">الارتفاع (سم)</label>
            <input
              type="number"
              name="height_cm"
              value={productData.height_cm}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-2 mt-4 d-block">العمق (سم)</label>
            <input
              type="number"
              name="depth_cm"
              value={productData.depth_cm}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <label className="mb-2 mt-4 d-block">اللون</label>
            <input
              type="text"
              name="color"
              value={productData.color}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-2 mt-4 d-block">بلد المنشأ</label>
            <input
              type="text"
              name="country_of_origin"
              value={productData.country_of_origin}
              onChange={handleChange}
            />
          </div>
        </div>
        <hr className="mt-5" style={{ position: "relative", zIndex: "-1" }} />

        <div>
          <label className="mb-2 d-block"> الصور</label>
          <input
            type="file"
            multiple
            name="uploaded_images"
            onChange={(e) =>
              setProductData({
                ...productData,
                uploaded_images: Array.from(e.target.files),
              })
            }
          />
        </div>
        {/* <div>
          <label className="d-block mb-2 mt-4">رابط الفيديو</label>
          <input
            type="url"
            name="product_video"
            value={productData.product_video}
            onChange={handleChange}
          />
        </div> */}

        <div className="d-flex align-items-center">
          <label className="ms-3">الحالة</label>
          <input
            style={{ width: "20px", margin: "" }}
            type="checkbox"
            name="is_active"
            checked={productData.is_active}
            onChange={(e) =>
              handleChange({
                target: { name: "is_active", value: e.target.checked },
              })
            }
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            style={{
              border: "0px",
              padding: "10px",
              width: "300px",
              borderRadius: "10px",
              color: "#fff",
              backgroundColor: "#260701",
              fontWeight: "bolder",
            }}
          >
            {loading ? "جاري التحميل...." : "حفظ"}
          </button>
        </div>
      </form>
      {showModal && (
        <Modal isOpen={showModal}>
          <div style={{ padding: "20px" }}>
            <div className="text-center">
              <img
                src="/assets/images/success-achievement-award-medal-winner-svgrepo-com 1.png"
                alt="success"
              />
            </div>
            <div>
              <p className="text-center fw-bolder">تم تعديل هذا المنتج بنجاح</p>
              <button
                onClick={() => navigate("/HomePage/AllCats")}
                style={{
                  border: "0px",
                  height: "50px",
                  width: "300px",
                  borderRadius: "10px",
                  color: "#fff",
                  backgroundColor: "#260701",
                }}
              >
                {loading ? "جاري التحميل..." : "العودة الي صفحة جميع المنتجات"}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {showModalError && (
        <Modal isOpen={showModalError}>
          <div style={{ padding: "20px" }}>
            <div className="text-center">
              <img
                src="/assets/images/material-symbols_sms-failed-outline-rounded.png"
                alt="success"
              />
            </div>
            <div>
              <p className="text-center fw-bolder">
                حدث خطأ أثناء تعديل هذا المنتج !
              </p>
              <button
                onClick={() => navigate("/HomePage/AllCats")}
                style={{
                  border: "0px",
                  height: "50px",
                  width: "300px",
                  borderRadius: "10px",
                  color: "#fff",
                  backgroundColor: "#260701",
                }}
              >
                {loading ? "جاري التحميل..." : "العودة الي صفحة جميع المنتجات"}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default EditProductForm;
