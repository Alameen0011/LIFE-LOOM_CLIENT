import { apiSlice } from "./apiSlice"

console.log("insider product api slice")

const productApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        getProducts:builder.query({
            query:(queryParams) => ({
                url:`/user/getProducts?${queryParams}`,
                method:"GET",
                
            }),
            providesTags:["FetchUserProductDetails"]

        }),
        getSingleProduct:builder.query({
            query:(id) => ({
                url:`/user/getProduct/${id}`,
                method:"GET",
            })
            
        }),
        
    
    })
})


export const {useGetProductsQuery,useGetSingleProductQuery} = productApiSlice