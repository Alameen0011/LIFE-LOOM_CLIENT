import { apiSlice } from "./apiSlice";
import { cartApiSlice } from "./cartApiSlice";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (credentials) => ({
        url: "/admin/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    fetchUsers: builder.query({
      query: ({ page = 1, limit = 5 }) => ({
        url: `/admin/auth/getUsers?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["FetchUsers"],
    }),

    updateUserstatus: builder.mutation({
      query: (userId) => ({
        url: "/admin/updateStatus",
        method: "PATCH",
        body: { userId },
      }),
      invalidatesTags: ["FetchUsers"],
    }),

    /* PRODUCT API */
    addProduct: builder.mutation({
      query: (newProduct) => ({
        url: "/admin/addProduct",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["FetchProduct"],
    }),
    updateProduct: builder.mutation({
      query: ({ productId, body: productDetails }) => ({
        url: `/admin/updateProduct/${productId}`,
        method: "PUT",
        body: productDetails,
      }),

      onQueryStarted: async (
        { productId, body: productDetails },
        { dispatch, queryFulfilled }
      ) => {
        try {
          // Wait for the mutation to be fulfilled
          await queryFulfilled;

          // After the mutation is fulfilled, invalidate the Cart tag
          dispatch(cartApiSlice.util.invalidateTags(["Cart"]));
        } catch (error) {
          console.log(
            error,
            "Error while invalidating cache of cart from update product API"
          );
        }
      },

      // invalidatesTags: ["FetchProduct",'Cart'],
    }),
    fetchProducts: builder.query({
      query: ({ page = 1, limit = 4 }) => ({
        url: `/admin/products?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["FetchProduct"],
    }),
    fetchSingleProduct: builder.query({
      query: (productId) => ({
        url: `/admin/products/${productId}/edit`,
        method: "GET",
      }),
      invalidatesTags: ["FetchProduct"],
    }),
    softDeleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/admin/products/${productId}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["FetchProduct"],
    }),

    /*CATEGORY API */

    fetchCategories: builder.query({
      query: ({ page = 1, limit = 4 }) => ({
        url: `/admin/getCategories?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["FetchCategories"],
    }),
    addCategory: builder.mutation({
      query: (categoryItem) => ({
        url: "/admin/addCategory",
        method: "POST",
        body: categoryItem,
      }),
      invalidatesTags: ["FetchCategories"],
    }),
    updateCategory: builder.mutation({
      query: (category) => ({
        url: "/admin/updateCategory",
        method: "PUT",
        body: category,
      }),
      invalidatesTags: ["FetchCategories"],
    }),
    updateCategoryStatus: builder.mutation({
      query: ({ categoryId }) => ({
        url: "/admin/updateCategoryStatus",
        method: "PATCH",
        body: { categoryId },
      }),
      invalidatesTags: ["FetchCategories", "FetchUserProductDetails"],
    }),

    softDeleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `/admin/category/${categoryId}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["FetchCategories"],
    }),

    //--Order api ---//
    fetchOrder: builder.query({
      query: ({ page = 1, limit = 4 }) => ({
        url: `/admin/order/fetchOrder?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["FetchAdminOrder"],
    }),

    cancelOrder: builder.mutation({
      query: (orderId) => ({
        url: `/admin/order/${orderId}/cancelOrder`,
        method: "PATCH",
      }),
      invalidatesTags: ["FetchAdminOrder"],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `/admin/order/status/${orderId}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["FetchAdminOrder"],
    }),
    fetchSingleOrder: builder.query({
      query: (id) => ({
        url: `admin/order/getSingleOrder/${id}`,
        method: "GET",
        invalidatesTags: ["FetchAdminOrder"],
      }),
    }),
    adminOrderCancel: builder.mutation({
      query: ({ orderId, itemId }) => ({
        url: `/admin/order/${orderId}/item/${itemId}/cancelOrder`,
        method: "PATCH",
      }),
      invalidatesTags: ["FetchAdminOrder"],
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useFetchUsersQuery,
  useUpdateUserstatusMutation,
  useFetchCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryStatusMutation,
  useSoftDeleteCategoryMutation,
  useAddProductMutation,
  useFetchProductsQuery,
  useFetchSingleProductQuery,
  useSoftDeleteProductMutation,
  useUpdateCategoryMutation,
  useUpdateProductMutation,
  useFetchOrderQuery,
  useCancelOrderMutation,
  useUpdateOrderStatusMutation,
  useFetchSingleOrderQuery,
  useAdminOrderCancelMutation,
} = adminApiSlice;
