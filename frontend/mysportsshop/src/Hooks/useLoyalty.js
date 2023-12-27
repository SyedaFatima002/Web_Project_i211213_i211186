import axios from 'axios'
import { useQuery } from "@tanstack/react-query";
import useUser from './useUser';

const useLoyalty = () => {
    const { token } = useUser();

    const fetchLoyalty = async () => {
        try {
            var response=null;
            if (token) {
                response = await axios.get(`http://localhost:3001/auth/loyaltyPoints`, {
                    headers: {
                        authorization: `${token}`,
                    }
                })
                return response.data
            }

            console.log(response.data)
            return null;

        } catch (error) {
            console.error("Error fetching loyalty points:", error);
            throw error;
        }
    }

    return useQuery({
        queryKey: ['getLoyalty'],
        queryFn: fetchLoyalty
    })
}

export default useLoyalty