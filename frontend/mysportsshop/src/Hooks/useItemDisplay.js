import axios from 'axios'
import { useQuery } from "@tanstack/react-query";

const useItemDisplay=(productid)=>{
    const fetchItem=async()=>{
        try{
            console.log(productid)
            const response= await axios.get(`http://localhost:3001/supplier/getProduct/${productid}`)       
            return response.data   
        }
        catch(err){
            return err.response
        }
    }

    return useQuery({
        queryKey:['getItem'],
        queryFn:fetchItem
    });
}

export default useItemDisplay;