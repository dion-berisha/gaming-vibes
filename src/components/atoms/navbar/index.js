import Link from "next/link";
import Image from "next/image";
import AuthContext from "../../../stores/authContext";
import { useContext } from "react";

export default function Navbar() {
  const { user, login, logout, authReady } = useContext(AuthContext);

  return (
    <div className="container">
      <nav>
        <h1>Admin Tool</h1>
        {authReady && (
          <ul>
            <li>
              <Link href="/ ">
                <a>Home</a>
              </Link>
            </li>
            {user && (
              <>
                <li>
                  <Link href="/app/users">
                    <a>Users</a>
                  </Link>
                </li>

                <li>
                  <Link href="/app/newtable">
                    <a>Table</a>
                  </Link>
                </li>
              </>
            )}
          </ul>
        )}

        {user && (
          <Link href="/ ">
            <li onClick={logout} className="btn">
              Logout
            </li>
          </Link>
        )}
      </nav>
    </div>
  );
}
