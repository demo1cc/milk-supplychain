// context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';

import { useRouter } from 'next/router';

// import { myFetch } from '@/utils/myFetch';
import Cookies from "js-cookie";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const router = useRouter();
  const [loginCheck, setLoginCheck] = useState(false);

  useEffect(() => {
    // Check if the authentication token exists in the cookie
    const storedToken = Cookies.get("token");
    const storedAuthUser = Cookies.get("authUser");
    // console.log(storedToken);
    // const storedMember = JSON.parse(getCookie("member"));

    if (storedToken && storedAuthUser ) {
      // console.log(storedToken, storedAuthUser)
      setToken(storedToken);
      setAuthUser(JSON.parse(storedAuthUser));
      setLoginCheck(true);
    } else {
      setLoginCheck(true);
    }

  }, []); // Empty dependency array ensures this effect runs only once on mount


  const login = (value) => {
    setToken(value.token);
    setAuthUser(value.user);
    Cookies.set("token",  value.token , { expires: 7 })
    Cookies.set("authUser",   JSON.stringify(value.user), { expires: 7 })
  };

  const logout = () => {
    setToken(null);
    setAuthUser(null);
    Cookies.remove("token");
    Cookies.remove("authUser")
    // localStorage.clear()
    router.push("/");
  };



  return (
    <AuthContext.Provider value={{loginCheck,  token, authUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};