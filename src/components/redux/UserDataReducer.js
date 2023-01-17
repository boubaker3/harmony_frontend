import { createSlice } from "@reduxjs/toolkit";
export const UserDataReducer=createSlice({name:"userData",
    initialState:{userData:{}},
    reducers:{
        setUser:(state,action)=>{
            state.userData=action.payload;
        }  
    }
})
export const {setUser } = UserDataReducer.actions;
export default UserDataReducer.reducer;