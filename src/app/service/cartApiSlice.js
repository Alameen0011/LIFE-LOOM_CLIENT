import { apiSlice } from "./apiSlice";

console.log("inside cart api slice");

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: (cartData) => ({
        url: "/user/addToCart",
        method: "POST",
        body: cartData,
      }),
      invalidatesTags: ["Cart"],
    }),
    getCart: builder.query({
      query: () => ({
        url: "/user/getCartItem",
        method: "GET",
      }),
      providesTags: ["Cart"],
    }),
    updateCartItem: builder.mutation({
      query: (updatedCartData) => ({
        url: "/user/updateCart",
        method: "PUT",
        body: updatedCartData,
      }),
      invalidatesTags: ["Cart"],
    }),
    clearCart: builder.mutation({
      query: ({productId}) => ({
        url: "/user/clearCart",
        method: "DELETE",
        body:{productId}
      }),
      invalidatesTags: ["Cart"],
    }),
    updateCartQuantity:builder.mutation({
      query:(updateQuantityData) => ({
        url:"/user/cart/updateQuantity",
        method:"PUT",
        body:updateQuantityData
      }),
      invalidatesTags: ["Cart"],
    })
  }),
});

export const {
  useGetCartQuery,
  useUpdateCartItemMutation,
  useClearCartMutation,
  useAddToCartMutation,
  useUpdateCartQuantityMutation
} = cartApiSlice;
