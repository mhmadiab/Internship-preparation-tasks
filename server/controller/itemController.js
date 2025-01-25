const { default: axios } = require("axios")
const itemModel = require("../Model/itemModel")


const host = process.env.BACKEND_API || "http://localhost:4000"

const additem = async(req, res, next)=>{
    try {
        const {name, description , phoneNumber} = req.body
        if(phoneNumber){
            const response = await axios.post(`${host}/api/number/validatenumber`, {phoneNumber})

            if (!response.data || response.data.message !== 'valid phone number') {
                return res.json({ message: "Invalid phone number" });
            }

            var {countryCode, countryName, operatorName} = response.data.data
        }

        const item = new itemModel({
            name,
            description,
            countryCode,
            countryName,
            operatorName
        })
        const savedItem = await item.save()

        if(savedItem) return res.json({ message : "item created successfully" , item})
        else return res.json({ message : "failed to create item" , item})

    } catch (error) {
        next(error)
    }
}

const updateitem = async (req, res, next) => {
    try {
        const itemId = req.params.id;
        const { phoneNumber, ...updateData } = req.body; 

        if (phoneNumber) {
            const response = await axios.post(`${host}/api/number/validatenumber`, { phoneNumber });

            if (!response.data || response.data.message !== 'valid phone number') {
                return res.json({ message: "Invalid phone number" })
            }

            const { countryCode, countryName, operatorName } = response.data.data
            updateData.countryCode = countryCode
            updateData.countryName = countryName
            updateData.operatorName = operatorName
        }

        Object.keys(updateData).forEach((key) => {
            if (updateData[key] === undefined || updateData[key] === '') {
                delete updateData[key];
            }
        });


        const updatedItem = await itemModel.findByIdAndUpdate(itemId, updateData, { new: true })

        if (updatedItem) {
            return res.json({ message: "success", item: updatedItem })
        } else {
            return res.status(404).json({ message: "item not found" })
        }

    } catch (error) {
        console.error("Error updating item:", error);
        next(error);
    }
};

const deleteitem = async(req, res, next)=>{
   try {
    
    const itemId = req.params.id;

    const item = await itemModel.findByIdAndDelete(itemId);

    if (item) {
        return res.json({
            message: "Item deleted successfully",
            item,
        });
    } else {
         return res.status(404).json({
            message: "Item not found",
            item,
        });
    }
   } catch (error) {
    next(error)
   }
}

const allitems = async(req, res, next)=>{
    try {
        const items = await itemModel.find().select("-__v")
        if(items.length > 0) return res.status(200).json({ message : "items found" , items})
            else return res.status(400).json({ message : "no items found" , items})
    } catch (error) {
        next(error)
    }
}

module.exports = {
    additem,
    updateitem,
    deleteitem,
    allitems
}