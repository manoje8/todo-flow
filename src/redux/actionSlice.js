import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: null,
    searchValue: '',
    smartList: {
        all: null,
        today: null,
        completed: null,
        events: null
    }
}

const actionSlice = createSlice({
    name: "actions",
    initialState,
    reducers: {
        themeHandler: (state, action) => {
            state.theme = action.payload
        },
        searchHandler: (state, action) => {
            state.searchValue = action.payload
        },
        smartListHandler: (state, action) => {
            switch(action.payload)
            {
                case 'all':
                    state.smartList.all = true;
                    state.smartList.today = null;
                    state.smartList.completed = null;
                    state.smartList.events = null
                    break;
                case 'today':
                    state.smartList.all = null;
                    state.smartList.today = true;
                    state.smartList.completed = null;
                    state.smartList.events = null
                    break;
                case 'completed':
                    state.smartList.all = null;
                    state.smartList.today = null;
                    state.smartList.completed = true;
                    state.smartList.events = null
                    break;
                case 'events':
                    state.smartList.all = null;
                    state.smartList.today = null;
                    state.smartList.completed = null;
                    state.smartList.events = true
                    break;
                default: 
                    break
            }
        }
    }
})

export const { themeHandler, searchHandler, smartListHandler} = actionSlice.actions

export default actionSlice.reducer