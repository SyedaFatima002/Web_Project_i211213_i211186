import {create} from 'zustand'

const useUser= create((set)=>({
    username:'', 
    email:'',
    role:'',
    token:'',
    settoken:(newToken)=> set({token:newToken}),
    setusername: (newUsername) => set({ username: newUsername }),
    setemail: (newEmail) => set({ email: newEmail }),
    setrole: (newRole) => set({ role: newRole }),
}));

export default useUser;