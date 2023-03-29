import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import Write from "./pages/write/Write";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Account from "./pages/account/Account";
import Single from "./pages/single/Single";
import Footer from "./components/footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

const App = () => {
  const {user} = useContext(Context);
  return (
    <Router>
      <Topbar />
      <div className="main-container">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/register" element={user ? <Home /> : <Register />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="/write" element={user ? <Write /> : <Register />} />
          <Route path="/account" element={user ? <Account /> : <Register />} />
          <Route path="/post/:postId" element={<Single />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
