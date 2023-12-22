import axios from 'axios';

export async function deleteWishItem(token, wishId){
    try{
        console.log(token)
        const response= await axios.put(`http://localhost:3001/order/wishlist/${wishId}`, {},
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