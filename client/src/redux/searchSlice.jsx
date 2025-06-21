import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: null,
    reducers:{
        setSearchData:(state, action)=>{
            return action.payload
        }
    }
})

export const { setSearchData } = searchSlice.actions;
export default searchSlice.reducer;