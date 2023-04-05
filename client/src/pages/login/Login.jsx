import axios from "axios";
import { useContext, useRef } from "react";
import { Context } from "../../context/Context";
import "./Login.css";

export default function Login() {
  const userRef = useRef();
  const passRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/login`,
        {
          username: userRef.current.value,
          password: passRef.current.value,
        }
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
  return (
    <div className="Login">
      <div id="One" className="formTwo">
        <form name="inputFormTwo" onSubmit={handleSubmit}>
          <label>UserName</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Create an username"
            ref={userRef}
            required
          />

          <label>Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Create a password"
            ref={passRef}
            required
          />
          <div className="checkbox-wrapper">
            <label className="checkbox">
              <input
                className="check"
                type="checkbox"
                value="Accept"
                name="termsAndConditions"
                id="termsAndConditions"
                required
              />
              <span>Agree to the Terms & conditions</span>
            </label>
            <a href="hi">
              <i className="icon fa-solid fa-arrow-right-from-bracket"></i>
            </a>
          </div>
          <div className="btn-wrapper">
            <button id="submitBtn" type="submit" disabled={isFetching}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
