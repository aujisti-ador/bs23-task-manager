import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import "./index.css"
import { useEffect } from 'react';

const CommonRoutes = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard");
        }
    }, [isAuthenticated]);

    return (
        <div className='app-container'>
            <Outlet />
        </div>
    )
};

export default CommonRoutes;