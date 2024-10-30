import { apiSlice } from "./apiSlice"

console.log("insider product api slice")

const productApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        getProducts:builder.query({
            query:() => ({
                url:"/user/getProducts",
                method:"GET",
                
            })

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