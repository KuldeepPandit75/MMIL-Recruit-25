import {createSlice} from '@reduxjs/toolkit'

const initialState={
    user: { name: '', rollNo: '',year:'user.1',email:'',domain:'' },
}

export const slice=createSlice({
    name:'MMIL',
    initialState,
    reducers:{
        setUsers(state,action){
            state.user=action.payload
        }
    }
})

export const {reducers} = slice.actions;

export default slice.reducer