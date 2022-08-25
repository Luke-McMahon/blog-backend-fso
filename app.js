const mongoose = require("mongoose");
require("dotenv").config();

const logger = require("./utils/logger");

const blogsRouter = require("./controllers/blogs");

const express = require("express");
const app = express();
const cors = require("cors");

logger.info("Connecting to:", process.env.MONGODB_URI);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((e) => {
    logger.error("Error connecting:", e.message);
  });

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogsRouter);

module.exports = app;
