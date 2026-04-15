import { createSlice } from "@reduxjs/toolkit";

export const counterSlice=createSlice({
    name:'counter',
    initialState:{
        value:5
    },
    reducers:{
        increment:(state)=>{
            state.value+=1
        },
        decrement:(state)=>{
            if(state.value===0)
            {
                return
            }
            state.value-=1
        },
        incrementBy5:(state)=>{
            state.value+=5
        }
    }

})

export const {increment,decrement,incrementBy5}=counterSlice.actions;
export default counterSlice.reducer;