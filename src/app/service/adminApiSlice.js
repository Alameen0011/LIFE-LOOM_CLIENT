import { apiSlice } from "./apiSlice";

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
      query: () => ({
        url: "/admin/auth/getUsers",
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

    /*CATEGORY API */

    fetchCategories: builder.query({
      query: () => ({
        url: "/admin/getCategories",
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
      invalidatesTags: ["FetchCategories"],
    }),

    softDeleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `/admin/category/${categoryId}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["FetchCategories"],
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
    updateProduct:builder.mutation({
      query:({ productId, body: productDetails }) => ({
        url:`/admin/updateProduct/${productId}`,
        method:"PUT",
        body:productDetails
      }),
      invalidatesTags: ["FetchProduct"],
    }),
    fetchProducts: builder.query({
      query: () => ({
        url: "/admin/products",
        method: "GET",
      }),
      providesTags: ["FetchProduct"],
    }),
    fetchSingleProduct: builder.query({
      query: (productId) => ({
        url: `/admin/products/${productId}/edit`,
        method: "GET",
      }),
      // providesTags: ["FetchProduct"],
    }),
    softDeleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/admin/products/${productId}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["FetchProduct"],
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
} = adminApiSlice;
