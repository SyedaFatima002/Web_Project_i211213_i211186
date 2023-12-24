import axios from 'axios';

export async function sendReview(token, username, rating, comment, productid){
    try{
        const response= await axios.post(`http://localhost:3001/auth/comment/${productid}`, {
            customer:username,
            comment:comment,
            rating:rating
        },
        {
            headers:{
                authorization: `${token}`,
            }
        })

        return response.data
    }catch(err){
        return err.response.data
    }
}
