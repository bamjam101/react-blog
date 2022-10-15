import React from "react";
import "./BlogList.css";
import Blog from "../blog/Blog";

export default function BlogList({ blogs }) {
    return (
        <div className="bloglist">
            {blogs.map(blog => {
                return (
                    <Blog blog={blog} />
                )
            })}
        </div>
    )
}