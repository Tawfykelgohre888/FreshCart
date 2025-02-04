import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required("plese enter name requried")
    .min(3, "min is 3 characters")
    .max(30, "max is 30 characters"),
  email: yup
    .string()
    .required("plese enter email requried")
    .email("plese enter valid email"),
  password: yup
    .string()
    .required("plese enter password requried")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "plese enter password is valid"
    ),
  rePassword: yup
    .string()
    .required("The password must match the password before it")
    .oneOf([yup.ref("password")], "repassowrd not maches passowrd"),
  phone: yup
    .string()
    .required("plese enter phone requried")
    .matches(/^01[0-2,5]\d{8}$/, "egyption nuber plese"),
});

export default function Regester() {
  let [msg, setmsg] = useState(null); 
  let [successMsg, setSeccessMsg] = useState(null);
  let [Loding,setLoding] = useState(false);
  let navigate =  useNavigate();
  async function submit(values) {
    setmsg(null);
    setSeccessMsg(null);
    setLoding(true)
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      console.log(res);
      setSeccessMsg(res.data.message);
      setTimeout(() => {
        navigate("/Login");
      },700);

    } catch (err) {
      setmsg(err.response.data.message);
    }finally{
      setLoding(false)
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: submit,
    validationSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="w-7/12 mx-auto">
      <div className="mb-5">
        <label
          htmlFor="Name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your Name
        </label>
        <input
          onBlur={formik.handleBlur}
          value={formik.values.name}
          onChange={formik.handleChange}
          type="text"
          id="name"
          name="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      {formik.errors.name && formik.touched.name ? (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span className="font-medium">{formik.errors.name} </span>
        </div>
      ) : null}
      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your email
        </label>
        <input
          onBlur={formik.handleBlur}
          value={formik.values.email}
          onChange={formik.handleChange}
          type="email"
          id="email"
          name="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      {formik.errors.email && formik.touched.email ? (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span className="font-medium">{formik.errors.email} </span>
        </div>
      ) : null}
      <div className="mb-5">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your password
        </label>
        <input
          onBlur={formik.handleBlur}
          value={formik.values.password}
          onChange={formik.handleChange}
          type="password"
          id="password"
          name="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      {formik.errors.password && formik.touched.password ? (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span className="font-medium">{formik.errors.password} </span>
        </div>
      ) : null}
      <div className="mb-5">
        <label
          htmlFor="rePassword"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          rePassword
        </label>
        <input
          onBlur={formik.handleBlur}
          value={formik.values.rePassword}
          onChange={formik.handleChange}
          type="Password"
          id="rePassword"
          name="rePassword"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      {formik.errors.rePassword && formik.touched.rePassword ? (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span className="font-medium">{formik.errors.rePassword} </span>
        </div>
      ) : null}
      <div className="mb-5">
        <label
          htmlFor="phone"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your phone
        </label>
        <input
          onBlur={formik.handleBlur}
          value={formik.values.phone}
          onChange={formik.handleChange}
          type="tel"
          id="phone"
          name="phone"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      {formik.errors.phone && formik.touched.phone ? (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span className="font-medium">{formik.errors.phone} </span>
        </div>
      ) : null}
      <button
        type="submit"
        className="text-white mb-12 bg-[#0aad0a] hover:bg-green-800 transition-all duration-300 ease-in-out px-6 py-2 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105"
      >
        {Loding ? "Loding..." : "submit"}
      </button>

      {msg ? <div>{msg}</div> : null}
      {successMsg ? <div>{successMsg} </div> : null}
    </form>
  );
}
