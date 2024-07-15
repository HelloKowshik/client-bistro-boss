import axios from 'axios';

const axiosPublic = axios.create({
    baseURL:'https://server-bistro-boss.vercel.app'
});

const usePublicAxios = () => {
    return axiosPublic;
};

export default usePublicAxios;
