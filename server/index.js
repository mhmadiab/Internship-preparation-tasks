const express = require("express")
const numberRoutes = require("./routes/numberRoutes")
require('dotenv').config()
const cors = require("cors")



const app = express()

app.use(express.json());
app.use(cors())


const port = process.env.PORT || 4800

app.use("/api/number" , numberRoutes)

app.listen(port , ()=>{
    console.log(`Server is running on port ${port}`)
})