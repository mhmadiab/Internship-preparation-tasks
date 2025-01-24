import { createAsyncThunk } from "@reduxjs/toolkit"


const validateNumber = createAsyncThunk("validateNumber/validateNumberSlice", async(phoneNumber, ThunkAPI)=>{
    const {rejectWithValue} = ThunkAPI
    try {
        const response = await fetch("http://localhost:4000/api/number/validatenumber", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", 
          },
          body: JSON.stringify({ phoneNumber }), 
        })
  
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || "Failed to validate phone number")
        }
  
        const data = await response.json()
        return data
    } catch (error) {
        return rejectWithValue(error)
    }
})

export default validateNumber