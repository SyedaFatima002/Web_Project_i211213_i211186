import {create} from 'zustand'

const useLogin= create((set)=>({
    login:false,
    setLogin: (login)=>set({login:login}),
}));

export default useLogin;