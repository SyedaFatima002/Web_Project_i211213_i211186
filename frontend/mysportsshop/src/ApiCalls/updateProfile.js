import axios from 'axios';
import useUser from '../Hooks/useUser';

export async function updateUsername(newusername){
    
    try{
        const { token, setusername } = useUser();
        const response=await axios.put(`http://localhost:3001/auth/profile/username`, {
            username:newusername
        }, {
            headers:{
                authorization: `${token}`,
            }
        })

        console.log(response)
        if (response){
            setusername(newusername)
        }
        return response
    }catch (err) {
        if (err.response) {
            return err.response.data;
        } else {
            console.error('Error in updateUsername:', err);
            throw err;
        }
    }
}