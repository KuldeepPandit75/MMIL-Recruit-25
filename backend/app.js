const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

dotenv.config({ path: "./config.env" });

require("./db/connect");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use(require("./routes/formRoutes"));

const middleware = (req, res, next) => {
  console.log("hello my middleware");
  next();
};

app.get("/about", middleware, (req, res) => {
  res.send(`Hello world from the server`);
});


// app.get('/',(req,res)=>{
//     app.use(express.static(path.resolve(__dirname,"frontend","build")));
//     res.sendFile(path.resolve(__dirname,"frontend","build","index.html"));
// })
// app.get("/",(req,res)=>{
//     app.use(express.static(path.resolve(__dirname,"frontend","build")));
//     res.sendFile(path.resolve(__dirname,"frontend","build","index.html"));
// })

// Server startup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
