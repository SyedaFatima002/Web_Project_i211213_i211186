import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import useUser from './useUser';

const useProfile=()=>{
    const {token} =useUser();

    const fetchUser= async()=>{
        try{
            const response= await axios.get('http://localhost:3001/auth/profile',{
                headers:{
                    authorization: `${token}`,
                }
            })
            console.log(response.data)                
            return response.data.profile
        }catch(error){
            console.error("Error fetching data:", err);
            throw err; 
        }
    }

    return useQuery({
        queryKey:['getuserprofile'],
        queryFn:fetchUser
    })
}

export default useProfile;