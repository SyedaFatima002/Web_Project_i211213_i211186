import axios from "axios";

export async function LoginShop(username, password){
    try{
        const res = await axios.post("http://localhost:3001/auth/login", {
            username: username,
            password: password
        });
        
        return res.data
    }catch(err){
        return err.response.data
    }
}