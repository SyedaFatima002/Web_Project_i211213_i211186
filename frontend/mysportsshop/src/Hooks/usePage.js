import { create } from 'zustand'

const usePage=create((set)=>({
    currentPage:'ProductFeed',
    setPage: (newPage)=>set({currentPage:newPage})
}));

export default usePage;