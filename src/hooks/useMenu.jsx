import { useQuery } from '@tanstack/react-query';
import usePublicAxios from './usePublicAxios';

const useMenu = () => {
    const axiosPublic = usePublicAxios();
    const {refetch, data: menuData=[], isPending: loading} = useQuery({
        queryKey: ['menu'],
        queryFn: async () =>{
            const result = await axiosPublic.get('/menu');
            return result.data;
        }
    });
    return [menuData, loading, refetch];
};

export default useMenu;
