import { useState } from "react";
import axios from "axios";
import "./Register.css";
import { Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="Register">
      <main className="container">
        <div className="form">
          <form name="inputForm" onSubmit={handleSubmit}>
            <label>UserName</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Create Username..."
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label>E-mail</label>
            <input
              id="email"
              name="email"
              type="text"
              placeholder="Enter Email..."
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Set Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="New Password..."
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="button">
              <button id="proceedBtn" type="submit">
                <span className="hover">Hover Here</span>
                <span className="change">Register</span>
              </button>
            </div>
          </form>
        </div>
      </main>
      {error && (
        <span
          style={{
            color: "red",
            width: "100%",
            marginTop: "100px",
            textAlign: "center",
            margin: "auto",
            display: "block",
          }}
        >
          Something Went Wrong. Kindly Refresh!
        </span>
      )}
    </div>
  );
}
