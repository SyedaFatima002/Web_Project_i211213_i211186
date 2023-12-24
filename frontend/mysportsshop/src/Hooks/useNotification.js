import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import useUser from './useUser';

const useNotification=()=>{
    const {token} =useUser();

    const fetchNotification= async()=>{
        try{
            const response= await axios.get(`http://localhost:3001/auth/notifications`, {
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
        queryKey:['getNotification'],
        queryFn: fetchNotification
    })
}

export default useNotification
