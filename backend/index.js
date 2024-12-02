const express = require("express");
const app = express();
var cookieParser = require("cookie-parser");
const port = 5000 || process.env.PORT;
const cors = require("cors");
const path = require("path");
require("dotenv").config();
app.use(express.static("public"));
const mongoose = require("mongoose");
const route = require("./routes/route");

// app.use(express.static(path.join(__dirname, '../frontend/build')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
// });

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`https://x-sysytem.vercel.app`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.NODE_ENV === "development", // "https://x-sysytem.vercel.app",
    //methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    //allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],  // تحديد الرؤوس المسموح بها
    //exposedHeaders: ['X-Custom-Header'],
    //sameSite:'None',
  })
);

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(route);
app.use(express.static(path.join(__dirname, "build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "build/index.html"));
});
