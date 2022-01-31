import { useContext, useEffect, useState } from "react";
import styles from "../../styles/Guides.module.css";
import AuthContext from "./../../stores/authContext";
import { UsersTable } from "./../../tables/UsersTable";

export default function Guides() {
  const { user, authReady, login } = useContext(AuthContext);
  const [guides, setGuides] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(authReady);  
    if (authReady) {
      // fetch(
      //   "/.netlify/functions/members",
      //   user && {
      //     headers: {
      //       Authorization: "Bearer " + user.token.access_token,
      //     },
      //   }
      // )
      //   .then((res) => {
      //     if (!res.ok) {
      //       login();
      //       throw Error("You must be logged in to view this content!");
      //     }
      //     return res.json();
      //   })
      //   .then((data) => {
      //     setGuides(data);
      //     setError(null);
      //   })
      //   .catch((err) => {
      //     setError(err.message);
      //     setGuides(null);
      //   });
    }
  }, [user, authReady]);

  return (
    <div className={styles.guides}>
      {!authReady && <div>Loading...</div>}
      <h1>Users Page</h1>
      {error && (
        <div className={styles.error}>
          <p>{error}</p>
        </div>
      )}

      {guides && <UsersTable />}
    </div>
  );
}
