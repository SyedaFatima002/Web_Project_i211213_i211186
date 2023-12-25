import axios from 'axios';


export async function addToWishList(token, wishId){
    try{
        console.log(token)
        const response= await axios.post(`http://localhost:3001/order/wishlist/${wishId}`, {},
        {
            headers:{
                authorization: `${token}`,
            }
        });
        return response.data
    }catch(err){
        return err.response.data
    }
}
