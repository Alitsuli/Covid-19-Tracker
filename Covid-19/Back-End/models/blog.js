const mongoose = require("mongoose");


const blogSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
    default: 0,
    minlength: 1,
  }
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
