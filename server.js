const express = require("express");
const passport = require("passport");
const cors = require("cors");
const errorHandler = require("./utils/errorHandler");
const connectDatabase = require("./config/database");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use("/auth", require("./routes/auth"));
app.use("/api", require("./routes/api"));
app.use(errorHandler);

connectDatabase();

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
