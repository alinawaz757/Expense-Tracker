import {configureStore,} from "@reduxjs/toolkit"
import API_Slice from "./API_Slice"
import { expenseSlice } from "./reducer"


export const store = configureStore({
    reducer:{
        expense: expenseSlice,
        [API_Slice.reducerPath]:API_Slice.reducer
    },
    middleware:getDefaultMiddleware=>getDefaultMiddleware().concat(API_Slice.middleware)
})