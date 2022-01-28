import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import {
  isLoggedIn,
  logout,
  setFreshToken,
  getToken,
  getTenant,
  getRefreshToken,
  setUserData,
} from "../../helpers";

import Cookies from "js-cookie";
import Api from "../../api";

const handleRefreshToken = async () => {
  const { IdToken } = await Api.refreshToken(getRefreshToken());
  setFreshToken(IdToken);
};

const handleUserCheck = async () => {
  const userId = Cookies.get("userId");
  const userData = await Api.getCurrentUser(getToken(), getTenant(), userId);
  setUserData(userData);
};

export default function PrivateRoutes({
  component: Component,
  location,
  ...rest
}) {
  const router = useRouter();

  const checkLoggin = () => {
    if (isLoggedIn()) {
      handleRefreshToken();
    } else {
      logout(() => {
        console.log("clear");
      });
    }

    if (
      !isLoggedIn() &&
      (location.pathname !== `/app` || location.pathname === "/")
    ) {
      router.push("/");
      return () => null;
    }

    return null;
  };

  const checkCurrentUser = () => {
    if (isLoggedIn()) {
      handleUserCheck();
    }
  };

  useEffect(() => {
    checkLoggin();
    checkCurrentUser();
  }, [location.pathname]);

  return <Component {...rest} />;
}
