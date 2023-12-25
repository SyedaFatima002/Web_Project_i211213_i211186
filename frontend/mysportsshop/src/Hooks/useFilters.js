import { create } from 'zustand'

const useFilters = create((set) => ({
    search: '',
    priceMin: 0,
    priceMax: Infinity,
    Collection: '',
    category: '',
    sport: '',
    brandname: '',
    page: 1,
    limit: 10,
    sortOrder: '',
    sortBy: '',

    setSearch: (s) => set({ search: s }),
    setPriceMin: (pmin) => set({ priceMin: pmin }),
    setPriceMax: (pmax) => set({ priceMax: pmax }),
    setCollections: (coll) => set({ Collection: coll }),
    setSport: (sp) => set({ sport: sp }),
    setBrand: (b) => set({ brandname: b }),
    setPageNum: (page) => set({ page: page }),
    setLimit: (lim) => set({ limit: lim }),
    setSortOrder: (or) => set({ sortOrder: or }),
    setSortBy: (sb) => set({ sortBy: sb }),

}))

export default useFilters;