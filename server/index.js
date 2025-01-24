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

connectDB()

const port = process.env.PORT || 4800

app.use("/api/number" , numberRoutes)
app.use("/api/item" , itemRoutes)

app.listen(port , ()=>{
    console.log(`Server is running on port ${port}`)
})