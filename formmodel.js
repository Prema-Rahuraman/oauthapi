const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  title: { type: String, required: true,unique: true  },
  description: { type: String, required: true },
  content: { type: String, required: true },
  author : { type: String, required: true },
   
});

const formModel = mongoose.model("User", formSchema);

module.exports = formModel;