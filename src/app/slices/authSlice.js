import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) :
    {
        user: {
            name: null,
            accessToken: null,
            role: null,
            isAuthenticated:false,
            id:null
        }
    }

    console.log(initialState,"initial state")


const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUserCredentials: (state, action) => {
            console.log("ACTIOIN PAYLOAD SETTING TO STATE",action.payload)
            const {username,accessToken,role,_id} = action.payload

            console.log(username,"uername")
            console.log(accessToken,"accessToken")
            console.log(role,"role")
            console.log(_id,"_id...")
            
            state.user.isAuthenticated = true;
            state.user.name = username
            state.user.accessToken = accessToken
            state.user.role = role,
            state.user.id = _id
         
            
            localStorage.setItem('auth',JSON.stringify({...initialState,user:{accessToken:action.payload.accessToken,role:action.payload.role,name:action.payload.username, isAuthenticated: true,id:action.payload._id}}))
        },
        userlogout: (state) => {
            state.user.accessToken = null
            state.user.role = null
            state.user.name = null
            state.user.isAuthenticated = false
            state.user.id = null
            localStorage.setItem('auth', JSON.stringify({ ...initialState, user: { accessToken: null, role: null,name:null ,isAuthenticated:null,id:null} }))
        }
    }
})

export const { setUserCredentials, userlogout } = authSlice.actions
export default authSlice.reducer


export const selectUserState = state => state.auth.user.isAuthenticated
export const selectUserRole = state => state.auth.user.role
export const selectUserName = state => state.auth.user.name
export const selectUserId = state => state.auth.user.id
