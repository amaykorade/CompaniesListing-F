import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

let url = `http://localhost:3200/api`;

export const addCompany = createAsyncThunk(
    'companies/addCompany',
    async (companyData, { rejectWithValue }) => {
        console.log(companyData);
        try {
            const response = await fetch(`${url}/company`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...companyData,
                    domain: companyData.domain,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add company');
            }

            return await response.json(); // Return the response
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const companyListSlice = createSlice({
    name: 'companies',
    initialState: {
        companyList: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addCompany.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addCompany.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.companyList.push(action.payload); // Add the new company to the list
            })
            .addCase(addCompany.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});


export const selectCompanyList = (state) => state.companies.companyList;
export default companyListSlice.reducer;