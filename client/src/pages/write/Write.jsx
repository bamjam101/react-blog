import { useContext } from "react";
import { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { Context } from "../../context/Context";
import axios from "axios";
import "./Write.css";
import { useEffect } from "react";

export default function Write() {
	const [title, setTitle] = useState("");
	const [desc, setDesc] = useState("");
	const [categoryInp, setCategoryInp] = useState("");
	const [newCategory, setNewCategory] = useState("");
	const [newCategories, setNewCategories] = useState("");
	const [file, setFile] = useState(null);
	const { user } = useContext(Context);
	const [categories, setCategories] = useState([]);

	const fetchCategories = async () => {
		const res = await axios.get("/categories");
		const data = res.data;
		console.log(data)
		setCategories(data);
	}

	useEffect(() => {
		fetchCategories();
	}, []);

	useEffect(() => {
		const oldCategories = categories;
		if (categoryInp) {
			const updatedCategories = oldCategories.push(categoryInp);
			setNewCategories(updatedCategories);
		} else {
			const updatedCategories = oldCategories.push(newCategory);
			setNewCategories(updatedCategories);
		}
	}, [newCategory, categories, categoryInp])

	const handleSubmit = async event => {
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
			window.location.replace("/post/" + res.data._id)
		} catch (err) {
			console.log(err);
		}
	}

	const addCategoryInputVisible = () => {
		const categoryInput = document.querySelector(".category-input");
		categoryInput.style.opacity = "1";
	}
	const addCategoryInputInvisible = () => {
		const categoryInput = document.querySelector(".category-input");
		categoryInput.style.opacity = "0";
	}
	return (
		<>
			<div className="Write">
				<form onSubmit={handleSubmit}>
					<div className="preview">
						<div className="photo-wrapper">
							<img className="blog-photo" src={file} alt="" />
							{file ? <img src={URL.createObjectURL(file)} alt="" /> : (
								<div className="upload-box">
									<h3>Upload A Cover Photo</h3>
									<input type="file" onChange={(event) => {
										setFile(event.target.files[0]);
									}} />
								</div>
							)}
						</div>
						<header className="doc-title">
							<input className="title" type="text" placeholder="Blog Title..." onChange={(event) => {
								setTitle(event.target.value);
							}} />
							<button type="submit" id="btn">Add Blog</button>
						</header>
						<div className="category-select">
							<select id="category-selection" onChange={(event) => {
								const selection = event.target.selectedOptions[0].value;
								if (selection === 'custom') {
									addCategoryInputVisible();
								} else {
									addCategoryInputInvisible();
									setCategoryInp(selection);
								}
							}}>
								<option value="custom">Add Custom Category</option>
								{categories?.map((category) => {
									return (
										<option value={category.toLowerCase()}><span>{category}</span></option>
									);
								})}
							</select>
							<input className="category-input" type="text" onChange={(event) => {
								const newCat = event.target.value;
								setNewCategory(newCat);
							}} />
						</div>
						<div className="doc-body">
							<textarea
								className="body"
								type="text"
								placeholder="Blog Body..."
								onChange={(event) => {
									setDesc(event.target.value);
								}}
							></textarea>
						</div>
					</div>
				</form>
				<Sidebar />
			</div>
		</>
	);
}
