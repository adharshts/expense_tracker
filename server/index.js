const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();

app.use(cors());
app.use(express.json());

// 🔗 DB connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Adharsh@2006",
  database: "expense_tracker"
});

db.connect(err => {
  if (err) {
    console.log("DB Error:", err);
  } else {
    console.log("MySQL Connected ✅");
  }
});

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) return res.status(403).send("No token");

  try {
    const decoded = jwt.verify(token, "secretkey");
    req.user = decoded;
    next();
  } catch {
    res.status(401).send("Invalid token");
  }
};

// test route
app.get("/", (req, res) => {
  res.send("API running 🚀");
});

app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const sql = "INSERT INTO users (email, password) VALUES (?, ?)";

  db.query(sql, [email, hashedPassword], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error registering user");
    }

    res.send("User registered");
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], async (err, result) => {
    if (err) return res.status(500).send(err);

    if (result.length === 0) {
      return res.status(400).send("User not found");
    }

    const user = result[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send("Invalid password");
    }

    // create token
    const token = jwt.sign({ id: user.id }, "secretkey");

    res.json({ token });
  });
});

app.get("/transactions",verifyToken, (req, res) => {
  const sql = "SELECT * FROM transactions ORDER BY date DESC";

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error fetching data");
    }
    res.json(result);
  });
});

app.post("/transactions",verifyToken, (req, res) => {
  const { title, amount, type, category, date } = req.body;

  const sql = `
    INSERT INTO transactions (title, amount, type, category, date)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [title, amount, type, category, date], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error inserting data");
    }

    res.json({
      id: result.insertId,
      title,
      amount,
      type,
      category,
      date
    });
  });
});

app.delete("/transactions/:id",verifyToken, (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM transactions WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error deleting data");
    }

    res.json({ message: "Deleted successfully" });
  });
});



app.listen(5000, () => {
  console.log("Server running on port 5000");
});