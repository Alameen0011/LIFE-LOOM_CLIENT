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

    adminLogout: builder.mutation({
      query: () => ({
        url: "/admin/auth/logout",
        method: "POST",
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
    updateOrderIndividualItemStatus: builder.mutation({
      query: ({ orderId, itemId, status }) => ({
        url: `/admin/order/${orderId}/item/${itemId}/itemOrderStatusChange`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["FetchAdminOrder"],
    }),
    handleReturnRequest: builder.mutation({
      query: ({ orderId, itemId, isApproved }) => ({
        url: `admin/order/${orderId}/returnResponse`,
        method: "POST",
        body: { itemId, isApproved },
      }),
      invalidatesTags: ["FetchAdminOrder"],
    }),

    //coupon slice

    createCoupon: builder.mutation({
      query: (couponData) => ({
        url: "/admin/coupon/createCoupon",
        method: "POST",
        body: couponData,
      }),
      invalidatesTags: ["Coupon"],
    }),

    deleteCoupon: builder.mutation({
      query: ({ id }) => ({
        url: `/admin/coupon/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Coupon"],
    }),

    GetCoupon: builder.query({
      query: () => ({
        url: "/admin/coupon/getCoupons",
      }),
      providesTags: ["Coupon"],
    }),

    //sales report
    getSalesReport: builder.query({
      query: (queryParams) => ({
        url: `/admin/sales?${queryParams}`,
        method: "GET",
      }),
    }),

    getSalesData: builder.query({
      query: ({ year, month }) => {
        const params = new URLSearchParams();
        if (year) params.append("year", year);
        if (month) params.append("month", month);
        return `/admin/salesData?${params.toString()}`; // e.g., /sales?year=2024&month=1
      },
    }),

    getSalesPdf: builder.query({
      query: ({ period, startDate, endDate }) => ({
        url: "/admin/salesPdf",
        method: "GET",
        params: { period, startDate, endDate },
        responseHandler: (response) => response.blob()
      }), 
    }),

    getSalesXl: builder.query({
      query: ({period,startDate,endDate}) => ({
        url: "/admin/salesXl",
        method: "GET",
        params:{period,startDate,endDate},
        responseHandler: (response) => response.blob()
      }),

    }),

    getBestSelling: builder.query({
      query: () => ({
        url: "/admin/bestSelling",
        method: "GET",
      }),
    }),

    getDashboardData: builder.query({
      query: () => ({
        url: "/admin/metricsDashboard",
        method: "GET",
      }),
    }),

 


   




  }),
});

export const {
  useAdminLoginMutation,
  useAdminLogoutMutation,
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
  useCreateCouponMutation,
  useGetCouponQuery,
  useDeleteCouponMutation,
  useUpdateOrderIndividualItemStatusMutation,
  useHandleReturnRequestMutation,
  useGetSalesReportQuery,
  useGetSalesDataQuery,
  useGetBestSellingQuery,
  useGetDashboardDataQuery,
  useLazyGetSalesPdfQuery,
  useLazyGetSalesXlQuery,
  
} = adminApiSlice;
