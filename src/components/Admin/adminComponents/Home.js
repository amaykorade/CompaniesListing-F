import React, { useEffect, useState } from 'react'
import Navbar from '../adminMolecules/Navbar.js'
import CompanyForm from './CompanyForm.js'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser } from '../../../features/userSlice.js'
import { useNavigate } from 'react-router-dom'

export const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const currentUser = useSelector(selectCurrentUser);
    console.log("c :", currentUser);

    useEffect(() => {
        if (currentUser) {
            setLoading(false);
            if (!currentUser.user || currentUser.user.isAdmin === false) {
                navigate('/');
            }
        }
    }, [currentUser, navigate]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            {/* <Navbar /> */}
            <CompanyForm />
        </>

    )
}
