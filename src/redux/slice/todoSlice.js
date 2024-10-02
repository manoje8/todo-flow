import { createSlice } from "@reduxjs/toolkit";
import { addNewList, addTodo, deleteNewList, deleteTodo, editTodo, fetchTodos, getTodosByListId } from "../action/todoAction";
import { forgotPassword, login, register, resetPassword } from "../action/userAction";


const initialState = {
    notes: [],
    note: "",
    user: null,
    isLoading: false,
    error: null,
    token: null,
    newlist: [],
    newlistValue : []
}

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: { 
        logout: (state) => {
            localStorage.clear()
            state.token = null
        }
    },
    extraReducers: (builder) => {
        builder

            // Fetch Todos
            .addCase(fetchTodos.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.isLoading = false;

                state.notes = action.payload.todos;
                state.newlist = action.payload.category;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Add todo
            .addCase(addTodo.fulfilled, (state, action) => {
                state.notes.push(action.payload)
            })
            .addCase(addTodo.rejected, (state, action) => {
                state.error = action.payload;
            })

            // Edit Todo
            .addCase(editTodo.fulfilled, (state, action) => {
                const { todoId, updateNote } = action.payload;
                state.notes = state.notes.map(note => note._id === todoId ? updateNote : note)
            })
            .addCase(editTodo.rejected, (state, action) => {
                state.error = action.payload;
            })

            // Delete todo
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.notes = state.notes.filter(note => note._id !== action.payload)
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                state.error = action.payload;
            })

            // Get todo by list Id
            .addCase(getTodosByListId.fulfilled, (state, action) => {
                state.newlistValue = action.payload
            })
            .addCase(getTodosByListId.rejected, (state, action) => {
                state.error = action.payload;
            })

// ------------------------------ Authentication -----------------------------

            // Handle register
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            //  Handle Login
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                const {accessToken, name} = action.payload

                localStorage.setItem('token', accessToken)
                localStorage.setItem('name', name)

                state.isLoading = false;
                state.token = accessToken
                state.user = name
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })

            // Handle forgot password
            .addCase(forgotPassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(forgotPassword.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Handle reset password
            .addCase(resetPassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

//------------------------------------- New Lists ------------------------------


            // Add New lists
            .addCase(addNewList.fulfilled, (state, action) => {
                state.newlist.push(action.payload)
            })
            .addCase(addNewList.rejected, (state, action) => {
                state.error = action.payload;
            })

            // Delete todo
            .addCase(deleteNewList.fulfilled, (state, action) => {
                state.newlist = state.newlist.filter(list => list._id !== action.payload)
            })
            .addCase(deleteNewList.rejected, (state, action) => {
                state.error = action.payload;
            })
    }
})

export const {logout, theme, search} = todoSlice.actions

export default todoSlice.reducer;