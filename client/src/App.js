import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import Write from "./pages/write/Write";
import Register from "./pages/register/Register";
import Footer from "./components/footer/Footer";
import Login from "./pages/login/Login";
import Account from "./pages/account/Account";

const App = () => {
  return (
    <div className="App">
        <Topbar/>
        <main className="main-container">
          <Account/>
        </main>
        <Footer/>
    </div>
  );
}

export default App;
