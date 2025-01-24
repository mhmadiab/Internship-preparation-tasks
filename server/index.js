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
app.use(cors())
app.use(cors({
    origin: process.env.CLIENT_URL || '*', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true, // If using cookies or authentication
  }));
  

connectDB()

const port = process.env.PORT || 4800

app.use("/api/number" , numberRoutes)
app.use("/api/item" , itemRoutes)

app.listen(port , ()=>{
    console.log(`Server is running on port ${port}`)
})