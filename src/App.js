import Topbar from "./topbar/Topbar";
import Home from "./pages/home/Home";
import Footer from "./footer/Footer";

const App = () => {
  return (
    <div className="App">
        <Topbar/>
        <Home/>
        <Footer/>
    </div>
  );
}

export default App;
