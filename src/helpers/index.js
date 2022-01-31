import Cookies from "js-cookie";

export const END_POINT = [
  `https://lv82ulkizg.execute-api.eu-central-1.amazonaws.com/dev`,
  `https://ygl337zwfd.execute-api.eu-central-1.amazonaws.com/test`,
  `https://otgobr6nd6.execute-api.eu-central-1.amazonaws.com/preprod`,
  `https://jd5ekuaoi9.execute-api.eu-central-1.amazonaws.com/prod`,
  `http://127.0.0.1:3000/local`,
];

export const isBrowser = () => typeof window !== 'undefined';

export const setToken = (token, refreshToken, userId, tenants, role) => {
  Cookies.set("token", token, {
    expires: 1 / 24,
    secure: true,
    sameSite: "Strict",
  });
  Cookies.set("refreshToken", refreshToken, {
    expires: 7,
    secure: true,
    sameSite: "Strict",
  });
  Cookies.set("userId", userId, {
    expires: 365,
    secure: true,
    sameSite: "Strict",
  });

  localStorage.setItem("tenants", JSON.stringify(tenants));
  localStorage.setItem("role", JSON.stringify);
};

export const setFreshToken = (token) => {
  Cookies.set("token", token, {
    expires: 3 / 24,
    secure: true,
    sameSite: "Strict",
  });
};

export const getRefreshToken = () =>
  isBrowser() && Cookies.get("refreshToken")
    ? Cookies.get("refreshToken")
    : null;

export const getTenant = () =>
  isBrowser() && Cookies.get("tenantId") ? Cookies.get("tenantId") : null;

export const getToken = () =>
  isBrowser() && Cookies.get("token") ? Cookies.get("token") : null;

export const isLoggedIn = () => {
  const token = getToken();
  return !!token;
};

export const logout = (callback) => {
  Cookies.remove("token");
  Cookies.remove("env");
  Cookies.remove("userId");
  Cookies.remove("tenantId");
  Cookies.remove("refreshToken");

  localStorage.removeItem("tenants");
  localStorage.removeItem("role");

  localStorage.removeItem("userData");
  return callback();
};
