import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import "./index.css"
import { useEffect } from 'react';
import { logout } from './slices/authSlice';

const PrivateRoutes = () => {
    const navigate = useNavigate();
    const { isAuthenticated, username } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated]);

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <div className='app-container'>
            <Header appName={"Task manager App"} username={username} onLogout={handleLogout} />
            <Outlet />
            <Footer content={"Footer &copy; Ador"} />
        </div>
    )
};

export default PrivateRoutes;