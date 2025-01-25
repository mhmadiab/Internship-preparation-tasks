const express = require("express")

require('dotenv').config()
const cors = require("cors")

//Database:
const connectDB = require("./config/configureDB")

//Routes:
const numberRoutes = require("./routes/numberRoutes")
const itemRoutes = require("./routes/itemRoutes")

const app = express()

app.use(express.json());
// app.use(cors())
const allowedOrigins = [
  "http://localhost:3000", // Local frontend
  "https://internship-preparation-tasks-1.onrender.com", // Deployed frontend
];

// CORS middleware with dynamic origin
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., mobile apps, Postman) or in the list
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

connectDB()

const port = process.env.PORT || 4800

app.use("/api/number" , numberRoutes)
app.use("/api/item" , itemRoutes)

app.listen(port , ()=>{
    console.log(`Server is running on port ${port}`)
})