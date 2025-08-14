
const express = require("express");
const app = express();
const PORT = 3000;

let users = [
  { id: 1, name: "Alice", country: "India" },
  { id: 2, name: "Bob", country: "USA" },
  { id: 3, name: "Charlie", country: "India" }
];

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// 1. GET / → Return "Server is running"
app.get("/", (req, res) => {
  res.status(200).send("Server is running");
});

// 2. GET /users → Return all users
app.get("/users", (req, res) => {
  res.status(200).json(users);
});

// 3. GET /users/:id → Return a single user by id
app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.status(200).json(user);
});

// 4. POST /users → Add a new user
app.post("/users", (req, res) => {
  const { name, country } = req.body;
  if (!name || !country) {
    return res.status(400).json({ error: "Name and country are required" });
  }
  const newUser = { id: users.length + 1, name, country };
  users.push(newUser);
  res.status(201).json(newUser);
});

// 5. PUT /users/:id → Update a user’s details
app.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const { name, country } = req.body;
  if (name) user.name = name;
  if (country) user.country = country;
  res.status(200).json(user);
});

// 6. DELETE /users/:id → Remove a user
app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }
  users.splice(index, 1);
  res.status(200).json({ message: "User deleted" });
});

// BONUS: Search users by country
app.get("/search", (req, res) => {
  const { country } = req.query;
  if (!country) {
    return res.status(400).json({ error: "Country query is required" });
  }
  const result = users.filter(u => u.country.toLowerCase() === country.toLowerCase());
  res.status(200).json(result);
});

// Global error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
