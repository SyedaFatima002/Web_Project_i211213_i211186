import axios from 'axios';

export async function followBrand(token, followid){
    try{
        console.log(token)
        const response= await axios.put(`http://localhost:3001/auth/follow/${followid}`, {},
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