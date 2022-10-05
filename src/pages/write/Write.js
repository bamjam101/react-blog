import Sidebar from "../../components/sidebar/Sidebar";
import "./Write.css";

export default function Write() {
  return (
    <>
      <div className="container">
        <div className="Write">
          <div className="preview">
            <header className="doc-title">
              <input className="title" type="text" placeholder="Blog Title..." />
            </header>
            <div className="doc-body">
              <textarea
                className="body"
                type="text"
                placeholder="Blog Body..."
              ></textarea>
            </div>
          </div>
          <button id="btn">Add Blog</button>
        </div>
        <Sidebar />
      </div>
    </>
  );
}
