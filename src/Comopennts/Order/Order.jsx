import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Order() {
  const [paymentWay, setPaymentWay] = useState();
  const { cartId, setNumOfCartItems } = useContext(cartContext);
  const navgate =  useNavigate();
  // const {ca} useContext(cartContext);
  function handleSubmit(values) {
    console.log(values);
    if (paymentWay == "cash") {
      cashOrder(values);
    } else if (paymentWay === "visa") {
      visaOrder();
    }
  }

  async function cashOrder(values) {
    // if (!cartId) {
    //   console.error("Cart ID Not available !");
    //   toast.error("There is a problem with the request, try again.");
    //   return;
    // }
    try {
      const res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        values,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(res);
      if (res.data.status == "success") {
        toast.success("Order Cash Successfully");
        setNumOfCartItems(0);
        navgate('/cart')
      }
    } catch (err) {
      console.log(err);
    }
  }

  function visaOrder() {
    console.log("visa order");
  }

  const formik = useFormik({
    initialValues: {
      shippingAddress: {
        details: "details",
        phone: "01010800921",
        city: "Cairo",
      },
    },
    onSubmit: handleSubmit,
  });
  return (
    <form className="max-w-sm mx-auto mt-36" onSubmit={formik.handleSubmit}>
      <div className="mb-5">
        <label
          htmlFor="details"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          details
        </label>
        <input
          type="text"
          id="details"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="details"
          required
          onChange={(e) =>
            formik.setFieldValue("shippingAddress.details", e.target.value)
          }
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="phone"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          phone
        </label>
        <input
          type="tel"
          id="phone"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="phone"
          required
          onChange={(e) =>
            formik.setFieldValue("shippingAddress.phone", e.target.value)
          }
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="city"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          city
        </label>
        <input
          type="text"
          id="city"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="city"
          required
          onChange={(e) =>
            formik.setFieldValue("shippingAddress.city", e.target.value)
          }
        />
      </div>
      <button
        onClick={() => setPaymentWay("cash")}
        type="submit"
        className="text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Cash Order
      </button>
      <button
        onClick={() => setPaymentWay("visa")}
        type="submit"
        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Visa Order
      </button>
    </form>
  );
}
