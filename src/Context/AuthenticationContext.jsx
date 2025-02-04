// AuthenticationContext.jsx

import React, { createContext, useState } from "react";

export const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  return (
    <authContext.Provider value={{ token, setToken }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
