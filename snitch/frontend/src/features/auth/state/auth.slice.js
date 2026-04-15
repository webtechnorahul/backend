import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error:null,
    loading:false
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setError:(state,action)=>{
      state.error=action.payload;
    },
    setLoading:(state,action)=>{
      state.loading=action.payload;
    },
    logout: (state) => {
      state.user = null;
    }
  },
});

export const { setUser,setError,setLoading, logout } = authSlice.actions;
export default authSlice.reducer;