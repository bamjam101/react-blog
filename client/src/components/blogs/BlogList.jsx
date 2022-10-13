import Blog from "../blog/Blog";

export default function BlogList(posts) {
    return (
        <div className="blogs">
            {posts.map(blog => (
                <Blog post={blog} />
            ))}
        </div>
    )
}