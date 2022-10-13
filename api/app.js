const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");

// allows access into .env file in same directory (must have a .env file containing MongoDB database's url for application connection)
dotenv.config();
// allows to send json to server as request and also to retreive response in json form, simply for allowing translation of json in body
app.use(express.json());
//body-parser allows to read data from the url itself
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
//mongoose connection statement
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    //app listens only when our database and backend connection is established
    console.log("connected to Mongo!")
    app.listen(5001);
  })
  .catch((err) => {
    //error handling  TODO
    console.log(err);
  });

//route handlers for different end-points
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);
