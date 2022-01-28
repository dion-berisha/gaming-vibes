import Navbar from "../components/atoms/navbar";
import "../styles/globals.css";
import { AuthContextProvider } from "../stores/authContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Navbar />
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}

export default MyApp;
