import Link from "next/link";
import Image from "next/image";
import AuthContext from "../stores/authContext";
import { useContext } from "react";

export default function Navbar() {
  const { user, login, logout, authReady } = useContext(AuthContext);
  console.log(user);

  return (
    <div className="container">
      <nav>
        <Image src="/rupee.png" width={50} height={48} />
        <h1>Gaming Vibes</h1>
        {authReady && (
          <ul>
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/guides">
                <a>Guides</a>
              </Link>
            </li>
            {!user && (
              <li onClick={login} className="btn">
                Login/Sign up
              </li>
            )}
            {user && <li>{user.user_metadata.full_name}</li>}
            {user && (
              <li onClick={logout} className="btn">
                Log out
              </li>
            )}
          </ul>
        )}
      </nav>
      <div className="banner">
        <Image src="/banner.png" width={966} height={276} />
      </div>
    </div>
  );
}
