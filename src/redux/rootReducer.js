import { combineReducers } from "@reduxjs/toolkit";
import todoSlice from "./slice/todoSlice";
import actionSlice from "./slice/actionSlice";

const rootReducer = combineReducers({
    todos: todoSlice,
    actions: actionSlice
})

export default rootReducer