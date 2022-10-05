import "./Topbar.css";

export default function Topbar() {
  return (
    <div className="Topbar">
      <header>
        <div className="logo"></div>
        <h2>Bloggie</h2>
      </header>
      <nav>
        <ul>
          <a href="#">
            <li>Home</li>
          </a>
          <a href="#">
            <li>About</li>
          </a>
          <a href="#">
            <li>Contact</li>
          </a>
        </ul>
      </nav>
    </div>
  );
}
