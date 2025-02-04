import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/freshcart-logo.svg";
import { authContext } from "../../Context/AuthenticationContext";

export default function NavBar() {
const { token, setToken } = useContext(authContext);
  const navigate = useNavigate();  

  function logOut() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/Login");
  }

  return (
    <>
      <nav className="bg-white  border-gray-200 dark:bg-gray-900 shadow fixed top-0 left-0 w-full mb-8  ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 ">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={Logo} className="h-8" alt="FreshCart Logo" />
          </Link>

          {/* Toggle Button */}
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          {/* Navbar Items */}
          <div
            id="navbar-default"
            className="hidden w-full md:flex md:items-center md:w-auto"
          >
            <ul className="font-bold flex flex-col p-4 md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-gray-50 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent">
              <li>
                <NavLink
                  to="/"
                  className="block py-2 px-3 text-gray-900 rounded-md hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                >
                  Home
                </NavLink>
              </li>
              {token ? (
                <>
                  <li>
                    <NavLink
                      to="/cart"
                      className="block py-2 px-3 text-gray-900 rounded-md hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                    >
                      Cart
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/product"
                      className="block py-2 px-3 text-gray-900 rounded-md hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                    >
                      Product
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/categories"
                      className="block py-2 px-3 text-gray-900 rounded-md hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                    >
                      Categories
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/brands"
                      className="block py-2 px-3 text-gray-900 rounded-md hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                    >
                      Brands
                    </NavLink>
                  </li>
                </>
              ) : null}
            </ul>
          </div>

          {/* Social Media Icons */}
          <div className="hidden md:flex space-x-4">
            <a href="#" className="text-gray-500 dark:text-white">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="#" className="text-gray-500 dark:text-white">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="#" className="text-gray-500 dark:text-white">
              <i className="fa-brands fa-tiktok"></i>
            </a>
            <a href="#" className="text-gray-500 dark:text-white">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-500 dark:text-white">
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <a href="#" className="text-gray-500 dark:text-white">
              <i className="fa-brands fa-youtube"></i>
            </a>
          </div>

          {/* SignOut Button */}
          <div className="ml-4 space-x-3">
            {token ? (
              <button
                onClick={logOut}
                className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
              >
                SignOut
              </button>
            ) : (
              <>
                <Link
                  to="Login"
                  className="px-4 py-2 text-white  bg-green-500 rounded-md hover:bg-green-600"
                >
                  Login
                </Link>
                <Link
                  to="Register"
                  className="px-4 py-2 text-white  bg-green-500 rounded-md hover:bg-green-600"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
