import "./Topbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function Topbar() {
  const { user, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="Topbar">
      <header>
        <div className="logo"></div>
        <h2>Bloggie</h2>
      </header>
      <nav>
        <ul>
          <li>
            <Link className="link" to="/">Home</Link>
          </li>
          <li>{user ? <Link className="link" to="/write">New Blog</Link> : null}</li>
          <li>{user ? <Link className="link" to="/account">Account</Link> : null}</li>
        </ul>
      </nav>
      <nav>
        <ul>
          {user ? (
            <li onClick={handleLogout}>
              <Link className="link" to="/register">Logout</Link>
            </li>
          ) : (
            <>
              <li>
                <Link className="link" to="/register">Register</Link>
              </li>
              <li>
                <Link className="link" to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}
