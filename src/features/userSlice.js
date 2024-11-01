import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import fetchWithToken from "../../utils/api";
import axios from "axios";

// const url = `https://ecommerce-backend-1z4o.onrender.com/api`;
const url = `http://localhost:3200/api`;



export const loginUser = createAsyncThunk('auth/loginUser', async (userData, { rejectWithValue }) => {
    try {
        const response = await fetch(`${url}/user/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Could not log in');
        }

        // Assuming your server returns the token directly
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const signupUser = createAsyncThunk('auth/signupUser', async (userInfo, { rejectWithValue }) => {
    try {
        const response = await fetch(`${url}/user/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo),
        });
        const data = await response.json();
        console.log(data)

        if (!response.ok) {
            throw new Error(data.message || 'Could not sign up');
        }

        // Assuming your server returns the token directly
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const getCurrentUser = createAsyncThunk("auth/getCurrentUser", async (_, thunkAPI) => {
    try {
        const token = localStorage.getItem("token") ?? "";
        const response = await axios.get(`${url}/user/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data
    } catch (err) {
        if (err.response) {
            // Server responded with a status other than 2xx
            return thunkAPI.rejectWithValue(err.response.data);
        } else if (err.request) {
            // Request was made but no response was received
            return thunkAPI.rejectWithValue({ error: "No response received from the server" });
        } else {
            // Something happened in setting up the request that triggered an Error
            return thunkAPI.rejectWithValue({ error: err.message });
        }
    }
});

export const getAllUsers = createAsyncThunk("auth/getAllUsers", async (_, thunkAPI) => {
    try {
        const token = localStorage.getItem("token") ?? "";
        const response = await axios.get(`${url}/user/getall`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.data.error) {
            return thunkAPI.rejectWithValue(response.data.error);
        }

        return response.data
    } catch (err) {
        if (err.response) {
            // Server responded with a status other than 2xx
            return thunkAPI.rejectWithValue(err.response.data);
        } else if (err.request) {
            // Request was made but no response was received
            return thunkAPI.rejectWithValue({ error: "No response received from the server" });
        } else {
            // Something happened in setting up the request that triggered an Error
            return thunkAPI.rejectWithValue({ error: err.message });
        }
    }
});

export const deleteUsers = createAsyncThunk("auth/deleteUser", async (userId, thunkAPI) => {
    try {
        const token = localStorage.getItem("token") ?? "";
        const response = await axios.delete(`${url}/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return userId;
    } catch (err) {
        if (err.response) {
            // Server responded with a status other than 2xx
            return thunkAPI.rejectWithValue(err.response.data);
        } else if (err.request) {
            // Request was made but no response was received
            return thunkAPI.rejectWithValue({ error: "No response received from the server" });
        } else {
            // Something happened in setting up the request that triggered an Error
            return thunkAPI.rejectWithValue({ error: err.message });
        }
    }
});

const initialState = {
    user: null,
    token: localStorage.getItem('token') || null,
    status: 'idle',
    error: null,
    allUsers: [],
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        },
        // setCredentials: (state, action) => {
        //     state.user = action.payload.user;
        //     state.token = action.payload.token;
        //     localStorage.setItem('token', action.payload.token);
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload.user;
                state.token = action.payload.token;
                localStorage.setItem('token', action.payload.token);
                localStorage.setItem('user', JSON.stringify(action.payload.user));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(signupUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload.user;
                state.token = action.payload.token;
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(getCurrentUser.pending, (state) => {
                state.status = 'loading';
                state.error = null
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
                localStorage.setItem('user', JSON.stringify(action.payload));
            })
            .addCase(getCurrentUser.rejected, (state, action) => {
                state.status = 'failed';
                state.user = null;
                state.error = action.payload;
            })
            .addCase(getAllUsers.pending, (state) => {
                state.status = 'loading';
                state.error = null
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.allUsers = action.payload;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.allUsers = [];
                state.error = action.payload;
            })
            .addCase(deleteUsers.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.allUsers = state.allUsers.filter(user => user.id !== action.payload);
            })
            .addCase(deleteUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
// export const { logout } = authSlice.actions;
export const selectCurrentUser = (state) => state.auth.user;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error?.message || state.auth.error || '';
export const selectAuthToken = (state) => state.auth.token;
export const selectAllUsers = (state) => state.auth.allUsers;

export default authSlice.reducer;