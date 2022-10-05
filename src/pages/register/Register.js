import "./Register.css";

export default function Register() {
  return (
    <div className="Register">
      <main className="container">
        <div className="form" id="proceed">
          <form name="inputForm">
            <label for="fname">First Name</label>
            <input
              id="fname"
              name="fname"
              type="text"
              placeholder="Type here..."
              required
            />

            <label for="lname">Last name</label>
            <input
              id="lname"
              name="lname"
              type="text"
              placeholder="Type here..."
              required
            />

            <label for="email">E-mail</label>
            <input
              id="email"
              name="email"
              type="text"
              placeholder="Type here..."
              required
            />

            <label>Status</label>
            <div className="toggle-wrapper">
              <label for="status0">
                <input
                  className="toggle"
                  type="radio"
                  value="student"
                  name="status"
                  id="status0"
                />
                Student
              </label>
              <label for="status1">
                <input
                  className="toggle"
                  type="radio"
                  value="employed"
                  name="status"
                  id="status1"
                />
                Employed
              </label>
              <label for="status2">
                <input
                  className="toggle"
                  type="radio"
                  value="others"
                  name="status"
                  id="status2"
                />
                others
              </label>
            </div>

            <div className="button">
              <a id="proceedBtn" onclick="mainFunction()">
                <span className="hover">Hover Here</span>
                <span className="change">Proceed</span>
              </a>
            </div>
          </form>
        </div>

        <div id="One" className="formTwo">
          <form action="account.html" name="inputFormTwo">
            <label>UserName</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Create an username"
              required
            />

            <label>Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              required
            />

            <label>Confirm Password</label>
            <input
              id="confirmPass"
              name="password"
              type="password"
              placeholder="Confirm your password"
              required
            />
            <label>
              <input
                className="check"
                type="checkbox"
                value="Accept"
                name="termsAndConditions"
                id="termsAndConditions"
                required
              />
              <a href="www.google.com">Agree to the Terms & conditions</a>
            </label>
            <button onclick="details()" id="submitBtn" type="submit">
              Submit
            </button>
          </form>
        </div>
      </main>
      
    </div>
  );
}
