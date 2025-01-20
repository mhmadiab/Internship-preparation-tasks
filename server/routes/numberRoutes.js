const express = require("express")

const {validateNumber} = require("../controller/validateNumber")

const numberRoutes = express.Router()

numberRoutes.post("/validatenumber" , validateNumber)

module.exports = numberRoutes