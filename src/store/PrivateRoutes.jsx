import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import "./index.css"
import { useEffect } from 'react';

const PrivateRoutes = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.auth);
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated]);

    return (
        <div className='app-container'>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
};

export default PrivateRoutes;