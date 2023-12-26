import axios from 'axios';

export async function unfollowbrand(token, brand){
    try{
        console.log(token)
        const response= await axios.put(`http://localhost:3001/auth/unfollow/${brand}`, {},
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