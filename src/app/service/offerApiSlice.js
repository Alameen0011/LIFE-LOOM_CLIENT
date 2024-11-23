import { method } from "lodash";
import { apiSlice } from "./apiSlice";


export const offerApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        getProductSearch:builder.query({
            query:(searchTerm) => ({
                url:`/admin/offer/getProduct?searchTerm=${searchTerm}`,
                method:"GET"
            })
        }),
        createOffer : builder.mutation({
            query:(offerData) => ({
                url:"/admin/offer/addOffer",
                method:"POST",
                body:offerData
            }),
            invalidatesTags:["Offer"]

        }),
        deleteOffer: builder.mutation({
            query:(deleteBody) => ({
                url:"/admin/offer/deleteOffer",
                method:"DELETE",
                body:deleteBody,
            }),
            invalidatesTags:["Offer"]
        }),
        fetchOffers:builder.query({
            query:() => ({
                url:"/admin/offers/fetchOffers"

            }),
            providesTags:["Offer"]
        }),
        

    })
})


export const {
   useLazyGetProductSearchQuery,
   useCreateOfferMutation,
   useFetchOffersQuery,
   useDeleteOfferMutation,

} = offerApiSlice