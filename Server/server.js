const express = require("express");
const app = express();

// Middleware to parse JSON data
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Welcome to my Node.js API with Express!");
});

// Sample API Route - GET
app.get("/api/users", (req, res) => {
  res.json([
    { id: 1, name: "Ayeni" },
    { id: 2, name: "Opeyemi" }
  ]);
});

// Sample API Route - POST
app.post("/api/users", (req, res) => {
  const newUser = req.body;
  res.json({
    message: "User added successfully!",
    user: newUser
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
