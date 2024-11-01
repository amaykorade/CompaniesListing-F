import { configureStore } from '@reduxjs/toolkit';
import companyListReducer from '../features/companyListSlice.js'
import adminCompanyListReducer from '../components/Admin/slice/AdminSlice.js';
import userReducer from '../features/userSlice.js'

export const store = configureStore({
  reducer: {
    companies: companyListReducer,
    adminCompanies: adminCompanyListReducer,
    auth: userReducer
  },
});
