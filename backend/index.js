const express = require("express");
const app = express();
var cookieParser = require("cookie-parser");
const port = 5000|| process.env.PORT;
const cors = require("cors");
const path = require("path");
require('dotenv').config()
app.use(express.static("public"));
const mongoose = require("mongoose");
const route = require("./routes/route");






mongoose
  .connect(
    process.env.MONGODB_URL,
  
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use(
  cors({
    origin: "https://x-sysytem.vercel.app"||"http://localhost:3000",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],  // تحديد الرؤوس المسموح بها
    exposedHeaders: ['X-Custom-Header'],
    sameSite:'None',
  })
);

app.use(express.urlencoded({ extended: true }));


app.use(cookieParser());
app.use(express.json());
app.use(route);
