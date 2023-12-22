import {create} from 'zustand'

const useUser= create((set)=>({
    userid:'',
    username:'', 
    email:'',
    role:'',
    token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkYW0xMSIsInVzZXJpZCI6IjY1NzhhZjcxMDMxYjY4NTYyODE2YWU4YiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzAzMjY0MTM3fQ.5xwHqebM4o3WLZUf-JVEzD5YGbVDfPv0GP37f1a4E1o',
    setId:(newID)=> set({userid:newID}),
    settoken:(newToken)=> set({token:newToken}),
    setusername: (newUsername) => set({ username: newUsername }),
    setemail: (newEmail) => set({ email: newEmail }),
    setrole: (newRole) => set({ role: newRole }),
}));

export default useUser;