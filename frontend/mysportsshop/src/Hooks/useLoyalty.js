import axios from 'axios'
import { useQuery } from "@tanstack/react-query";
import useUser from './useUser';

const useLoyalty = () => {
    const { token } = useUser();

    const fetchLoyalty = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/auth/loyaltyPoints`, {
                headers: {
                    authorization: `${token}`,
                }
            })

            console.log(response.data)
            return response.data

        } catch (error) {
            console.error("Error fetching loyalty points:", err);
            throw err;
        }
    }

    return useQuery({
        queryKey: ['getLoyalty'],
        queryFn: fetchLoyalty
    })
}

export default useLoyalty