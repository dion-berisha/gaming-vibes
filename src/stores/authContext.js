import { createContext, useState } from "react";
import { useEffect } from "react";
// import netlifyIdentity from "netlify-identity-widget";

import { getToken, isLoggedIn } from '../helpers';

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  initiateLogin: () => {},
  authReady: false,
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  const token = getToken();
  const loggedIn = isLoggedIn();

  useEffect(() => {

    // if (token) {
    //   setUser
    // }

    // if (loggedIn) {

    // }

    // Initiate logging off
    // return () => {
    //   netlifyIdentity.off("login");
    //   netlifyIdentity.off("logout");
    // };
  }, []);



  // We will use, the below function to successfully, 
  // finish the login process

  const login = (val) => {
    console.log('We are calling the value here', val)
    setUser(val);
    setAuthReady(true);
  };

  const logout = (val) => {
    console.log(val)
    setUser(null);
  };

  const initiateLogin = () => {
    setAuthReady(true);
  }

  const context = { user, login, logout, initiateLogin, authReady };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
