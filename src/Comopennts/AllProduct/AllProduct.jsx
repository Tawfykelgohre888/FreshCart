import { useContext } from "react";
import { cartContext } from "../../Context/CartContext"; // تأكد من المسار الصحيح
import { Link } from "react-router-dom";

export default function AllProduct(props) {
  let { title, price, id, imageCover, description, ratingsAverage } =
    props.product;
  let rating = Math.floor(ratingsAverage);

  const { addToCart } = useContext(cartContext);

  return (
    <div className="bg-white border  border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 p-5">
      <Link to={`/Details/${id}`} className="block">
        <img
          className="p-8 rounded-t-lg h-[400px] w-full"
          src={imageCover}
          alt="product image"
        />
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <p className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {description.slice(0, 100) + "  ..."}
        </p>
        <div className="flex items-center mt-2.5 mb-5">
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            {Array.from({ length: rating }, (_, index) => (
              <svg
                key={index}
                className="w-4 h-4 text-yellow-300"
                viewBox="0 0 22 20"
                fill="currentColor"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
            ))}
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">
            {ratingsAverage}
          </span>
        </div>
        <span className="text-3xl font-bold text-gray-900 dark:text-white">
          ${price}
        </span>
      </Link>

      <button
        onClick={() => addToCart(id)}
        className="text-white mt-3 cursor-pointer w-full bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Add to cart
      </button>
    </div>
  );
}
