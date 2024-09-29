// server.js
import express from "express"; // Import express
import path from "path"; // Import path module

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (if you have any) from the current directory
app.use(express.static(path.join(process.cwd())));

// Example route for the home page
app.get("/", (req, res) => {
  res.send("Welcome to the Home Page!");
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).sendFile(path.join(process.cwd(), "404.html")); // Serve 404.html from the root directory
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
