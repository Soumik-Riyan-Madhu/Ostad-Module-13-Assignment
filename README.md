# 📝 Blog CRUD Backend API

A simple RESTful Blog CRUD Backend built with **Node.js, Express.js, MongoDB, and Mongoose**.

This project demonstrates how to create, retrieve, and delete blog posts through REST API endpoints. All APIs can be tested using Postman.

## 🚀 Features

- Create a new blog post
- Retrieve all blog posts
- Retrieve a single blog by ID
- Delete a blog by ID
- MongoDB database integration
- Mongoose schema validation
- Environment variable configuration
- Error handling for invalid and missing blog IDs

## 🛠️ Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- dotenv
- Postman

## 📁 Project Structure

```text
Blog-CRUD-Backend/
├── models/
│   └── Blog.js
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/Blog-CRUD-Backend.git
cd Blog-CRUD-Backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Replace the placeholder with your MongoDB connection string.

**Important:** Never share or commit your `.env` file.

### 4. Run the server

Development mode:

```bash
npm run dev
```

Production-style start:

```bash
npm start
```

The API will run at `http://localhost:5000`.

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/blogs` | Create a new blog |
| GET | `/blogs` | Retrieve all blogs |
| GET | `/blogs/:id` | Retrieve a blog by ID |
| DELETE | `/blogs/:id` | Delete a blog by ID |

## 📦 Blog Data Format

```json
{
  "title": "Getting Started with Node.js",
  "description": "An introduction to Node.js.",
  "author": "Soumik"
}
```

## 🧪 Testing with Postman

1. Start the backend server.
2. Open Postman and create an HTTP request.
3. Use the appropriate HTTP method and endpoint.
4. For `POST /blogs`, select **Body → raw → JSON** and provide the blog data.
5. Copy the `_id` returned by the POST request to test GET and DELETE by ID.
6. Check the response status and JSON output.

## 📋 Expected Responses

- `201 Created`: Blog created successfully.
- `200 OK`: Blog retrieved or deleted successfully.
- `400 Bad Request`: Invalid blog ID or required fields missing.
- `404 Not Found`: Blog does not exist.
- `500 Internal Server Error`: An unexpected server or database operation error occurred.

## 🎯 Assignment Scope

This is a **backend-only project**. No frontend interface is included.

## 👨‍💻 Author

**Soumik Riyan Madhu**

GitHub: [Soumik-Riyan-Madhu](https://github.com/Soumik-Riyan-Madhu)

---

Made with Node.js, Express.js, MongoDB, and Mongoose.
