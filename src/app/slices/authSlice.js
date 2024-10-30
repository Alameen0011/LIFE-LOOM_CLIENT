import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) :
    {
        user: {
            name: null,
            accessToken: null,
            role: null,
            isAuthenticated:null
        }
    }

    console.log(initialState,"initial state")


const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUserCredentials: (state, action) => {
            console.log("ACTIOIN PAYLOAD SETTING TO STATE",action.payload)
            const {username,accessToken,role} = action.payload

            console.log(username)
            console.log(accessToken)
            console.log(role)
            
            state.user.isAuthenticated = true;
            state.user.name = username
            state.user.accessToken = accessToken
            state.user.role = role
         
            
            localStorage.setItem('auth',JSON.stringify({...initialState,user:{accessToken:action.payload.accessToken,role:action.payload.role,name:action.payload.username, isAuthenticated: true,}}))
        },
        userlogout: (state) => {
            state.user.accessToken = null
            state.user.role = null
            state.user.name = null
            state.user.isAuthenticated = null
            localStorage.setItem('auth', JSON.stringify({ ...initialState, user: { accessToken: null, role: null,name:null ,isAuthenticated:null} }))
        }
    }
})

export const { setUserCredentials, userlogout } = authSlice.actions
export default authSlice.reducer


export const selectUserState = state => state.auth.user.isAuthenticated
export const selectUserRole = state => state.auth.user.role
export const selectUserName = state => state.auth.user.name
