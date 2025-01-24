const express = require("express")

const itemRoutes = express.Router()

const {
    additem,
    updateitem,
    deleteitem,
    allitems
} = require("../controller/itemController")

itemRoutes.post("/additem", additem )
          .patch("/updateitem/:id", updateitem)
          .delete("/deleteitem/:id" , deleteitem)
          .get("/allitems" , allitems)

module.exports = itemRoutes