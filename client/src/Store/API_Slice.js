import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const baseUrl="http://localhost:8080"
export const API_Slice = createApi({
    baseQuery:fetchBaseQuery({baseUrl:baseUrl}),
    endpoints:builder=>({
        //get categories
        getCategories:builder.query({
            query:()=>"/api/categories",
            providesTags:["categories"]
        }),
        
        //get labels
        getLabels:builder.query({
            query:()=>"/api/labels",
            providesTags:["transactions"]
        }),
        
        //add transaction
        addTransaction:builder.mutation({
            query:(data)=>({
                url:"/api/transactions",
                method:"POST",
                body:data
            }),
            invalidatesTags:["transactions"]
        }),

        //delete transaction
        deleteTransaction:builder.mutation({
            query:(id)=>({
                url:"/api/transactions",
                method:"DELETE",
                body:id
            }),
            invalidatesTags:["transactions"]
        })
    })
}) 
export default API_Slice;