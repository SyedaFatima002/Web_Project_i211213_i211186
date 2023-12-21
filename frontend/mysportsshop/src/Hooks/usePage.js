import { create } from 'zustand'

const usePage=create((set)=>({
    currentPage:'HomePage',
    setPage: (newPage)=>set({currentPage:newPage})
}));

export default usePage;