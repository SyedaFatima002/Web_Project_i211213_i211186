import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import useUser from './useUser';

const useFollowing = () => {
    const { token } = useUser();

    const fetchFollowing = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/auth/following`, {
                headers: {
                    authorization: `${token}`,
                }
            });

            console.log(response.data)
            return response.data

        } catch (error) {
            console.error("Error fetching data:", err);
            throw err;
        }
    }

    return useQuery({
        queryKey: ['getfollowing'],
        queryFn: fetchFollowing
    })
}

export default useFollowing
