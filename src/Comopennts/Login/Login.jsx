import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { authContext } from "../../Context/AuthenticationContext"; // التأكد من استيراد السياق الصحيح

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required("Please enter your email")
    .email("Invalid email format"),
  password: yup
    .string()
    .required("Please enter your password")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must be at least 8 characters, include an uppercase letter, a lowercase letter, a number, and a special character"
    ),
});

export default function Login() {
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setToken } = useContext(authContext);

  async function submit(values) {
    setMsg(null);
    setLoading(true);
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      console.log(res);
      setMsg(res.data.message);
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      setTimeout(() => {
        navigate("/");
      }, 700);
    } catch (err) {
      setMsg(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: submit,
    validationSchema,
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Email
        </label>
        <input
          onBlur={formik.handleBlur}
          value={formik.values.email}
          onChange={formik.handleChange}
          type="email"
          id="email"
          name="email"
          className="w-full p-2.5 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
        {formik.errors.email && formik.touched.email && (
          <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
        )}
      </div>

      <div className="mb-5">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Password
        </label>
        <input
          onBlur={formik.handleBlur}
          value={formik.values.password}
          onChange={formik.handleChange}
          type="password"
          id="password"
          name="password"
          className="w-full p-2.5 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
        {formik.errors.password && formik.touched.password && (
          <div className="text-red-500 text-sm mt-1">
            {formik.errors.password}
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full text-white bg-green-600 hover:bg-green-700 transition-all duration-300 ease-in-out px-6 py-2 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105"
        disabled={loading}
      >
        {loading ? "Loading..." : "Login"}
      </button>

      {msg && <div className="mt-4 text-center text-red-600">{msg}</div>}
    </form>
  );
}
