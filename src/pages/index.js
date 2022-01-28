import styles from "../styles/Home.module.css";
import Image from "next/image";

export default function Home() {
  return (
    <div className={styles.home}>
      <div className="banner">
        <Image src="/users.png" width={440} height={300} />
      </div>
      <h2>Welcome to our users!</h2>
      <div>
        <p>
          This app is made for our community and all the members that are in. If
          u have an account and you are logged in. You will be able to see all
          the information about the members.
        </p>
      </div>
    </div>
  );
}
