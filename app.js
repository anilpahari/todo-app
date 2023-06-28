const express = require("express");
const mongoose = require("mongoose");
const bodyParse = require("body-parser");
require("dotenv").config();
require("./models/todoschema");

const ejs = require("ejs");
const app = express();
app.use(bodyParse.urlencoded({ extends: true }));
app.use(express.json());
const mongo_connet = process.env.mongo_connect;
mongoose
  .connect(mongo_connet, {})
  .then(() => {
    console.log("Connection to mongo Sucessful.");
  })
  .catch((err) => {
    console.log("Connection Failed....");
  });

app.set("view-engine", "ejs");
const todo_db = new mongoose.model("todo_db");
app.use(express.static("./public"));

app.get("/", async (req, res) => {
  const data = await todo_db.find({});

  res.render("home.ejs", { items: data });
});

app.post("/", async (req, res) => {
  const items = req.body.items;
  const newList = await new todo_db({
    item: items,
  });
  newList.save();
  res.redirect("/");
});

// app.delete("/", async (req, res) => {
//   const deleteId = req.body.delete_item;
//   await todo_db.deleteOne({ item: deleteId });
//   res.redirect("/");
// });
app.delete("/delete/:id", async (req, res) => {
  const deleteId = req.params.id;
  await todo_db.findByIdAndDelete(deleteId);
  res.redirect("/");
});

app.listen(8000, () => {
  console.log("Sever started sucessfully......");
});
