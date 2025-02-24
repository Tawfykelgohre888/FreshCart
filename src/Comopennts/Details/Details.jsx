import axios from "axios";
import React from "react";
import { Bars } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

const getProductDetails = async (id) => {
  const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  return data.data;
};

export default function Details() {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery(
    ["productDetails", id], 
    () => getProductDetails(id));

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Bars
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-red-500">
        is Error: {error?.message || "حدث خطأ غير معروف"}
      </div>
    );
  }

  const productDetails = data;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center items-center">
          <img
            src={productDetails.imageCover}
            alt="productDetails"
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-semibold text-gray-800">
            {productDetails.title}
          </h2>
          <p className="mt-4 text-xl font-semibold text-gray-700">
            Price: ${productDetails.price}
          </p>
          <div className="mt-4">
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-blue-200 dark:text-blue-800">
              {productDetails.ratingsAverage} / 5
            </span>
          </div>
          <p className="mt-4 text-gray-600">{productDetails.description}</p>
        </div>
      </div>
    </div>
  );
}
