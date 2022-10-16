import "./SinglePost.css";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../sidebar/Sidebar";
import { useContext } from "react";
import { Context } from "../../context/Context";


export default function Single() {
    const { user } = useContext(Context);
    const [blog, setBlog] = useState({});
    const [categories, setCategories] = useState([]);
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const PF = "http://localhost:5000/images/";

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [like, setLike] = useState("");
    const [updateMode, setUpdateMode] = useState(false);

    const [isLiked, setIsLiked] = useState(false);

    const handleDelete = async () => {
        try {
            await axios.delete("/posts/" + path, {
                data: { username: user.username }
            });
            window.location.replace("/");
        } catch (err) {
            console.log(err);
        }
    };

    const handleUpdate = async () => {
        try {
            await axios.put("/posts/" + path, {
                username: user.username, title, desc
            });
            setUpdateMode(false);
        } catch (err) {
            console.log(err);
        }
    };

    const likeBtn = document.getElementsByClassName("like-btn");
    console.log(likeBtn)
    const handleLike = async () => {
        try{
            
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const getBlog = async () => {
            const res = await axios.get("/posts/" + path);
            const data = res.data;
            setTitle(res.data.title);
            setDesc(res.data.desc);
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
                    {blog.photo ? <img src={PF + blog.photo} alt={""} /> : null}
                </div>
                <div className="redirect-container">
                    <div className="user-detail">
                        <h3><i className="fa-regular fa-user"></i> {blog.username}</h3>

                        <span>More Blogs From {blog.username} <Link className="link" to={`/?user=${blog.username}`}><i className="cursor fa-solid fa-arrow-up-right-from-square"></i></Link></span>
                    </div>
                    <div className="update-delete-container">
                        {blog.username === user?.username ?
                            (
                                <>
                                    <i className="btn edit-btn fa-regular fa-pen-to-square" onClick={() => {
                                        setUpdateMode(true)
                                    }}></i>
                                    <i className="btn del-btn fa-regular fa-trash-can" onClick={handleDelete}></i>
                                </>) : <i style={{backgroundColor: "transparent"}} className="btn like-btn fa-regular fa-heart" onClick={handleLike}></i>
                        }
                    </div>
                </div>
                <div className="title-preview">
                    {updateMode ? <input type="text" className="title" value={title} style={{ padding: "1rem" }} onChange={(e) => { setTitle(e.target.value) }} autoFocus /> : <h2>{title}</h2>}
                </div>
                <div className="body-preview">
                    {updateMode ? <textarea type="text" className="body" value={desc} style={{ padding: "1rem", textAlign: "start", display: "flex", justifyContent: "start" }} onChange={(e) => { setDesc(e.target.value) }} /> : <p>{desc}</p>}
                </div>
                {updateMode ? <button id="btn" style={{ top: "42vh" }} onClick={handleUpdate}>Update Blog</button> : null}
            </div>
            <Sidebar categories={categories} />
        </div>
    );
}
