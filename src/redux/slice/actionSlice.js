import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: null,
    searchValue: '',
    smartList: {
        all: true,
        today: null,
        completed: null,
        events: null
    },
    activeUserList: null
}

const resetSmartList = (state) => {
    state.smartList = {
        all: null,
        today: null,
        completed: null,
        events: null,
    };
};

const actionSlice = createSlice({
    name: "actions",
    initialState,
    reducers: {
        // Handles theme changes
        themeHandler: (state, action) => {
            state.theme = action.payload
        },

        // Updates search value in the state
        searchHandler: (state, action) => {
            state.searchValue = action.payload

            // Reset all values set smart list as all when the search trigger
            resetSmartList(state)
            if (state.smartList.hasOwnProperty('all')) {
                state.smartList['all'] = true;
            }
        },

        // Handles changes to the smartList based on the action type
        smartListHandler: (state, action) => {
            const { payload } = action
            
            // Reset all values before setting the selected smart list item
            resetSmartList(state)

            if (state.smartList.hasOwnProperty(payload)) {
                state.smartList[payload] = true;
            }

        },

        activeUserListHandler: (state, action) => {
            state.activeUserList = action.payload
        }
    }
})

export const { themeHandler, searchHandler, smartListHandler, activeUserListHandler} = actionSlice.actions

export default actionSlice.reducer