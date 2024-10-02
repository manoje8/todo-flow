import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/api/todos`;
// Thunks for async actions


// Fetch all todos
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async(token, {rejectWithValue}) => {
    try 
    {
        const response = await axios.get(API_URL, { headers: {Authorization: `Bearer ${token}`}});
        const { todos, category} = response.data

        return {todos, category};  // Assuming the API returns an array of todos and new list

    } catch (error) 
    {
        return rejectWithValue(error.response.data);
    }
})

// Add a new todo
export const addTodo = createAsyncThunk("todos/addTodo", async ( values,{ rejectWithValue }) => {
    const {note, token} = values
    console.log(note);
    
    try 
    {
        const response = await axios.post(API_URL, note, {headers: {Authorization: `Bearer ${token}`}});
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

export const getTodosByListId = createAsyncThunk("todos/:id", async (values, { rejectWithValue }) => {
    const {id, token} = values
    try
    {
        const response = await axios.get(`${API_URL}/${id}`, { headers: {Authorization: `Bearer ${token}`}})
        return response.data
        
    }
    catch (error) 
    {
        return rejectWithValue(error.response.data);
    }
})


// ------------------ ADD LIST ------------------------

// Add new List
export const addNewList = createAsyncThunk("todos/category", async (lists,{ rejectWithValue }) => {
    try 
    {
        const {values, token} = lists
        const response = await axios.post(`${API_URL}/category`, values, {headers: {Authorization: `Bearer ${token}`}});

        return response.data;  // Assuming the API returns the created new list

    } catch (error) 
    {
        return rejectWithValue(error.response.data);
    }
})


// Delete New list
export const deleteNewList = createAsyncThunk("todos/category/:id", async (values,{ rejectWithValue }) => {
    try 
    {
        const {id, token} = values
        const response = await axios.delete(`${API_URL}/category/${id}`, values, {headers: {Authorization: `Bearer ${token}`}});

        return response.data;  // Assuming the API returns the created new list

    } catch (error) 
    {
        return rejectWithValue(error.response.data);
    }
})
