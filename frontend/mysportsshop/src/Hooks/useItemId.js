import {create} from 'zustand'

const useItemId= create((set)=>({
    itemId:'',
    setItemId: (newId)=>set({itemId:newId}),
}));

export default useItemId;