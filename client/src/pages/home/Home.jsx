import "./Home.css";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import BlogList from "../../components/blogs/BlogList";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    const fetchPosts = async () => {
      const res = await axios.get("/posts");
      console.log(res);
      setPosts(res);
    }

    fetchPosts();
  }, [])
  return (
    <div className="Home">
        <Header />
        {/* <div className="BlogList">
          <BlogList blogs={posts}/>
        </div> */}
        <Sidebar/>
    </div>
  )
}
