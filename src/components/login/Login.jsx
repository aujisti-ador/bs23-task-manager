import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginAsync } from '../../store/slices/authSlice';
import "./Login.css";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const dispatch = useDispatch();

    const { error } = useSelector((state) => state.auth)

    const handleLogin = () => {

        setUsernameError('');
        setPasswordError('');

        // Perform authentication logic
        if (!username) {
            setUsernameError('Username is required');
        } else if (!password) {
            setPasswordError('Password is required');
        }

        if (username && password) {
            dispatch(loginAsync({ username, password }))
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
                <label className="errorLabel">{error}</label>
            </div>
        </div>
    );
};

export default Login;
