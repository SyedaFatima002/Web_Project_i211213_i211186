import {create} from 'zustand'

const useLogin= create((set)=>({
    login:false,
    setLogin: ()=>set({login:!login}),
}));

export default useLogin;