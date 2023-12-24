import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import useUser from './useUser';

const useLoyaltyPoints=()=>{
    const {token} =useUser();

    const fetchLoyaltyPoints= async()=>{
        try{
            const response= await axios.get(`http://localhost:3001/auth/loyaltyPoints`, {
                headers:{
                    authorization: `${token}`,
                }
            });
            
            console.log(response.data)
            return response.data

        }catch(error){
            console.error("Error fetching data:", err);
            throw err; 
        }
    }

    return useQuery({
        queryKey:['getLoyalty'],
        queryFn: fetchLoyaltyPoints
    })
}

export default useLoyaltyPoints
