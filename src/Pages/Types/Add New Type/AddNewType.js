import React, { useState } from "react";
import "./AddNewType.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

function AddNewType() {
  const [loading, setLoading] = useState(false);
  // const [showModal, setShowModal] = useState(false);
  const initialValues = {
    name: "",
    description: "",
    icon: null,
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("يرجي ادخال النوع"),
    description: Yup.string(),
  });
  const handleSubmit = async (values) => {
    setLoading(true);
    const items = {
      name: values["name"],
      description: values["description"],
      icon: values["icon"],
    };
    try {
      const response = await fetch("http://104.248.251.235:8080/categories/", {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("access token"),
        },
        body: JSON.stringify(items),
      });
      const result = await response.json();
      console.log(result);
      if (response.ok) {
        setLoading(false);
        console.log("success add type");
      } else {
        setLoading(false);
        console.log("failed add type");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="addTypeContainer">
      <div
        className="d-flex align-items-center"
        style={{
          backgroundColor: "#F5F5DC",
          border: "1px solid lightgray",
          borderRadius: "30px",
          padding: "0px 20px 0px 20px",
          width: "200px",
          height: "43px",
        }}
      >
        <p className="mt-3 fw-bolder">+</p>
        <p className="mt-3 me-2 ms-2 fw-bolder"> اضافة نوع جديد</p>
      </div>

      {/* add new type */}
      <div className="addTypeForm">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <div className="d-flex">
              <div className="ms-5">
                <label className="d-block mb-2" htmlFor="name">
                  اسم النوع
                </label>
                <Field name="name" id="name" />
              </div>
              <div className="me-5">
                <label className="d-block mb-2" htmlFor="description">
                  كتابة وصف
                </label>
                <Field name="description" id="description" />
              </div>
            </div>
            <div>
              <label className="d-block mb-2 mt-5">تحميل ايقون</label>
            </div>
            <div className="text-center mt-5">
              <button className="saveBtn">
                {loading ? "جاري التحميل..." : "حفظ"}
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
export default AddNewType;
