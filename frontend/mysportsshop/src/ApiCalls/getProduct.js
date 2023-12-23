import axios from 'axios'

export async function getProduct(productid){
    try{
        const response= await axios.get(`http://localhost:3001/supplier/getProduct/${productid}`)       
        console.log(response)
        return response.data     
    }
    catch(err){
        return err.response
    }
}