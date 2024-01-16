const express = require("express");
const authRouter = require("./routes/authRoutes.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();


app.use(cors({credentials:true,origin:"http://localhost:5173"}));
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);

app.listen(3000, () => {
  console.log("Server started on port no 3000");
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
