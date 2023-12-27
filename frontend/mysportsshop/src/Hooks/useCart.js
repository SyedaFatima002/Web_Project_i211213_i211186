import {create} from 'zustand'

const useCart=create((set)=>({
    productSchema:{
        productID: '',
        productname:'',
        brand:'',
        unitprice:0,
        options:[],
        discount:[],
        quantity:1,
        image:''
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
            let newTotal=Total
            const sumDiscount = newProduct.reduce((acc, prod) => {
                return acc + (prod.discount ? prod.discount.reduce((dAcc, disc) => dAcc + disc, 0) : 0);
            }, 0);

            newTotal=((100-sumDiscount)*newTotal)/100
            const totalItems=newProduct.length
            console.log(state.totalAmount)
            
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
            let newTotal=Total
            const sumDiscount = newProduct.reduce((acc, prod) => {
                return acc + (prod.discount ? prod.discount.reduce((dAcc, disc) => dAcc + disc, 0) : 0);
            }, 0);

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

    removeFromCart: (productID) => {
        set((state) => {
            const updatedProducts = state.products.filter((product) => product.productID !== productID);
    
            const totalAmount = updatedProducts.reduce((acc, prod) => acc + prod.unitprice * prod.quantity, 0);
    
            const sumDiscount = updatedProducts.reduce((acc, prod) => {
                return acc + (prod.discount ? prod.discount.reduce((dAcc, disc) => dAcc + disc, 0) : 0);
            }, 0);
    
            
            const AmountDisc = ((100 - sumDiscount) * totalAmount) / 100;
    
            const totalItems = updatedProducts.length;
    
            return {
                products: updatedProducts,
                totalAmount,
                AmountDisc,
                items: totalItems,
            };
        });
    },

    order: () => {
        set({
          products: [],
          totalAmount: 0,
          AmountDisc: 0,
          paymentMethod: 'cash on delivery',
          items: 0,
        });
      },
}));

export default useCart;