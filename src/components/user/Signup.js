// client/src/components/Signup.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser, selectAuthStatus, selectAuthError } from '../../features/userSlice';
import { useNavigate } from 'react-router-dom';
import { SignUpStyled } from './Auth.styled';
// import { register } from '../../features/user/userSlice';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');


    const dispatch = useDispatch();
    const status = useSelector(selectAuthStatus);
    const error = useSelector(selectAuthError);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("register", name, email, password);
        dispatch(signupUser({
            email,
            password,
            name: name.toUpperCase(),
        }));
    };

    useEffect(() => {
        if (status === 'succeeded') {
            navigate('/login')
        }
    }, [status, navigate]);

    return (
        <SignUpStyled>

            <div className='signup'>
                {/* if(status === 'succeeded') */}
                <h2>Signup</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        {/* <label>Name</label> */}
                        <input
                            className='input'
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Name'
                            autoFocus
                            required
                        />
                    </div>
                    <div>
                        {/* <label>Email</label> */}
                        <input
                            className='input'
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='@gmail.com'
                            required
                        />
                    </div>
                    <div>
                        {/* <label>Password</label> */}
                        <input
                            className='input'
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='password'
                            required
                        />
                    </div>

                    <button type="submit">Signup</button>
                    {status === 'loading' && <p>Loading...</p>}
                    {error && <p>{typeof error === 'object' ? JSON.stringify(error) : error}</p>}
                </form>
            </div>
        </SignUpStyled>
    );
};

export default Signup;
