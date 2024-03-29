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
  const PF = "https://bloggie.onrender.com/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [postFetched, isFetching] = useState(false);
  const [like, setLike] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentId, setCommentId] = useState("");

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/posts/` + path
      );
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

  const copyToClipboard = () => {
    var inputc = document.body.appendChild(document.createElement("input"));
    inputc.value = window.location.href;
    inputc.focus();
    inputc.select();
    document.execCommand("copy");
    inputc.parentNode.removeChild(inputc);
    alert("URL Copied.");
  };

  const handleLike = () => {
    try {
      axios.put(`${process.env.REACT_APP_BASE_URL}/posts/` + path + "/like", {
        username: user?.username,
      });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };
  const handleComment = async (text, user, event) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/posts/` + path + "/comment",
        { text, user }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleReply = async (text, user, commentId, event) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/posts/` +
          path +
          "/comment/" +
          commentId,
        {
          text,
          user,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/posts/` + path, {
        data: { username: user?.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_BASE_URL}/posts/` + path, {
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
            <>
              <i
                style={{
                  backgroundColor: "transparent",
                  transition: "background-color 1s",
                }}
                onClick={copyToClipboard}
                className="btn like-btn fa-solid fa-link"
              ></i>
              {post.username !== user?.username && <span> Share</span>}
            </>
          </div>
        </div>
        <div className="title-preview">
          <div className="grid-align">
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
          <div className="grid-align">
            {updateMode ? (
              <button id="btn" onClick={handleUpdate}>
                Update Blog
              </button>
            ) : null}
          </div>
        </div>
        <div className={`body-preview`}>
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
      </div>
      {!updateMode && (
        <div className="comment-box">
          <form
            id="comment-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (commentId) {
                handleReply(e.target[0].value, user.username, commentId);
              } else {
                handleComment(e.target[0].value, user.username);
              }
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
                      <div className="comment-div" key={index}>
                        <h4>
                          {record.commentBy}: {record.text}
                          {user?.username && (
                            <span
                              className="reply"
                              onClick={() => {
                                setCommentId(post.comments[index]._id);
                                console.log(commentId);
                                document
                                  .getElementById("comment-input")
                                  .focus();
                              }}
                            >
                              <i
                                style={{
                                  backgroundColor: "transparent",
                                  transition: "background-color 1s",
                                }}
                                className="btn fa-solid fa-comment-dots"
                              ></i>
                            </span>
                          )}
                        </h4>
                        <ul>
                          {record?.nestedComment?.map(
                            (nestedComment, index) => {
                              return (
                                <li key={index}>
                                  {nestedComment.commentBy}:{" "}
                                  {nestedComment.text}
                                </li>
                              );
                            }
                          )}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            {user?.username && (
              <input
                type="text"
                id="comment-input"
                placeholder="Leave a comment"
              />
            )}
          </form>
        </div>
      )}
    </div>
  );
}
