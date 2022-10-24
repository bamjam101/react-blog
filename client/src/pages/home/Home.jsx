import "./Home.css";
import { useEffect, useState } from "react";
import axios from "axios";

import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import BlogList from "../../components/bloglist/BlogList";
import { useLocation } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);

  const { search } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts" + search);
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
  }, [search])
  return (
    <div className="Home">
      <Header />
      <div className="blog-container">
        <BlogList blogs={posts} />
        <Sidebar cats={categories} />
      </div>
    </div>
  )
}
