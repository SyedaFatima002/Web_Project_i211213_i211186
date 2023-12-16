const mongoose=require('mongoose')
const fs=require('fs');
require("dotenv").config();

const Brand=require('./models/brand.Schema');
const Product=require('./models/product.Schema');

//Database
mongoose.connect(process.env.MONGODB_STRING).then(()=>{
    console.log("Connected to Database")
}).catch((err)=>{ 
    console.log("Error in Connecting to Database")
}) 

const insertData= async()=>{
    try{
        const brands=JSON.parse(fs.readFileSync('./Assets/Brands.json'));//getting brands

        const insertedbrands=await Brand.insertMany(brands);//inserting brands

        const products=JSON.parse(fs.readFileSync('./Assets/Products.json'));//getting products

        const insertedproducts=await Product.insertMany(products);//insert products

        //get brand ids
        const brandIds={}
        insertedbrands.forEach(brand => {
            brandIds[brand.brandname]=brand._id
        });

        //insert product to brand
        insertedproducts.map(async product=>{
            const id=brandIds[product.brandname];//getting id of brand
            await Brand.findByIdAndUpdate(id, { $push: { products:product._id }})
        });

        console.log('Brands and Products added')

    }catch(err){
        console.log('Error in inserting data');
    }
}

insertData();