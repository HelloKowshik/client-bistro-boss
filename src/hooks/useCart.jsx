import { useQuery } from '@tanstack/react-query';
import useAxios from './useAxios';
import useAuth from './useAuth';

const useCart = () => {
    const axiosInstance = useAxios();
    const { user } = useAuth();
    const { refetch, data: cart=[] } = useQuery({
        queryKey:['cart', user?.email],
        queryFn: async () => {
            const result = await axiosInstance.get(`/carts?email=${user?.email}`);
            return result.data;
        }
    });
    return [cart, refetch];
};

export default useCart;
