const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
}, 100000);

test("there are four blogs", async () => {
  const blogs = await helper.blogsInDB();

  expect(blogs).toHaveLength(4);
});

test("the first blog title is React patterns", async () => {
  const blogs = await helper.blogsInDB();
  expect(blogs[0].title).toBe("React patterns");
});

test("all blogs are returned", async () => {
  const blogs = await helper.blogsInDB();

  expect(blogs).toHaveLength(helper.initialBlogs.length);
});

test("id of blog exists", async () => {
  const blogs = await helper.blogsInDB();
  expect(blogs[0].id).toBeDefined();
});

test("a valid blog can be added", async () => {
  const blog = {
    title: "Test blog added",
    author: "Test blog",
    url: "https://google.com",
    likes: 25,
  };

  await api
    .post("/api/blogs")
    .send(blog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDB();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const title = blogsAtEnd.map((r) => r.title);
  expect(title).toContain("Test blog added");
});

test("likes default to zero when missing", async () => {
  const blog = {
    title: "Test blog added",
    author: "Test blog",
    url: "https://google.com",
  };

  await api
    .post("/api/blogs")
    .send(blog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDB();
  const lastBlog = blogsAtEnd[blogsAtEnd.length - 1];

  expect(lastBlog.likes).toBeDefined();
});

test("an invalid blog cannot be added", async () => {
  const blog = {
    author: "Test blog",
    url: "https://google.com",
  };

  await api.post("/api/blogs").send(blog).expect(400);
});

afterAll(() => {
  mongoose.connection.close();
});
