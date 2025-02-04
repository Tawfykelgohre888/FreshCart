import axios from "axios";
import { useEffect, useState } from "react";
import AllProduct from "../AllProduct/AllProduct";
import { Bars } from "react-loader-spinner";

export default function Home() {
  const [allproduct, setAllProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  async function getAllProduct() {
    setLoading(true);
    const res = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    setAllProduct(res.data.data);
    setLoading(false);
  }
  useEffect(() => {
    getAllProduct();
  }, []);
  return (
    <>
      {loading ? (
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
      ) : (
        <div className="container  mx-auto p-10 ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
            {allproduct.map((prod) => (
              <AllProduct key={prod._id} product={prod} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
