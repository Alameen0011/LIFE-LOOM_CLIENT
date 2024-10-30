import { apiSlice } from "./apiSlice";

// const baseQuery = fetchBaseQuery({
//   baseUrl: import.meta.env.VITE_SERVER_URL,
//   credentials: "include",
//   prepareHeaders: (headers, { getState }) => {
//     console.log("Current State:", getState());
//     const token = getState().userAuth.accessToken;
//     console.log(
//       "Included token and basequery taking token and putting it in api",
//       token
//     );
//     console.log(token, "Token");
//     if (token) {
//       headers.set("authorization", `Bearer ${token}`);
//     }
//     return headers;
//   },
// });

// const baseQueryWithReauth = async (args, api, extraOptions) => {
//   console.log("Requesting with Refresh Token...");
//   let result = await baseQuery(args, api, extraOptions);
//   console.log("Initial Result:", result);

//   if (result.error && result.error.status === 401) {
//     console.log("Token expired, attempting to refresh...");
//     // Try to get a new token using the refresh token
//     const refreshResult = await baseQuery(
//       "/user/auth/access",
//       api,
//       extraOptions
//     );

//     if (refreshResult.data) {
//       console.log("Token refreshed successfully:", refreshResult.data);
//       // Store the new token in state
//       api.dispatch(
//         setAccessToken({ accessToken: refreshResult.data.accessToken })
//       );
//       // storing user info in state
//       api.dispatch(setUserCredentials(refreshResult.data));

//       // Retry the original query with the new access token
//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       console.log("Token refresh failed, logging out...");
//       // If refresh fails, log out the user
//       api.dispatch(userlogout());
//     }
//   }

//   return result;
// };

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
    signup: builder.mutation({
      query: (userData) => ({
        url: "/user/auth/signup",
        method: "POST",
        body: userData,
      }),
    }),

    verifySignup: builder.mutation({
      query: (otp) => ({
        url: "/user/auth/verify-signup",
        method: "POST",
        body: otp,
      }),
    }),
    resendOtp: builder.mutation({
      query: (data) => ({
        url: "/user/auth/resend-otp",
        method: "POST",
        body: data,
      }),
    }),
    userLogin: builder.mutation({
      query: (loginCredentials) => ({
        url: "/user/auth/login",
        method: "POST",
        body: loginCredentials,
      }),
    }),
    googleAuth: builder.mutation({
      query: (credentails) => ({
        url: "/user/auth/googleAuth",
        method: "POST",
        body:credentails
      }),
    }),

    getUser: builder.query({
      query: () => "/user/auth/getUser", 
    }),
    getAccess: builder.query({
      query: () => "/user/auth/access",
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: "/user/auth/logout",
        method: "POST",
      }),
    
      }),
    }),
  });


export const {
  useSignupMutation,
  useVerifySignupMutation,
  useUserLoginMutation,
  useResendOtpMutation,
  useLogoutUserMutation,
  useGetUserQuery,
  useGetAccessQuery,
  useGoogleAuthMutation
  

} = authApiSlice
