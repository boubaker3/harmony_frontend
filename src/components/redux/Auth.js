import { createSlice } from "@reduxjs/toolkit";
export const AuthReducer=createSlice({name:"isAuth",
    initialState:{isAuth:false},
    reducers:{
        setIsAuth:(state,action)=>{
            state.isAuth=action.payload;
        }  
    }
})
export const {setIsAuth } = AuthReducer.actions;
export default AuthReducer.reducer;