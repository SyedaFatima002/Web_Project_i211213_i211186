import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import useUser from './useUser';

const useOrderHistory = () => {
    const { username } = useUser();

    const fetchOrderHistory = async () => {
        try {
            const response = await axios.get('http://localhost:3001/order/orderhistory', {
                params: { username: username }
            });


            return response.data
        } catch (error) {
            console.error("Error fetching order history:", err);
            throw err;
        }
    }

    return useQuery({
        queryKey: ['getorderhistory'],
        queryFn: fetchOrderHistory
    })
}

export default useOrderHistory;
