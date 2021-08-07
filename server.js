const express = require("express");
const app = express();
const cors = require("cors");
const springedge = require("springedge");
const routes = require("./routes/routes");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3033;

const mongodbConnectURL = "mongodb+srv://DevOlumide:olumide16@cluster0.w0bv7.mongodb.net/users?retryWrites=true&w=majority" ;

mongoose.connect(process.env.MONGODB_URI || mongodbConnectURL, {useNewUrlParser: true}, () => {
  console.log("Mongoose connected successfully")
});




app.use(express.json());
app.use(cors());
app.use("/app", routes);

/* checks production mode and connects to client */

if(process.env.NODE_ENV === "production"){
  app.use(express.static("client/build"));
}

app.listen(PORT, () => {
  console.log("Server started at port: " + PORT)
})