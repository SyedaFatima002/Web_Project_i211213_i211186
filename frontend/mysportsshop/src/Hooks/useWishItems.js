import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import useUser from './useUser';

const useWishItems=()=>{
    const {token} =useUser();

    const fetchWishItems= async()=>{
        try{
            const response= await axios.get(`http://localhost:3001/order/wishlist`, {
                headers:{
                    authorization: `${token}`,
                }
            });
            
            return response.data

        }catch(error){
            console.error("Error fetching data:", err);
            throw err; 
        }
    }

    return useQuery({
        queryKey:['getwishitems'],
        queryFn: fetchWishItems
    })
}

export default useWishItems
