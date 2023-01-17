import { createSlice } from '@reduxjs/toolkit'
export const countOrdersSlice=createSlice({name:"counter",initialState:{count:0},
                                            reducers:{
                                                incrementOrders:(state)=>{
                                                    state.count+=1;
                                                },
                                                decrementOrders:(state)=>{
                                                    if(state.count!=0){
                                                        state.count-=1;
                                                    }
                                                }
                                            } 
                                           });
export const{incrementOrders,decrementOrders} =countOrdersSlice.actions;
export default countOrdersSlice.reducer;