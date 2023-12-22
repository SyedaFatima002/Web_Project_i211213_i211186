import {create} from 'zustand'

const useUser= create((set)=>({
    userid:'',
    username:'', 
    email:'',
    role:'',
    token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkYW0xMSIsInVzZXJpZCI6IjY1NzhhZjcxMDMxYjY4NTYyODE2YWU4YiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzAzMjY4OTg0fQ.nIeeI16HhhAgDc-2w8V_ecXEXCQCBmN0ovo56Px3860',
    setId:(newID)=> set({userid:newID}),
    settoken:(newToken)=> set({token:newToken}),
    setusername: (newUsername) => set({ username: newUsername }),
    setemail: (newEmail) => set({ email: newEmail }),
    setrole: (newRole) => set({ role: newRole }),
}));

export default useUser;