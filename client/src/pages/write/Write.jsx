import { useContext } from "react";
import { useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import "./Write.css";
import { useEffect } from "react";

export default function Write() {
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [newCategories, setNewCategories] = useState([]);
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const res = await axios.get("/categories");
    const data = res.data;
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      categories: newCategories,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCategory = async (event) => {
    event.preventDefault();
    const others = newCategories;
    const inputValue = document.querySelector(".category-input").value;
    console.log(inputValue);
    if (!newCategories.includes(inputValue)) {
      const newCat = [inputValue, ...others];
      setNewCategories(newCat);
    }
  };

  const addCategoryInputVisible = () => {
    const categoryInput = document.querySelector(".category-input");
    categoryInput.style.opacity = "1";
  };
  const addCategoryInputInvisible = () => {
    const categoryInput = document.querySelector(".category-input");
    categoryInput.style.opacity = "0";
  };

  return (
    <>
      <div className="Write">
        <form onSubmit={handleSubmit}>
          <div className="preview">
            <div className="photo-wrapper">
              <img className="blog-photo" src={file} alt="" />
              {file ? (
                <img src={URL.createObjectURL(file)} alt="" />
              ) : (
                <div className="upload-box">
                  <h3>Upload A Cover Photo</h3>
                  <input
                    type="file"
                    onChange={(event) => {
                      setFile(event.target.files[0]);
                    }}
                  />
                </div>
              )}
            </div>
            <header className="doc-title">
              <input
                className="title"
                type="text"
                placeholder="Blog Title..."
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
              <button type="submit" id="btn">
                Add Blog
              </button>
            </header>

            <div className="doc-body">
              <textarea
                className="body"
                type="text"
                placeholder="Blog Body..."
                onChange={(event) => {
                  setDesc(event.target.value);
                }}
                required
              ></textarea>
            </div>
          </div>
        </form>
        <form onSubmit={handleCategory} className="category-form">
          <label>Any category? </label>
          <select
            id="category-selection"
            onChange={(event) => {
              const selection = event.target.selectedOptions[0].value;
              if (selection === "Custom") {
                document.querySelector(".category-input").value = "";
                addCategoryInputVisible();
              } else {
                addCategoryInputInvisible();
                setTimeout(() => {
                  document.querySelector(".category-input").value = selection;
                }, 500);
              }
            }}
          >
            <option value="Custom">Add Custom Category</option>
            {categories.map((category) => {
              return <option value={category.name}>{category.name}</option>;
            })}
          </select>
          <input
            className="category-input"
            type="text"
            name="category"
            id="category"
            placeholder="Type here..."
          />
          <button className="category-btn" type="submit">
            Add Category
          </button>
          <div className="category-wrapper">
            <ul>
              {newCategories?.map((blogCat) => {
                return <li>{blogCat}</li>;
              })}
            </ul>
          </div>
        </form>
      </div>
    </>
  );
}
