import { configureStore } from "@reduxjs/toolkit";
import   countOrdersSlice  from "./reducer";
import UserDataReducer from "./UserDataReducer";
import  SignupAsSlice from "./SignupAs";
import { AuthReducer } from "./Auth";
 export default configureStore({
    reducer:{
        counter:countOrdersSlice,
        userData:UserDataReducer,
        signupAs:SignupAsSlice,
        isAuth:AuthReducer}
});