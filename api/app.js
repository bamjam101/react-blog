const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");

// allows access into .env file in same directory (must have a .env file containing MongoDB database's url for application connection)
dotenv.config();
// allows to send json to server as request and also to retreive response in json form, simply for allowing translation of json in body
app.use(express.json());
//adding path for storing image files when uploaded
app.use("/images", express.static(path.join(__dirname, "/images")));
//mongoose connection statement
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    //app listens only when our database and backend connection is established
    console.log("connected to Mongo!");
  })
  .catch((err) => {
    //error handling  TODO
    console.log(err);
  });

//Configuring storage and upload path
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

//route handlers for different end-points
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen("5000", () => {
  console.log("Listening on port 5000");
});
