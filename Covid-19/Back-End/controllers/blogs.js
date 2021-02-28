const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

require("dotenv").config();

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  return response.json(blogs);
});


blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  //console.log(user._id);
  const blog = new Blog({
    text: body.text,
    likes: body.likes,
  });

  const savedBlog = await blog.save();
  return response.json(savedBlog);
});


module.exports = blogsRouter;
