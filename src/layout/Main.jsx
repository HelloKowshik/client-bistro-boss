import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../pages/shared/Footer/Footer';
import NavBar from '../pages/shared/NavBar/NavBar';

const Main = () => {
    const location = useLocation();
    const isLogin = location.pathname.includes('login') || location.pathname.includes('signup');
    return (
        <div>
            {isLogin || <NavBar />}
            <Outlet />
            {isLogin || <Footer />}
        </div>
    );
};

export default Main;
