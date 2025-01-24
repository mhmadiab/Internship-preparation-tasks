import {configureStore} from '@reduxjs/toolkit'
import item from './Item/ItemSlice'

const store = configureStore({
    reducer: {
        item
    } 
})

export default store