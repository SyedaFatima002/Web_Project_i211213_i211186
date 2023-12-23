import {create} from 'zustand'

const useUser= create((set)=>({
    userid:'',
    username:'', 
    email:'',
    role:'',
    token:'',
    setId:(newID)=> set({userid:newID}),
    settoken:(newToken)=> set({token:newToken}),
    setusername: (newUsername) => set({ username: newUsername }),
    setemail: (newEmail) => set({ email: newEmail }),
    setrole: (newRole) => set({ role: newRole }),
}));

export default useUser;