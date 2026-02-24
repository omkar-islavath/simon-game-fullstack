const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auth.routes");
const scoreRoutes = require("./routes/score.routes");

const app = express();

app.use(cors());
app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/scores", scoreRoutes);

// Frontend
app.use(express.static(path.join(__dirname, "../../public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/login.html"));
});

app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

module.exports = app;
