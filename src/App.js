import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Link } from "react-router-dom";
// import 'antd/dist/antd.less';
import './App.css';

// antd design components
// import { Button } from 'antd';
// import { CompanyList } from './components/CompanyList.js';
// import { CompanyListFilter } from './molecules/companyListFilter.js';
// import CompanyForm from './components/Admin/adminComponents/CompanyForm.js';
import { Home } from './components/Admin/adminComponents/Home.js';
import { Company } from './components/Company.js';
import Navbar from './molecules/Navbar.js';
import Login from './components/user/Login.js';
import Signup from './components/user/Signup.js';
// import { useDispatch } from 'react-redux';
// import { getCurrentUser } from './features/userSlice.js';
// import Navbar from './components/Admin/adminMolecules/Navbar.js';



function App() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getCurrentUser());
  // }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Company />} />
        <Route path="/admin" element={<Home />} />
        {/* <Route path="/admin" element={<CompanyForm />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/navbar" element={<Navbar />} /> */}
      </Routes>
    </Router>

  );
}

export default App;
