import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar({ cats }) {
  return (
    <div className="Sidebar">
      <div className="theme">
        <header>
          <h3>Choose Category To Filter Blogs</h3>
        </header>
        <div className="list-wrapper">
          <ul>
            {cats
              ? cats.map((category, index) => {
                  return (
                    <Link
                      key={index}
                      className="spacing link"
                      to={`/?cat=${category.name}`}
                    >
                      <li>{category.name}</li>
                    </Link>
                  );
                })
              : null}
          </ul>
        </div>
      </div>
      <div className="contact-div">
        <i className="contact-icons fa-brands fa-instagram"></i>
        <i className="contact-icons fa-brands fa-linkedin"></i>
        <i className="contact-icons fa-brands fa-facebook-f"></i>
      </div>
    </div>
  );
}
