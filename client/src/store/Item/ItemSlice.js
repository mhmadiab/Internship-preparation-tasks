import { createSlice } from "@reduxjs/toolkit"
import {getAllItems, updateItem, addItem , deleteItem} from './act/index'

const initialState = {
    status : {
        getAllItems: { getsuccess: false, geterror: false, getmessage: '' , getloading : false , getdata : [] },
        addItem: { addsuccess: false, adderror: false, addmessage: '' , addloading : false , adddata : [] },
        updateItem : { updatesuccess: false, updateerror: false, updatemessage: '' , updateloading : false , updatedata : [] },
        deleteItem : { delsuccess: false, delerror: false, delmessage: '' , delloading : false , deldata : [] },
    }
}

const itemSlice = createSlice({
    name: 'item',
    initialState,
    reducers : {

    },
    extraReducers : (builder)=>{

        //get all items: 
        builder.addCase(getAllItems.pending , (state)=>{
            state.status.getAllItems.getloading = true
            state.status.getAllItems.geterror = false
            state.status.getAllItems.getsuccess = false
        })
        builder.addCase(getAllItems.fulfilled , (state , action)=>{
            state.status.getAllItems.getdata = action.payload.items
            state.status.getAllItems.getloading = false
            state.status.getAllItems.geterror = false
            state.status.getAllItems.getsuccess = true
            state.status.getAllItems.getmessage = action.payload.message
        })
        builder.addCase(getAllItems.rejected , (state, action)=>{
            state.status.getAllItems.getloading = false
            state.status.getAllItems.geterror = true
            state.status.getAllItems.getsuccess = false
            state.status.getAllItems.getmessage = action.payload.message
        })

        //add item
        builder.addCase(addItem.pending , (state)=>{
            state.status.addItem.addloading = true
            state.status.addItem.adderror = false
            state.status.addItem.addsuccess = false
        })
        builder.addCase(addItem.fulfilled , (state , action)=>{
            state.status.addItem.addloading = false
            state.status.addItem.adderror = false
            state.status.addItem.addsuccess = true
            state.status.addItem.addmessage = action.payload.message
        })
        builder.addCase(addItem.rejected , (state, action)=>{
            state.status.addItem.addloading = false
            state.status.addItem.adderror = true
            state.status.addItem.addsuccess = false
            state.status.addItem.addmessage = action.payload.message
        })

        //delete item: 
        builder.addCase(deleteItem.pending, (state)=>{
            state.status.deleteItem.delloading = true
            state.status.deleteItem.delsuccess = false
            state.status.deleteItem.delerror = false
        })
        builder.addCase(deleteItem.fulfilled , (state, action)=>{
            state.status.deleteItem.delloading = false
            state.status.deleteItem.delsuccess = true
            state.status.deleteItem.delerror = false
            state.status.deleteItem.delmessage = action.payload.message
        })
        builder.addCase(deleteItem.rejected , (state, action)=>{
            state.status.deleteItem.delloading = false
            state.status.deleteItem.delsuccess = false
            state.status.deleteItem.delerror = true
            state.status.deleteItem.delmessage = action.payload.message
        })

        //update item : 
        builder.addCase(updateItem.pending, (state)=>{
            state.status.updateItem.updateloading = true
            state.status.updateItem.updatesuccess = false
            state.status.updateItem.updateerror = false
        })
        builder.addCase(updateItem.fulfilled , (state, action)=>{
            state.status.updateItem.updateloading = false
            state.status.updateItem.updatesuccess = true
            state.status.updateItem.updateerror = false
            state.status.updateItem.updatemessage = action.payload.message
            state.status.updateItem.updatedata = action.payload.item
        })
        builder.addCase(updateItem.rejected, (state, action) => {
            state.status.updateItem.updateloading = false
            state.status.updateItem.updatesuccess = false
            state.status.updateItem.updateerror = true
            state.status.updateItem.updatemessage = action.payload.message
        })
    }
})

export {getAllItems , updateItem, addItem, deleteItem}
export default itemSlice.reducer