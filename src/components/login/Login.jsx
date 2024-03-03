import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../store/slices/authSlice';
import "./Login.css";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const dispatch = useDispatch();

    const handleLogin = () => {
        // Perform authentication logic
        if (!username) {
            setUsernameError('Username is required');
        } else if (!password) {
            setPasswordError('Password is required');
        }

        if (username && password) {

            dispatch(loginSuccess({ username }));
            // Store the username in localStorage for persistence
            localStorage.setItem('username', username);
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
            </div>
        </div>
    );
};

export default Login;
