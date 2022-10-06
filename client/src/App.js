import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import Write from "./pages/write/Write";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Account from "./pages/account/Account";
import Footer from "./components/footer/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const user = true;
  return (
    <Router>
      <div className="App">
        <Topbar />
        <main className="main-container">
          <Routes>
            <Route exact path="/" element={<Home/>} />
            {user? <Route path="/register" element={<Home/>} /> : <Route path="/register" element={<Register/>} />}
            {user? <Route path="/login" element={<Home/>} /> : <Route path="/login" element={<Login/>} />}
            {user? <Route path="/write" element={<Write/>} /> : <Route path="/write" element={<Register/>} />}
            {user? <Route path="/account" element={<Account/>} /> : <Route path="/account" element={<Register/>} />}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
