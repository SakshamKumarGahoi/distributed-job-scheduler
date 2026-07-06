const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Distributed Job Scheduler",
  });
});

app.use("/api", require("./routes"));

app.use(require("./middleware/errorHandler"));

module.exports = app;