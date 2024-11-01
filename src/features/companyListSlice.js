import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

let url = `http://localhost:3200/api`;

const initialState = {
    companyList: [],
    status: 'idle',
    error: null
}

export const fetchAsyncCompList = createAsyncThunk('compList/getInitialState', async (_, { rejectWithValue }) => {
    try {
        const res = await fetch(`${url}/company`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        })
        const data = await res.json();

        // console.log(res.status);
        // console.log(data);

        if (!res.ok) {
            throw new Error(data.message || 'Failed to fetch companies');
        }
        return data;
    } catch (err) {
        // if (err.response && err.response.status === 401) {
        //     dispatch(setUnauthorizedMessage('You need to log in first.'));
        //     return rejectWithValue('Unauthorized');
        // }
        return rejectWithValue(err.message)
    }
});

export const fetchFilterCompList = createAsyncThunk('compList/fetchFilteredCompList', async (filterParams, { rejectWithValue }) => {
    console.log(filterParams);
    try {
        const filteredParams = Object.fromEntries(Object.entries(filterParams).filter(([_, v]) => v !== undefined));

        const queryParams = new URLSearchParams(filteredParams).toString();
        const response = await fetch(`${url}/company/filter?${queryParams}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        })

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Could not fetch filtered products');
        }

        return data;
    } catch (err) {
        return rejectWithValue(err.message);
    }
})

const compListSlice = createSlice({
    name: 'companies',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAsyncCompList.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(fetchAsyncCompList.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.companyList = action.payload;
        })
        builder.addCase(fetchAsyncCompList.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        builder.addCase(fetchFilterCompList.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(fetchFilterCompList.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.companyList = action.payload;
        })
        builder.addCase(fetchFilterCompList.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
    }
})

export const getAllCompList = (state) => state.companies.companyList;
export default compListSlice.reducer;