import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { Context } from "../../context/Context";
import "./Account.css";

export default function Account() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userUpdateMode, setUserUpdateMode] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);
  const PF = `${process.env.REACT_APP_BASE_URL}/images/`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/upload`, data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/users/` + user._id,
        updatedUser
      );
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      window.location.reload();
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };
  return (
    <div className="Account">
      <form onSubmit={handleSubmit}>
        <div className="account-container">
          <div className="profile">
            <img
              className="profilePic"
              src={file ? URL.createObjectURL(file) : PF + user.profilePic}
              alt=""
            />
            <div className="change-profile">
              {userUpdateMode ? (
                <input
                  type="file"
                  name="fileInput"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                />
              ) : null}
            </div>
          </div>
          <div className="username">
            <label>USERNAME</label>
            {userUpdateMode ? (
              <input
                type="text"
                placeholder={user.username}
                name="username"
                id="username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                autoFocus
              />
            ) : (
              <p id="username">{user.username}</p>
            )}
          </div>
          <div className="email">
            <label>LINKED E-MAIL</label>
            {userUpdateMode ? (
              <input
                type="email"
                placeholder={user.email}
                name="email"
                id="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            ) : (
              <p id="email">{user.email}</p>
            )}
          </div>
          <div className="password">
            <label>Password</label>
            {userUpdateMode ? (
              <input
                type="password"
                placeholder={"New Password"}
                name="password"
                id="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            ) : (
              <p id="password">********</p>
            )}
          </div>
        </div>
        <div className="account-settings">
          {userUpdateMode ? (
            <button
              id="btn"
              type="submit"
              style={{
                position: "relative",
                display: "block",
                margin: "auto",
                cursor: "pointer",
              }}
            >
              Update
            </button>
          ) : (
            <i
              style={{
                position: "relative",
                display: "block",
                margin: "auto",
                cursor: "pointer",
              }}
              className="btn edit-btn fa-regular fa-pen-to-square"
              onClick={() => {
                setUserUpdateMode(true);
              }}
            >
              {" "}
              Edit Profile
            </i>
          )}
        </div>
        {success && (
          <span style={{ color: "lightgreen" }}>Profile has been updated.</span>
        )}
      </form>
    </div>
  );
}
