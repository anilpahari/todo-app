const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema({
  item: {
    type: String,
  },
});
///creta a model
const todoModel = new mongoose.model("todo_db", todoSchema);
module.exports = todoModel;
