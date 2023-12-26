import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import useUser from './useUser';

const useOrderHistory = () => {
    const { token, username } = useUser();

    const fecthOrderHistory = async () => {
        try{
            const response= await axios.get('http://localhost:3001/order/orderhistory', {
                username:username
            }, {
                headers: {
                    authorization: `${token}`,
                }
            })

            
            return response.data
        } catch (error) {
            console.error("Error fetching order history:", err);
            throw err;
        }
    }

    return useQuery({
        queryKey:['getorderhistory'],
        queryFn:fecthOrderHistory
    })
}

export default useOrderHistory;
