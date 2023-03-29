import "./SinglePost.css";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function Single() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [postFetched, isFetching] = useState(false);
  const [like, setLike] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setLike(res.data.liked.length);
      setComments(res.data.comments);
      isFetching(true);
    };
    getPost();
  }, [path]);

  useEffect(() => {
    postFetched && setIsLiked(post.liked.includes(user?.username));
  }, [user?.username, post.liked, postFetched]);

  const handleLike = () => {
    try {
      axios.put("/posts/" + path + "/like", { username: user?.username });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  const handleComment = async (text, user, event) => {
    try {
      await axios.put("/posts/" + path + "/comment", { text, user });
    } catch (err) {}
  };

  const handleDelete = async () => {
    try {
      await axios.delete("/posts/" + path, {
        data: { username: user?.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put("/posts/" + path, {
        username: user?.username,
        title,
        desc,
      });
      setUpdateMode(false);
    } catch (err) {}
  };

  return (
    <div className="Single">
      <div className="blog-preview">
        <div className="blog-photo">
          {post.photo ? <img src={PF + post.photo} alt={""} /> : null}
        </div>
        <div className="redirect-container">
          <div className="user-detail">
            <h3>
              <i className="fa-regular fa-user"></i> {post.username}
            </h3>

            <span>
              More Blogs From {post.username}{" "}
              <Link className="link" to={`/?user=${post.username}`}>
                <i className="cursor fa-solid fa-arrow-up-right-from-square"></i>
              </Link>
            </span>

            {post.categories && (
              <div className="post-category">
                Categories:
                {post.categories.map((category, index) => {
                  return (
                    <Link
                      key={index}
                      className="spacing link"
                      to={`/?cat=${category}`}
                    >
                      {category}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
          <div className="update-delete-container">
            {post.username === user?.username ? (
              <>
                <i
                  className="btn edit-btn fa-regular fa-pen-to-square"
                  onClick={() => {
                    setUpdateMode(true);
                  }}
                ></i>
                <i
                  className="btn del-btn fa-regular fa-trash-can"
                  onClick={handleDelete}
                ></i>
              </>
            ) : (
              <div className="like-wrapper">
                {user?.username && (
                  <i
                    style={{
                      backgroundColor: "transparent",
                      transition: "background-color 1s",
                    }}
                    className="btn like-btn fa-regular fa-heart"
                    onClick={handleLike}
                  ></i>
                )}
                <span> {like} likes</span>
              </div>
            )}
          </div>
        </div>
        <div className="title-preview">
          {updateMode ? (
            <input
              type="text"
              className="title"
              value={title}
              style={{ padding: "1rem" }}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              autoFocus
            />
          ) : (
            <h2>{title}</h2>
          )}
        </div>
        <div className="body-preview">
          {updateMode ? (
            <textarea
              type="text"
              className="body"
              value={desc}
              style={{
                padding: "1rem",
                textAlign: "start",
                display: "flex",
                justifyContent: "start",
              }}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            />
          ) : (
            <p>{desc}</p>
          )}
        </div>
        {updateMode ? (
          <button id="btn" style={{ top: "42vh" }} onClick={handleUpdate}>
            Update Blog
          </button>
        ) : null}
      </div>
      <div className="comment-box">
        <div className="comment-box">
          <form
            id="comment-form"
            onSubmit={(e) => {
              handleComment(e.target[0].value, user.username);
              window.location.reload(true);
              e.target[0].value = "";
            }}
          >
            <header>
              <h2>Comment Section</h2>
            </header>
            <div>
              {post?.comments && (
                <div>
                  {comments.map((record, index) => {
                    return (
                      <h4 key={index}>
                        {record.postedBy}: {record.text}
                      </h4>
                    );
                  })}
                </div>
              )}
            </div>
            {user?.username && (
              <input type="text" placeholder="Add A comment" />
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
