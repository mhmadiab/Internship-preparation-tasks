import { createAsyncThunk } from "@reduxjs/toolkit"

const deleteItem = createAsyncThunk("item/deleteitem", async(itemId, ThunkAPI)=>{
    const {rejectWithValue} = ThunkAPI
    try {
        const response = await fetch(`http://localhost:4000/api/item/deleteitem/${itemId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json", 
          } 
        })
  
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message)
        }
  
        const data = await response.json()
        return data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export default deleteItem
