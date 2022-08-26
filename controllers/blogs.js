const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const blogObject = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  });

  const blog = new Blog(blogObject);

  const saved = await blog.save();
  response.status(201).json(saved);
});

blogsRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;
  await Blog.findByIdAndRemove(id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;
  const id = request.params.id;

  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
    },
    { new: true, runValidators: true, context: "query" }
  );

  response.json(updatedBlog);
});

module.exports = blogsRouter;
