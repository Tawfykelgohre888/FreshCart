import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const cartContext = createContext();

export default function CartContextProvider({ children }) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [allCartItem, setAllCartItem] = useState([]);
  const getToken = () => localStorage.getItem("token");
  const [cartId, setCartId] = useState();
  async function addToCart(productId) {
    try {
      const token = getToken();
      if (!token) return toast.error("You need to be logged in");

      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        { headers: { token } }
      );

      if (res.data.status === "success") {
        toast.success("Product added successfully");
        setNumOfCartItems(res.data.numOfCartItems);
        getItemCart(); // تحديث السلة بعد الإضافة
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  }

  async function getItemCart() {
    try {
      const token = getToken();
      if (!token) return;

      const res = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          headers: { token },
        }
      );
      if (res.data.status === "success") {
        setAllCartItem(res.data.data.products);
        setNumOfCartItems(res.data.numOfCartItems);
        setCartId(res.data.cartId);        
      }
    } catch (err) {
      console.log(err, "error");
    }
  }

  async function updateCartItems(id, count) {
    try {
      const token = getToken();
      if (!token) return;

      const res = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count },
        { headers: { token } }
      );

      if (res.data.status === "success") {
        toast.success("Cart updated successfully");
        getItemCart();
      }
    } catch (err) {
      console.log(err + "error");
      toast.error("Something went wrong while updating cart");
    }
  }

  async function deleteCartItem(id) {
    try {
      const res = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(res);
      if (res.data.status == "success") {
        setAllCartItem(res.data.data.products);
        setNumOfCartItems(res.data.numOfCartItems);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const clearCart = async () => {
    try {
      const token = getToken();
      if (!token) return toast.error("You need to be logged in");

      await axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: token,
        },
      });

      setAllCartItem([]);
      setNumOfCartItems(0);
      toast.success("Cart cleared successfully");
    } catch (error) {
      console.error("Failed to clear cart:", error);
      toast.error("Something went wrong while clearing cart");
    }
  };

  useEffect(() => {
    getItemCart();
  }, []);

  return (
    <cartContext.Provider
      value={{
        addToCart,
        numOfCartItems,
        getItemCart,
        allCartItem,
        updateCartItems,
        deleteCartItem,
        clearCart,
        cartId,
        setNumOfCartItems,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
