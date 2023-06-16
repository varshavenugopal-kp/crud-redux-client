import { createSlice } from "@reduxjs/toolkit";

const initial={
    userid:'',
    username:'',
    image:''
}

const userSlice=createSlice({
    name:'user',
    initialState:initial,
    reducers:{
        setProfile: (state, action) => {
            state.userid=action.payload.userid
            state.image = action.payload.image
            state.username=action.payload.username
          },
    }
})

export const {setProfile}=userSlice.actions
export default userSlice.reducer