import React, { useState } from "react";
import { Field, Form, Formik } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "../../../Common Components/Modal/Modal";
import "./Edit.css";

function Edit() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const product = state?.product || {};
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    setError(false);

    try {
      const token = localStorage.getItem("access token");
      if (!token) {
        throw new Error("Authorization token is missing.");
      }

      const response = await fetch(
        `http://104.248.251.235:8080/products/${product.id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: token,
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        console.error("Failed to update product:", errorMessage);
        setError(true);
      } else {
        setShowModal(true);
        console.log("Product updated successfully");
      }
    } catch (error) {
      console.error("Error during product update:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="editContainer">
      {error ? (
        <p
          className="text-danger"
          style={{
            textAlign: "center",
            fontSize: "35px",
            margin: "100px 350px",
            fontFamily: "Amiri",
          }}
        >
          حدث خطأ أثناء تعديل البيانات....
        </p>
      ) : (
        <>
          <div
            className="d-flex align-items-center mb-5"
            style={{
              backgroundColor: "#F5F5DC",
              border: "1px solid lightgray",
              borderRadius: "30px",
              padding: "0px 20px",
              width: "200px",
            }}
          >
            <p className="mt-3 fw-bolder">+</p>
            <p className="mt-3 me-2 ms-2 fw-bolder">اضافة منتج جديد</p>
          </div>
          <Formik
            initialValues={{
              name: product.name || "",
              //   type: product.category.name?.id || "",
              price: product.price || "",
              stock: product.stock || "",
              description: product.description || "",
              wood_material: product.wood_material || "",
              fabric_material: product.fabric_material || "",
              upholstery_material: product.upholstery_material || "",
              // warranty_months: product.warranty_months || "",
              length_cm: product.length_cm || "",
              width_cm: product.width_cm || "",
              height_cm: product.height_cm || "",
              depth_cm: product.depth_cm || "",
            }}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form className="editForm">
                <p className="fw-bolder mb-3">المعلومات الأساسية :</p>
                <div className="d-flex">
                  <div className="ms-5">
                    <label className="mb-2 d-block">اسم المنتج</label>
                    <Field name="name" className="input" />
                  </div>
                  <div className="me-5">
                    <label className="mb-2 d-block">النوع</label>
                    <Field as="select" name="type" className="input">
                      <option value="">اختر النوع</option>
                      <option value="classic">كلاسيك</option>
                      <option value="new_classic">نيو كلاسيك</option>
                    </Field>
                  </div>
                </div>
                <div className="mt-4 d-flex">
                  <div className="ms-5">
                    <label className="mb-2 d-block">السعر بالجنية المصري</label>
                    <Field name="price" className="input" />
                  </div>
                  <div className="me-5">
                    <label className="mb-2 d-block">عدد القطع</label>
                    <Field name="stock" className="input" />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="mb-2 d-block">كتابة وصف المنتج</label>
                  <Field name="description" className="message" />
                </div>
                <hr className="mt-5" />
                <p className="fw-bolder mt-4 mb-4">تفاصيل :</p>
                <div className="d-flex">
                  <div className="ms-5">
                    <label className="mb-2 d-block">خامة الخشب</label>
                    <Field name="wood_material" className="input" />
                  </div>
                  <div className="me-5">
                    <label className="mb-2 d-block">خامة القماش</label>
                    <Field name="fabric_material" className="input" />
                  </div>
                </div>
                <div className="d-flex">
                  <div className="ms-5">
                    <label className="mb-2 mt-3 d-block">خامة التنجيد</label>
                    <Field name="upholstery_material" className="input" />
                  </div>
                  <div className="me-5">
                    <label className="mb-2 mt-3 d-block">عدد شهور الضمان</label>
                    <Field name="warranty_months" className="input" />
                  </div>
                </div>
                <p className="fw-bolder mt-4 mb-4">المواصفات :</p>
                <div className="d-flex">
                  <div className="ms-5">
                    <label className="mb-2 d-block">الطول (cm)</label>
                    <Field name="length_cm" className="input" />
                  </div>
                  <div className="me-5">
                    <label className="mb-2 d-block">العرض (cm)</label>
                    <Field name="width_cm" className="input" />
                  </div>
                </div>
                <div className="d-flex">
                  <div className="ms-5">
                    <label className="mb-2 mt-3 d-block">الارتفاع (cm)</label>
                    <Field name="height_cm" className="input" />
                  </div>
                  <div className="me-5">
                    <label className="mb-2 mt-3 d-block">العمق (cm)</label>
                    <Field name="depth_cm" className="input" />
                  </div>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center mt-5">
                  <button type="submit" className="save-edit">
                    {loading ? "جاري التحميل..." : "حفظ التعديل"}
                  </button>
                  <button
                    type="button"
                    className="cancel-edit"
                    onClick={() => navigate("/HomePage")}
                  >
                    الغاء
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          {showModal && (
            <Modal isOpen={showModal}>
                <div className="p-5">
              <div className="text-center">
                <img
                  src="/assets/images/success-achievement-award-medal-winner-svgrepo-com 1.png"
                  alt="success edit"
                />
              </div>
              <div>
                <p className="text-center mb-0 fw-bolder fs-4">تم تعديل المنتج بنجاح</p>
              </div>
              <div>
                <button
                  onClick={() => navigate("/HomePage/AllCats")}
                  style={{
                    backgroundColor: "#260701",
                    width: "300px",
                    height: "50px",
                    padding: "10px",
                    color:"#fff ",
                    border:"none",
                    borderRadius:"10px",
                    margin:"40px 0px 0px 0px",
                    fontWeight:"bolder"
                  }}
                >
                    {loading ? "جاري التحميل..." : " الرجوع لصفحة جميع المنتجات"}
                </button>
              </div>
              </div>
            </Modal>
          )}
        </>
      )}
    </div>
  );
}

export default Edit;
