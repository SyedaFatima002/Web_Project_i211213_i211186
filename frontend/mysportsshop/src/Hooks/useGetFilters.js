import axios from 'axios'
import { useQuery } from "@tanstack/react-query";

const useGetFilters = () => {
    const fetchFilters = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/supplier/filters`)
            //console.log(response)
            return response.data;
        } catch (err) {
            return err.response
        }
    }

    return useQuery({
        queryKey: ['gettingFitlters'],
        queryFn: fetchFilters
    })
}

export default useGetFilters;