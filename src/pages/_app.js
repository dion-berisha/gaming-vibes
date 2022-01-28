// import Navbar from "../components/atoms/navbar";
import { AuthContextProvider } from "../stores/authContext";
import "../styles/globals.css";

// import PrivateRoutes from "../hoc/private-route";

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      {/* <Navbar /> */}
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}

export default MyApp;
