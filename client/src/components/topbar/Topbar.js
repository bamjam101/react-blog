import "./Topbar.css";
import { Link } from "react-router-dom";

export default function Topbar() {
  const user = true;
  return (
    <div className="Topbar">
      <header>
        <div className="logo"></div>
        <h2>Bloggie</h2>
      </header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>{user ? <Link to="/write">New Blog</Link> : ""}</li>
          <li>{user ? <Link to="/account">Account</Link> : ""}</li>
        </ul>
      </nav>
      <nav>
        <ul>
          {user ? (
            ""
          ) : (
            <>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}
