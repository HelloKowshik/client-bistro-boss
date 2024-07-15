import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    if(loading) return <span className="loading loading-spinner text-success"></span>
    if(user) return children;
    return <Navigate to='/login' state={{from: location}} replace/>
};

export default PrivateRoute;
