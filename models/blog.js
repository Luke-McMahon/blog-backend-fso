const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 10,
    maxLength: 40,
    required: true,
  },
  author: {
    type: String,
    minLength: 7,
    maxLength: 20,
    required: true,
  },
  url: {
    type: String,
    minLength: 10,
    maxLength: 150,
    required: true,
  },
  likes: {
    type: Number,
  },
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
