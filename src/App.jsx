import "@fortawesome/fontawesome-free/css/all.min.css";
import "flowbite/dist/flowbite.js";
import "flowbite/dist/flowbite.css";
import "formik/dist/";
import "./App.css";
// import "../node_modules/react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Comopennts/Layout/Layout.jsx";
import Home from "./Comopennts/Home/Home.jsx";
import Product from "./Comopennts/Product/Product.jsx";
import Cart from "./Comopennts/Cart/Cart.jsx";
import Login from "./Comopennts/Login/Login.jsx";
import NotFound from "./Comopennts/NotFound/NotFound.jsx";
import Categories from "./Comopennts/Categories/Categories.jsx";
import Brands from "./Comopennts/Brands/Brands.jsx";
import Register from "./Comopennts/Register/Register.jsx";
import AuthProvider, { authContext } from "./Context/AuthenticationContext.jsx";
import Guard from "./Comopennts/Guard/Guard.jsx";
import AtheGuard from "./Comopennts/AtueGuard/AtheGuard.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import Details from "./Comopennts/Details/Details.jsx";
import CartContextProvider from "./Context/CartContext.jsx";
import { Toaster } from "react-hot-toast";
import Order from "./Comopennts/Order/Order.jsx";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        // { path: "home", element: <Home /> },
        {
          path: "product",
          element: (
            <Guard>
              <Product />
            </Guard>
          ),
        },
        {
          path: "cart",
          element: (
            <Guard>
              <Cart />
            </Guard>
          ),
        },
        {
          path: "categories",
          element: (
            <Guard>
              <Categories />
            </Guard>
          ),
        },
        {
          path: "order",
          element: (
            <Guard>
              <Order />
            </Guard>
          ),
        },
        {
          path: "brands",
          element: (
            <Guard>
              <Brands />
            </Guard>
          ),
        },
        {
          path: "login",
          element: (
            <AtheGuard>
              <Login />
            </AtheGuard>
          ),
        },
        {
          path: "register",
          element: (
            <AtheGuard>
              <Register />
            </AtheGuard>
          ),
        },
        {path: "Details/:id", element: <Guard> <Details/> </Guard>},
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  const queryClient = new QueryClient();
  return (
    <>
      <AuthProvider>
        <CartContextProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <Toaster/>
          </QueryClientProvider>
        </CartContextProvider>
      </AuthProvider>
    </>
  );
}
