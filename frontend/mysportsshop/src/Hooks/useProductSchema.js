import {create} from 'zustand'

const useProductSchema=create((set)=>({
    productID: '',
    productname:'',
    brand:'',
    unitprice:0,
    options:[],
    discount:[],
    quantity:1,

    setID: (pid)=>set({productID:pid}),
    setPname: (pname)=>set({productname:pname}),
    setBrand: (bname)=>set({brand:bname}),
    setPrice:(price)=>set({unitprice:price}),
    setQuant: (q)=>set({quantity:q}),
    addoptions: (opt)=>set({options:options.push(opt)}),
    setDiscounts: (disc)=>set({discount:disc})
}))

export default useProductSchema;