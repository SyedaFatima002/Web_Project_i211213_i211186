import axios from "axios";

export async function register(username, email,password, address,phoneNumber){
    try{
        const res=await axios.post('http://localhost:3001/auth/signup', {
            username:username,
            email:email,
            password:password,
            role:'user',
            address:address,
            phoneNumber:phoneNumber
        })

        console.log(res.data)
        //return res.data
    }catch(err){
        return err
    }
}

/**username,
            email,
            password,
            role,
            address,
            phoneNumber, */
