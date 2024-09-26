import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/api/todos`;
// Thunks for async actions


// Fetch all todos
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async(_, {rejectWithValue}) => {
    try 
    {
        const response = await axios.get(API_URL);
        return response.data;  // Assuming the API returns an array of todos

    } catch (error) 
    {
        return rejectWithValue(error.response.data);
    }
})

// Add a new todo
export const addTodo = createAsyncThunk("todos/addTodo", async (newTodo, { rejectWithValue }) => {
    try 
    {
        const response = await axios.post(API_URL, newTodo);
        return response.data;  // Assuming the API returns the created todo

    } catch (error) 
    {
        return rejectWithValue(error.response.data);
    }
});

// Edit a todo
export const editTodo = createAsyncThunk("todos/editTodo", async ({ todoId, updateNote }, { rejectWithValue }) => {
    try 
    {
        const response = await axios({
            method: 'put',
            url: `${API_URL}/${todoId}`,
            data: {
                updateNote
            }
        });
        return { todoId, updateNote: response.data };  // Return the updated todo from API

    } catch (error) 
    {
        return rejectWithValue(error.response.data);
    }
});

// Delete a todo
export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (todoId, { rejectWithValue }) => {
    try 
    {
        await axios.delete(`${API_URL}/${todoId}`);
        return todoId;  // Return the id of the deleted todo

    } catch (error) 
    {
        return rejectWithValue(error.response.data);
    }
});
