import { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Cart() {
  const {
    getItemCart,
    allCartItem,
    updateCartItems,
    deleteCartItem,
    clearCart,
  } = useContext(cartContext);

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    getItemCart();
  }, []);

  useEffect(() => {
    if (allCartItem.length > 0) {
      const total = allCartItem.reduce(
        (acc, item) => acc + item.price * item.count,
        0
      );
      setTotalPrice(total);
    } else {
      setTotalPrice(0);
    }
  }, [allCartItem]);

  return (
    <>
      <h1 className="mt-26 text-xl font-bold ">
        All Price: ${totalPrice.toFixed(2)}
      </h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {allCartItem.length === 0 ? (
              <motion.tr
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <td colSpan="5" className="text-center py-10">
                  <motion.img
                    src="https://i.imgur.com/Drj57qu.png"
                    alt="Empty Cart"
                    className="w-48 mx-auto"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.p
                    className="mt-4 text-xl font-semibold text-gray-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    Your cart is empty! 🛒
                  </motion.p>
                  <motion.p
                    className="text-md text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Let's add something awesome! 😊
                  </motion.p>
                  {/* <motion.button
                    className="mt-4 px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                    onClick={() => navigate("/products")}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Browse Products 🛍️
                  </motion.button> */}
                </td>
              </motion.tr>
            ) : (
              allCartItem.map((item) => (
                <tr
                  key={item.product.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="p-4">
                    <img
                      src={item.product.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt={item.product.title}
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {item.product.title}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button
                        className="cursor-pointer inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100"
                        type="button"
                        onClick={() =>
                          item.count > 1 &&
                          updateCartItems(item.product.id, item.count - 1)
                        }
                      >
                        <span className="sr-only">Decrease Quantity</span>
                        <svg
                          className="w-3 h-3"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <div className="ms-3">
                        <span>{item.count}</span>
                      </div>
                      <button
                        className=" cursor-pointer inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full"
                        type="button"
                        onClick={() =>
                          updateCartItems(item.product.id, item.count + 1)
                        }
                      >
                        <span className="sr-only">Increase Quantity</span>
                        <svg
                          className="w-3 h-3"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    ${item.price}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => deleteCartItem(item.product.id)}
                      className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {allCartItem.length > 0 && (
        <div className=" mt-6">
          <button
            onClick={clearCart}
            className="bg-red-500 block hover:bg-red-700 w-full text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          >
            Clear Cart
          </button>
          <Link to="/order">
            <button className="bg-green-700 block mt-3 hover:bg-red-700 w-full text-white font-bold py-2 px-4 rounded-lg transition duration-300">
              Continue Order
            </button>
          </Link>
        </div>
      )}
    </>
  );
}
