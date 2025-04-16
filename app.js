const express = require("express");
const app = express();
const port = 3000;
const { getMessages, addMessage } = require("./db");

require("dotenv").config();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Index route
app.get("/", async (req, res) => {
  const messages = await getMessages();
  res.render("index", { title: "Mini Messageboard", messages: messages });
});

// New message form route
app.get("/new", (req, res) => {
  res.render("form", { title: "New Message" });
});

// Handle form submission
app.post("/new", async (req, res) => {
  const { messageUser, messageText } = req.body;
  await addMessage(messageUser, messageText);
  res.redirect("/");
});

const getMessageById = async (id) => {
  const res = await pool.query("SELECT * FROM messages WHERE id = $1", [id]);
  return res.rows[0];
};

app.get("/message/:id", async (req, res) => {
  const message = await getMessageById(req.params.id);
  res.render("message", { title: "Message Details", message: message });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});