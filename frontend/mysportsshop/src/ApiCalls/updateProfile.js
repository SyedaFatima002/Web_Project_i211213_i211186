import axios from 'axios';
import useUser from '../Hooks/useUser';

export async function updateUsername(token, newusername, setusername){
    try{
        console.log(newusername)
        const response=await axios.put(`http://localhost:3001/auth/profile/username`, {
            username:newusername
        }, {
            headers:{
                authorization: `${token}`,
            }
        })

        console.log(response)
        setusername(newusername)
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

export async function updateEmail(token, newemail, setemail){
    try{
        
        const response=await axios.put(`http://localhost:3001/auth/profile/email`, {
            email:newemail
        }, {
            headers:{
                authorization: `${token}`,
            }
        })

        console.log(response)
        setemail(newemail)
        return response
    }catch (err) {
        if (err.response) {
            return err.response.data;
        } else {
            console.error('Error in updateEmail:', err);
            throw err;
        }
    }
}

export async function updatePhone(token, newphone){
    try{
        
        const response=await axios.put(`http://localhost:3001/auth/profile/phone`, {
            phoneNumber:newphone
        }, {
            headers:{
                authorization: `${token}`,
            }
        })

        console.log(response)
        return response
    }catch (err) {
        if (err.response) {
            return err.response.data;
        } else {
            console.error('Error in updatePhone:', err);
            throw err;
        }
    }
}