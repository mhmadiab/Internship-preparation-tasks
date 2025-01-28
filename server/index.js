const express = require("express")

require('dotenv').config()
const cors = require("cors")

//Database:
const connectDB = require("./config/configureDB")

//Routes:
const numberRoutes = require("./routes/numberRoutes")
const itemRoutes = require("./routes/itemRoutes")

const app = express()

app.use(express.json())
const allowedOrigins = [
  "http://localhost:3000", 
  "https://internship-preparation-tasks-1.onrender.com",
]


app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
)

connectDB()

const port = process.env.PORT || 4800

app.use("/api/number" , numberRoutes)
app.use("/api/item" , itemRoutes)

app.listen(port , ()=>{
    console.log(`Server is running on port ${port}`)
})