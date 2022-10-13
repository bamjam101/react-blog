import "./Blog.css";
import {Link} from "react-router-dom";

export default function Blog(post) {
    return(
        <div className="Blog">
            <Link className="link" to={`/posts/${post._id}`}>
                <div className="img-wrapper">
                    {post.photo && <img src={post.photo} alt="blog-theme-img" />}
                </div>
                <header>
                    <h3>{post.title}</h3>
                </header>
                <div className="body-wrapper">
                    <p>{post.desc}</p>
                </div>
                <footer>
                    <h3>{post.author}</h3>
                </footer>
            </Link>
        </div>
    )
}