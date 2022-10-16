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
    // <Router>
    //   <div className="App">
    //     <Topbar />
    //     <main className="main-container">
    //       <Routes>
    //         <Route exact path="/" element={<Home/>} />
    //         <Route path="/api/post" element={<Single/>} />
    //         {user? <Route path="/register" element={<Home/>} /> : <Route path="/register" element={<Register/>} />}
    //         {user? <Route path="/login" element={<Home/>} /> : <Route path="/login" element={<Login/>} />}
    //         {user? <Route path="/write" element={<Write/>} /> : <Route path="/write" element={<Register/>} />}
    //         {user? <Route path="/account" element={<Account/>} /> : <Route path="/account" element={<Register/>} />}
    //       </Routes>
    //     </main>
    //     <Footer />
    //   </div>
    // </Router>

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
      <Footer />
    </Router>
  );
};

export default App;
