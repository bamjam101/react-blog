import { useContext } from "react";
import { Context } from "../../context/Context";
import "./Header.css";

export default function Header() {
  const {user} = useContext(Context);
  const handleSearch =  async() => {
    try{

    } catch(err) {
      console.log(err);
    }
  }
  return (
    <div className="Header">
      <header>
        <h1>Find It At One Click.</h1>
      </header>
      <div className="search-div">
        <form onSubmit={handleSearch}>
          <input type="text" name="search" id="searchbar" />
          <button type="submit">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
