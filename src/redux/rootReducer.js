import { combineReducers } from "@reduxjs/toolkit";
import todoSlice from "./todoSlice";

const rootReducer = combineReducers({
    todos: todoSlice
})

export default rootReducer