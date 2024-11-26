import React, { useState } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import Modal from "../../../Common Components/Modal/Modal";
import * as Yup from "yup";

import "./AddNewCat.css";

function AddNewCat() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const initialValues = {
    name: "",
    description: "",
    price: "",
    color: "",
    length_cm: "",
    width_cm: "",
    height_cm: "",
    depth_cm: "",
    stock: "",
    country_of_origin: "",
    wood_material: "",
    fabric_material: "",
    upholstery_material: "",
    warranty_months: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("يرجي ادخال الأسم"),
    description: Yup.string(),
    price: Yup.number().required("يرجي ادخال السعر"),
    color: Yup.string().required("يرجي ادخال اللون"),
    length_cm: Yup.number().required("يرجي ادخال الطول بالأرقام فقط"),
    width_cm: Yup.number().required("يرجي ادخال العرض بالأرقام فقط"),
    height_cm: Yup.number().required("يرجي ادخال الأرتفاع بالأرقام فقط"),
    depth_cm: Yup.number().required("يرجي ادخال السمك بالأرقام فقط"),
    stock: Yup.number().required("يرجي ادخال عدد القطع بالأرقام فقط"),
    country_of_origin: Yup.string().required("يردي اخال بلد المنشأ"),
    wood_material: Yup.string().required("يردي ادخال خامة الخشب"),
    fabric_material: Yup.string().required("يرجي ادخال مادة القماش "),
    upholstery_material: Yup.string().required("يرجي ادخال مادة التنجيد"),
    warranty_months: Yup.string().required(
      "يرجي ادخال عدد أشهر الضمان بالأرقام فقط"
    ),
    category: Yup.string().required("يرجي اختيار نوع المنتج"),
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    const items = {
      name: values.name,
      description: values.description,
      price: values.price,
      length_cm: values.length_cm,
      width_cm: values.width_cm,
      height_cm: values.height_cm,
      depth_cm: values.depth_cm,
      stock: values.stock,
      country_of_origin: values.country_of_origin,
      wood_material: values.wood_material,
      fabric_material: values.fabric_material,
      upholstery_material: values.upholstery_material,
      warranty_months: values.warranty_months,
      color: values.color,
      category: values.category,
    };

    try {
      const response = await fetch("http://104.248.251.235:8080/products/", {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("access token"),
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(items),
      });
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        setLoading(false);
        setShowModal(true);
        setTimeout(() => {
          navigate("/HomePage/AllCats");
        }, 2000);
      } else {
        setError("فشل في إضافة المنتج. حاول مرة أخرى.");
        setLoading(false);
      }
    } catch (error) {
      setError("حدث خطأ أثناء إضافة المنتج.");
      setLoading(false);
    }
  };

  return (
    <div className="editContainer">
      {error && (
        <p
          className="text-danger"
          style={{
            textAlign: "center",
            fontSize: "35px",
            margin: "100px 350px",
            fontFamily: "Amiri",
          }}
        >
          {error}
        </p>
      )}
      {!error && (
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
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="editForm">
              <p className="fw-bolder mb-3">المعلومات الأساسية :</p>
              <div className="d-flex">
                <div className="ms-5">
                  <label className="mb-2 d-block">اسم المنتج</label>
                  <Field name="name" className="input" />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="error-message text-danger fw-bolder"
                  />
                </div>
                <div className="me-5">
                  <label className="d-block mb-2">النوع</label>
                  <Field as="select" className="types-options" name="category">
                    <option>أختر نوع</option>
                    <option>كلاسيك</option>
                    <option>نيو كلاسيك</option>
                  </Field>
                  <ErrorMessage
                    name="category"
                    component={"div"}
                    className="error-message text-danger fw-bolder"
                  />
                </div>
              </div>
              <div className="mt-4 d-flex">
                <div className="ms-5">
                  <label className="mb-2 d-block">السعر بالجنية المصري</label>
                  <Field name="price" className="input" />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="error-message text-danger fw-bolder"
                  />
                </div>
                <div className="me-5">
                  <label className="mb-2 d-block">عدد القطع</label>
                  <Field name="stock" className="input" />
                  <ErrorMessage
                    name="stock"
                    component="div"
                    className="error-message text-danger fw-bolder"
                  />
                </div>
              </div>
              <div className="d-flex">
              <div className="mt-4 ms-5">
                  <label className="mb-2 d-block">كتابة وصف المنتج</label>
                  <Field name="description" className="message" />
                </div>
                <div className="me-5">
                  <label className="d-block mb-2 mt-2">اللون</label>
                  <Field name="color" className="input" />
                </div>
                
              </div>

              <hr className="mt-5" />
              <p className="fw-bolder mt-4 mb-4">تفاصيل :</p>
              <div className="d-flex">
                <div className="ms-5">
                  <label className="mb-2 d-block">خامة الخشب</label>
                  <Field name="wood_material" className="input" />
                  <ErrorMessage
                    name="wood_material"
                    component="div"
                    className="error-message text-danger fw-bolder"
                  />
                </div>
                <div className="me-5">
                  <label className="mb-2 d-block">خامة القماش</label>
                  <Field name="fabric_material" className="input" />
                  <ErrorMessage
                    name="fabric_material"
                    component="div"
                    className="error-message text-danger fw-bolder"
                  />
                </div>
              </div>
              <div className="d-flex">
                <div className="ms-5">
                  <label className="mb-2 mt-3 d-block">خامة التنجيد</label>
                  <Field name="upholstery_material" className="input" />
                  <ErrorMessage
                    name="upholstery_material"
                    component="div"
                    className="error-message text-danger fw-bolder"
                  />
                </div>
                <div className="me-5">
                  <label className="mb-2 mt-3 d-block">عدد شهور الضمان</label>
                  <Field name="warranty_months" className="input" />
                  <ErrorMessage
                    name="warranty_months"
                    component="div"
                    className="error-message text-danger fw-bolder"
                  />
                </div>
              </div>
              <p className="fw-bolder mt-4 mb-4">المواصفات :</p>
              <div className="d-flex">
                <div className="ms-5">
                  <label className="mb-2 d-block">الطول (cm)</label>
                  <Field name="length_cm" className="input" />
                  <ErrorMessage
                    name="length_cm"
                    component="div"
                    className="error-message text-danger fw-bolder"
                  />
                </div>
                <div className="me-5">
                  <label className="mb-2 d-block">العرض (cm)</label>
                  <Field name="width_cm" className="input" />
                  <ErrorMessage
                    name="width_cm"
                    component="div"
                    className="error-message text-danger fw-bolder"
                  />
                </div>
              </div>
              <div className="d-flex">
                <div className="ms-5">
                  <label className="mb-2 mt-3 d-block">الارتفاع (cm)</label>
                  <Field name="height_cm" className="input" />
                  <ErrorMessage
                    name="height_cm"
                    component="div"
                    className="error-message text-danger fw-bolder"
                  />
                </div>
                <div className="me-5">
                  <label className="mb-2 mt-3 d-block">السمك (cm)</label>
                  <Field name="depth_cm" className="input" />
                  <ErrorMessage
                    name="depth_cm"
                    component="div"
                    className="error-message text-danger fw-bolder"
                  />
                </div>
              </div>
              <hr className="mt-5" />
              <div>
                <p className="fw-bolder fs-5">تحميل الصور:</p>
                <p style={{ color: "#909090" }}>
                  يجب تحميل صورة واحدة على الاقل <br />
                  الصورة الاولى تظهر كصورة خارجية{" "}
                </p>
              </div>
              <div className="mt-4 d-flex flex-column align-items-center justify-content-center">
                <button type="submit" className="save-edit">
                  {loading ? "جاري التحميل..." : "حفظ المنتج"}
                </button>
              </div>
            </Form>
          </Formik>
          <div className="text-center">
            <button
              onClick={navigate("/HomePage/AllCats")}
              style={{
                border: "1px solid #260701",
                backgroundColor: "transparent",
                marginTop: "20px",
                fontWeight: "bolder",
                height: "50px",
                width: "300px",
                borderRadius: "10px",
              }}
            >
              الغاء
            </button>
          </div>
        </>
      )}
      {showModal && (
        <Modal>
          <div>

          </div>
        </Modal>
      )}
    </div>
  );
}
export default AddNewCat;