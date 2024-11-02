import { apiSlice } from "./apiSlice";


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
