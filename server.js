
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const Blog = require("./models/Blog");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Serve static files from public/
app.use(express.static(path.join(__dirname, "public")));

// Common JSON error handler
function serverError(res, error, message) {
  console.error(message, error.message);

  return res.status(500).json({
    success: false,
    message,
  });
}

// Browser Home Page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API status for the dashboard
app.get("/api/status", (req, res) => {
  const dbStates = {
    0: "Disconnected",
    1: "Connected",
    2: "Connecting",
    3: "Disconnecting",
  };

  res.status(200).json({
    success: true,
    message: "Blog API is running!",
    server: "Online",
    database: dbStates[mongoose.connection.readyState] || "Unknown",
    timestamp: new Date().toISOString(),
  });
});

// POST /blogs - Create a blog
app.post("/blogs", async (req, res) => {
  try {
    const { title, description, author } = req.body;

    if (
      typeof title !== "string" || !title.trim() ||
      typeof description !== "string" || !description.trim() ||
      typeof author !== "string" || !author.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Title, description and author are required.",
      });
    }

    const blog = await Blog.create({
      title: title.trim(),
      description: description.trim(),
      author: author.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Blog created successfully!",
      data: blog,
    });
  } catch (error) {
    return serverError(res, error, "Failed to create blog.");
  }
});

// GET /blogs - Get all blogs
app.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Blogs fetched successfully!",
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    return serverError(res, error, "Failed to fetch blogs.");
  }
});

// GET /blogs/:id - Get one blog
app.get("/blogs/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID.",
      });
    }

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blog fetched successfully!",
      data: blog,
    });
  } catch (error) {
    return serverError(res, error, "Failed to fetch blog.");
  }
});

// DELETE /blogs/:id - Delete one blog
app.delete("/blogs/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid blog ID.",
      });
    }

    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully!",
      data: blog,
    });
  } catch (error) {
    return serverError(res, error, "Failed to delete blog.");
  }
});

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found.",
    path: req.originalUrl,
  });
});

// Handle malformed JSON
app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON in request body.",
    });
  }

  return next(error);
});

// Connect database before starting server
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully!");

    app.listen(PORT, () => {
      console.log(`Blog API running at http://localhost:${PORT}`);
      console.log(`Dashboard: http://localhost:${PORT}`);
      console.log(`API Status: http://localhost:${PORT}/api/status`);
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
}

startServer();
