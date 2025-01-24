const mongoose = require("mongoose")

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description :{
        type: String,
        required: true
    },
    countryCode : String,
    countryName : String,
    operatorName : String
})

const itemModel = mongoose.model("Item" , itemSchema)

module.exports = itemModel