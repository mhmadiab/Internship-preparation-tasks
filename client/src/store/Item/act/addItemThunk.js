import { createAsyncThunk } from "@reduxjs/toolkit"

const addItem = createAsyncThunk("item/addItem", async(itemData, ThunkAPI)=>{
    const {rejectWithValue} = ThunkAPI
    try {
        const response = await fetch("http://localhost:4000/api/item/additem", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", 
          },
          body: JSON.stringify( itemData ), 
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

export default addItem
