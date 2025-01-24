import { createSlice } from "@reduxjs/toolkit"
import validateNumber from "./validateNumberThunk"

const initialState = {
    data : {},
    message : "",
    loading : false,
    error : false,
    success : false

}

const validateNumberSlice = createSlice({
    name : "validateNumber",
    initialState, 
    reducers : {},
    extraReducers : (builder)=>{
        builder.addCase(validateNumber.pending, (state)=>{
            state.error = false
            state.loading = true
            state.success = false
        })
        builder.addCase(validateNumber.fulfilled , (state, action)=>{
            state.data = action.payload.data
            state.success = true
            state.message = action.payload.message
            state.loading = false
            state.error=false
        })
        builder.addCase(validateNumber.rejected, (state, action)=>{
            state.error = true
            state.loading = false
            state.success=false
            state.message = action.payload.message
        })
    }
})


export {validateNumber}
export default validateNumberSlice.reducer
