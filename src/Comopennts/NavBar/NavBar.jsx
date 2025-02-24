import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/freshcart-logo.svg";
import { authContext } from "../../Context/AuthenticationContext";
import { cartContext } from "../../Context/CartContext";

export default function NavBar() {
  const { token, setToken } = useContext(authContext);
  const { numOfCartItems } = useContext(cartContext);
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/Login");
  }

  return (
    <>
      <nav
        className="bg-white border-gray-200 dark:bg-gray-900 shadow fixed top-0 left-0 w-full"
        style={{ zIndex: 10 }}
      >
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={Logo} className="h-8" alt="FreshCart Logo" />
          </Link>

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
                      className="relative flex items-center py-2 px-3 text-gray-900 rounded-md hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
                    >
                      Cart:
                      <i className="fas fa-shopping-cart text-xl"></i>
                      {numOfCartItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                          {numOfCartItems}
                        </span>
                      )}
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
                  className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
                >
                  Login
                </Link>
                <Link
                  to="Register"
                  className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
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
