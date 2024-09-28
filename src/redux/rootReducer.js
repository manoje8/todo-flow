import { combineReducers } from "@reduxjs/toolkit";
import todoSlice from "./todoSlice";
import actionSlice from "./actionSlice";

const rootReducer = combineReducers({
    todos: todoSlice,
    actions: actionSlice
})

export default rootReducer