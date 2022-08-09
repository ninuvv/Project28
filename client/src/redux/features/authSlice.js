import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
export const login = createAsyncThunk(
  "auth/login",
  async ({ formvalue, navigate, toast }, { rejectWithValue }) => {
    try {
      console.log("formdata" + JSON.stringify(formvalue));
      const response = await api.signIn(formvalue);
      console.log(response);
      toast.success("Login successfully");
      navigate("/canvas");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async ({ formvalue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signUp(formvalue);
      console.log(response);
      toast.success("Register Sccessfully");
      navigate("/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



const authSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    error: "",
    loading: false,
  },
reducers:{
    setUser:(state,action)=>{
        state.user=action.payload
    },

    logOut:(state)=>{
        state.user=null;
        localStorage.clear()
    },
},
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [register.pending]: (state, action) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

  },
});

export const {setUser,logOut } = authSlice.actions;

export default authSlice.reducer;
