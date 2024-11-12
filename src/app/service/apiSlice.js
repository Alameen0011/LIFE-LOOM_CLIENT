import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setUserCredentials, userlogout } from "../slices/authSlice"


const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState },) => {
        const token = getState().auth.user.accessToken
        if (token) headers.set('authorization', `Bearer ${token}`)
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let response = await baseQuery(args, api, extraOptions)
    if (response?.error?.status === 403) {
        console.log("no access token so going to make refresh tokn")
        const refreshResponse = await baseQuery('/user/auth/access', api, extraOptions)
        console.log("accessToken expired , get token response",refreshResponse)
        if (refreshResponse?.data) {
            api.dispatch(setUserCredentials({ ...refreshResponse?.data }))
        } else {
            api.dispatch(userlogout())
        }
        response = await baseQuery(args, api, extraOptions)
    } else if (response?.error?.status === 401) {
        api.dispatch(userlogout())
    }
    return response

}



export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes:['Cart','FetchCategories','FetchProduct','FetchUsers','FetchUserProductDetails'],
    endpoints: () => ({})
})
