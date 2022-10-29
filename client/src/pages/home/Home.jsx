import "./Home.css";
import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../../components/sidebar/Sidebar";
import BlogList from "../../components/bloglist/BlogList";
import { useLocation } from "react-router-dom";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const { search } = useLocation();

  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
    const res = await axios.get(`/posts/?search=${query}`)
    setPosts(res.data);
    };
    fetch();
  }, [query]);

  const handleSearch = async (event) => {
    event.preventDefault();
    const res = await axios.get(`/posts/?search=${query}`)
    setPosts(res.data)
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts/" + search);
      const data = res.data;
      setPosts(data);
    }

    const fetchCategories = async () => {
      const res = await axios.get("/categories");
      const data = res.data;
      setCategories(data);
    }

    fetchPosts();
    fetchCategories();
  }, [search]);

  return (
    <div className="Home">
      <div className="Header">
        <header>
          <h1>Find It By Typing.</h1>
        </header>
        <div className="search-div">
          {/* <form onSubmit={handleSearch}>
            <input type="text" name="search" id="searchbar" placeholder="Enter Search term here...." onChange={(e) => {
              setQuery(e.target.value)
            }} />
            <button type="submit"></button>
          </form> */}
          <form autoComplete="off" onSubmit={handleSearch} onChange={(e) => {
              setQuery(e.target.value)
            }}>
            <input type="text" name="search" id="searchbar" placeholder="Enter Search term here...." />
            <button id="search-btn" type="submit">Search
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            </button>
          </form>
        </div>
      </div>

      <div className="blog-container">
        <BlogList blogs={posts} />
        <Sidebar cats={categories} />
      </div>
    </div>
  )

}
