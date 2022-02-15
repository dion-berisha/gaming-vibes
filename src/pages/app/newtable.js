import { useContext, useEffect, useState } from "react";
import styles from "../../styles/Guides.module.css";
import AuthContext from "./../../stores/authContext";
import { NewTable } from "./../../tables/NewTable";
import Navbar from "../../components/atoms/navbar/index.js";

export default function Guides() {
  const { user, authReady, login } = useContext(AuthContext);
  const [guides, setGuides] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authReady) {}
  }, [user, authReady]);

  return (
    <div className={styles.guides}>
      {!authReady && <div>Loading...</div>}
      <Navbar />
      {error && (
        <div className={styles.error}>
          <p>{error}</p>
        </div>
      )}

      {user && <NewTable />}
    </div>
  );
}
