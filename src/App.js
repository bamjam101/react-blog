import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import Write from "./pages/write/Write";
import Register from "./pages/register/Register";
import Footer from "./components/footer/Footer";

const App = () => {
  return (
    <div className="App">
        <Topbar/>
        <Write/>
        <Footer/>
    </div>
  );
}

export default App;
