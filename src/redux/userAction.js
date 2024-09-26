import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const AUTH_API_URL = `${process.env.REACT_APP_API_URL}/auth`;
// Thunks for async actions


// Register user
export const register = createAsyncThunk('auth/register', async(user, {rejectWithValue}) => {
    try 
    {
        const response = await axios.post(`${AUTH_API_URL}/register`, user);
        console.log(response.data);

    } catch (error) 
    {
        return rejectWithValue(error.response.data.message);
    }
})

// Login
export const login = createAsyncThunk("auth/login", async (user, { rejectWithValue }) => {
    try 
    {
        const response = await axios.post(`${AUTH_API_URL}/login`, user);   
        return response.data;

    } catch (error) 
    {      
        return rejectWithValue(error.response.data.message);
    }
});

// Forgot password
export const forgotPassword = createAsyncThunk("auth/forgot-password", async (email , { rejectWithValue }) => {
    try 
    {  
        const response = await axios({
            method: 'post',
            url: `${AUTH_API_URL}/forgot-password`,
            data: {
                email
            }
        });
        console.log(response);
        
        // return response.data;  // Return the updated todo from API

    } catch (error) 
    {
        return rejectWithValue(error.response.data.message);
    }
});

// Reset password
export const resetPassword = createAsyncThunk("auth/reset-password", async (resetValue, { rejectWithValue }) => {
    try 
    {
        const response = await axios.post(`${AUTH_API_URL}/reset-password`, resetValue);
        return response.data; 

    } catch (error) 
    {
        return rejectWithValue(error.response.data.message);
    }
});

