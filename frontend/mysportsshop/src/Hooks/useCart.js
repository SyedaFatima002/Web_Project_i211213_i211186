import {create} from 'zustand'

const useCart=create((set)=>({
    productSchema:{
        productID: '',
        productname:'',
        brand:'',
        unitprice:0,
        options:[],
        discount:[],
        quantity:1
    },
    products:[],
    totalAmount:0,
    AmountDisc:0,//amount after discount
    paymentMethod:'cash on delivery',
    items:0,

    addToCart: (product, paymentMethod)=>{
        set((state)=>{
            const newProduct=[...state.products, { ...state.productSchema, ...product }]
            let Total=state.totalAmount + (product.unitprice*product.quantity)
            const newTotal=Total
            let sumDiscount=discount.reduce((acc, disc)=> acc+disc, 0)

            newTotal=((100-sumDiscount)*newTotal)/100
            const totalItems=newProduct.length

            return {
                products: newProduct,
                totalAmount: Total,
                AmountDisc: newTotal,
                paymentMethod:paymentMethod,
                items:totalItems 
            }
        })
    },

    updatePaymentMethod: (method)=>{
        set({ paymentMethod: method });
    },

    updateQuantity: (productID, newQuant)=>{
        set((state)=>{
            const newProduct=state.products.map((product)=>
                product.productID==productID ? { ...product, quantity:newQuant }: product
            )
            const product=state.products.filter(product=> product.productID===productID)

            let Total=state.totalAmount + (product.unitprice*product.quantity)
            const newTotal=Total
            let sumDiscount=discount.reduce((acc, disc)=> acc+disc, 0)

            newTotal=((100-sumDiscount)*newTotal)/100

            return {
                products: newProduct,
                totalAmount: Total,
                AmountDisc:newTotal
            }
        });
    },

    updateOptions: (productID, newOption)=>{
        set((state)=>({
            products: state.products.map((product)=>{
                product.productID==productID ? { ...product, options: newOption }: product
            })
        }));
    },

    removeFromCart: (productID)=>{
        set((state)=>{
            const updatedProducts = state.products.filter((product) => product.productID !== productID);

            const product=state.products.filter(product=> product.productID===productID)

            let Total=state.totalAmount + (product.unitprice*product.quantity)
            const newTotal=Total
            let sumDiscount=discount.reduce((acc, disc)=> acc+disc, 0)

            newTotal=((100-sumDiscount)*newTotal)/100

            const totalItem=updatedProducts.length

            return {
                products: updatedProducts,
                totalAmount: Total,
                AmountDisc:newTotal,
                items:totalItem
            }
        })
    },

    placeOrder: ()=>{
        //add place order functionality
    }
}));

export default useCart;