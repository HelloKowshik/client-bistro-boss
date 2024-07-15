import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

const axiosInstance = axios.create({
    baseURL:'https://server-bistro-boss.vercel.app'
});
const useAxios = () => {
    const navigate = useNavigate();
    const { logOut } = useAuth();
    axiosInstance.interceptors.request.use(function(config){
        const token = localStorage.getItem('access-token');
        // console.log(`Axios Token: ${token}`);
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function(err){
        return Promise.reject(err);
    });

    axiosInstance.interceptors.response.use(function(response){
        return response;
    }, async(error) =>{
        const status = error.response.status;
        if(status === 401 || status === 403){
            await logOut();
            navigate('/login');
        }
        return Promise.reject(error);
    });

    return axiosInstance;
};

export default useAxios;
