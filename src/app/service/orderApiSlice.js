import { apiSlice } from "./apiSlice";


export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        placeOrder:builder.mutation({
            query: (orderData) => ({
                url:"/user/order/placeOrder",
                method:"POST",
                body:orderData
            }),
            invalidatesTags:["FetchOrders"]
        }),
        getOrder:builder.query({
            query:({page=1,limit=4}) => ({
                url:`/user/order/getOrder?page=${page}&limit=${limit}`,
                method:"GET"
            }),
            providesTags:["FetchOrders"]
        }),
        getSingleOrder:builder.query({
            query:(id) => ({
                url:`/user/order/getSingleOrder/${id}`,
                method:"GET"
            }),
            invalidatesTags:["FetchOrders"]
        }),
        orderCancel:builder.mutation({
            query:({orderId,itemId}) => ({
                url:`/user/order/${orderId}/item/${itemId}/cancelOrder`,
                method:"PATCH",


            }),
            invalidatesTags:["FetchOrders"]
        }),
    })
})


export const {
    usePlaceOrderMutation,
    useGetOrderQuery,
    useGetSingleOrderQuery,
    useOrderCancelMutation,
} = orderApiSlice