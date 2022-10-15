import "./SinglePost.css";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../sidebar/Sidebar";

export default function Single() {
    const [blog, setBlog] = useState({});
    const [categories, setCategories] = useState([]);
    const location = useLocation();
    const path = location.pathname.split("/")[2];

    useEffect(() => {
        const getBlog = async () => {
            const res = await axios.get("/posts/" + path);
            const data = res.data;
            setBlog(data);
        }
        const fetchCategories = async () => {
            const res = await axios.get("/categories");
            const data = res.data;
            setCategories(data);
        }

        fetchCategories();
        getBlog();
    }, [path]);
    return (
        <div className="Single">
            <div className="blog-preview">
                <div className="blog-photo">
                    <img src={blog.photo} alt="blog-theme" />
                </div>
                <div className="redirect-container">
                    <div className="user-detail">
                        <h3><i className="fa-regular fa-user"></i> {blog.username}</h3>

                        <span>More Blogs From {blog.username} <Link className="link" to={`/?user=${blog.username}`}><i className="cursor fa-solid fa-arrow-up-right-from-square"></i></Link></span>
                    </div>
                    <div className="update-delete-container">
                        <i className="btn edit-btn fa-regular fa-pen-to-square"></i>
                        <i className="btn del-btn fa-regular fa-trash-can"></i>
                    </div>
                </div>
                <div className="title-preview">
                    <h2>{blog.title}</h2>
                </div>
                <div className="body-preview">
                    <p>{blog.desc}</p>
                </div>
            </div>
            <Sidebar categories={categories} />
        </div>
    );
}
