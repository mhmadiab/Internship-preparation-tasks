import { createAsyncThunk } from "@reduxjs/toolkit"



const getAllItems = createAsyncThunk("item/getAllItems", async(_, ThunkAPI)=>{
    const {rejectWithValue} = ThunkAPI
    const host = process.env.BACKEND_API || "http://localhost:4000"
    try {
        const response = await fetch(`${host}/api/item/allitems`)
  
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

export default getAllItems
