import React from "react";
import "./Blog.css";
import {Link} from "react-router-dom";

export default function Blog({blog}) {
    return(
        <div className="Blog">
            <Link className="link" to={`/post/${blog._id}`}>
                <div className="img-wrapper">
                    {blog.photo && <img src={blog.photo} alt="blog-theme-img" />}
                </div>
                <header>
                    <h3>{blog.title}</h3>
                </header>
                <div className="body-wrapper">
                    <p>{blog.desc}</p>
                </div>
                <footer>
                    <h4>{blog.username}</h4>
                    <div className="categories-wrapper">
                        <ul>
                            {blog.categories.map(category => {
                                return(
                                    <li>{category}</li>
                                )
                            })}
                        </ul>
                    </div>
                </footer>
            </Link>
        </div>
    )
}