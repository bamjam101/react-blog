import { Link } from "react-router-dom";
import BlogList from "../bloglist/BlogList";
import "./Sidebar.css";

export default function Sidebar({ cats }) {

    return (
        <div className="Sidebar">
            <section className="side-bar">
                <header className="page-header">
                    <h1>Toolbar</h1>
                </header>
                <div className="img-list">
                    <header>
                        <h3>Select</h3>
                    </header>
                </div>
                <div className="theme">
                    <header>
                        <h3>Choose Theme To Filter Blogs</h3>
                    </header>
                    <div className="list-wrapper">
                        <ul>
                            {cats?.categories ? (cats?.categories.map(category => {
                                return (
                                    <Link className="link" to={`/cat?=${category.name}`}>
                                        <li>{category.name}</li>
                                    </Link>
                                )
                            }
                            )) : null}
                        </ul>
                    </div>
                </div>
                <div className="contact-div">
                    <i className="contact-icons fa-brands fa-instagram"></i>
                    <i className="contact-icons fa-brands fa-linkedin"></i>
                    <i className="contact-icons fa-brands fa-facebook-f"></i>
                </div>
            </section>
        </div>
    )
}
