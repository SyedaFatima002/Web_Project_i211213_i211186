import {create} from 'zustand'

const useCart=create((set)=>({
    productSchema:{
        productID: '',
        productname:'',
        brand:'',
        unitprice:0,
        options:[],
        discount:[],
        quantity:1.
    },
    products:[],
    totalAmount:0,
    AmountDisc:0,//amount after discount
    paymentMethod:'cash on delivery',

    addToCart: (product, paymentMethod)=>{
        set((state)=>{


            return {
                products:[...state.products, { ...state.productSchema, ...product }],
                totalAmount: state.totalAmount + (product.unitprice*product.quantity),
                paymentMethod:paymentMethod 
            }
        })
    },

    updatePaymentMethod: (method)=>{
        set({ paymentMethod: method });
    },

    updateQuantity: (productID, newQuant)=>{
        set((state)=>({
            products: state.products.map((product)=>
                product.productID==productID ? { ...product, quantity:newQuant }: product
            ),
            totalAmount: state.products.reduce((acc, product)=> acc + product.unitprice * product.quantity, 0)
        }));
    },

    updateOptions: (productID, newOption)=>{
        set((state)=>({
            products: state.products.map((product)=>{
                product.productID==productID ? { ...product, options: newOption }: product
            })
        }));
    }


}));

export default useCart;