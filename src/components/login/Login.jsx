import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync } from '../../store/slices/authSlice';
import "./Login.css";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginStatus, setLoginStatus] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.auth);

    const handleLogin = () => {
        // Clear previous errors
        setUsernameError('');
        setPasswordError('');

        // Perform authentication logic
        if (!username) {
            setUsernameError('Username is required');
        } else if (!password) {
            setPasswordError('Password is required');
        }

        if (username && password) {
            // Update the login status
            setLoginStatus('Logging in...');

            dispatch(loginAsync({ username, password }))
                .then(() => {
                    // Assuming the loginAsync action returns a promise
                    // Redirect on successful login
                    navigate("/dashboard");
                })
                .catch(() => {
                    // Handle login failure if needed
                    setLoginStatus('Login failed');
                });
        }
    };

    return (
        <div className='mainContainer'>
            <div className='titleContainer'>
                <div>Login</div>
            </div>
            <br />
            <div className='inputContainer'>
                <input
                    value={username}
                    placeholder="Enter your username here"
                    onChange={(ev) => setUsername(ev.target.value)}
                    className='inputBox'
                />
                <label className="errorLabel">{usernameError}</label>
            </div>
            <br />
            <div className='inputContainer'>
                <input
                    value={password}
                    type='password'
                    placeholder="Enter your password here"
                    onChange={(ev) => setPassword(ev.target.value)}
                    className='inputBox'
                />
                <label className="errorLabel">{passwordError}</label>
            </div>
            <br />
            <div className='inputContainer'>
                <input className='inputButton' type="button" onClick={handleLogin} value={'Log in'} />
                <label className="errorLabel">{loginStatus}</label>
            </div>
        </div>
    );
};

export default Login;
