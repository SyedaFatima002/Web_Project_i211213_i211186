//This is a temporray controller
const Brand=require('../models/brand.Schema');
const Product=require('../models/product.Schema');
const Customer=require('../models/customer.Schema');

//add supplier/brand
exports.add_supplier=async (req, res)=>{
    try{
        //creating a new supplier/brand
        const brand=new Brand({
            name:req.body.name,
            products:[],
            followers:req.body.followers,
            image:req.body.image
        });

        //save brand
        await brand.save();
        res.status(201).json({message:'Brand created ' + brand.name});
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Failed to add brand/suppplier'})
    }
}

//add product
exports.add_Product=async (req, res)=>{
    try{
        const brand=await Brand.findById(req.params.id);

        if (!brand){
            return res.status(404).json({message:'Brand not found'})
        }

        console.log(req.body)

        //adding entire product for now
        const product=new Product({
            name:req.body.name,
            description:req.body.description,
            price:req.body.price,
            image:req.body.image,
            categories:req.body.categories,
            options:req.body.options,
            brand:brand._id,
            discount:req.body.discount,
            comments:req.body.comments,
            ratings:req.body.ratings
        })


        //saving new product in database
        const newproduct = await product.save();

        //saving the product to brand
        brand.products.push(newproduct._id);
        await brand.save();

        //sending out notifications
        const newNotification="New Product Added by " + brand.name + ". Start Shopping";

        //get all follower ids
        const followers=brand.followers;

        //saing notifications with customer
        await Customer.updateMany(
            { _id: { $in: followers} },
            { $push: {notification: newNotification}}
        );
        
        res.status(201).json({message:'New Product added '+ newproduct.name});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: 'Failed to add product'})
    }
}

//get products filtering for search happens here


//get specific product
exports.getProduct=async (req, res)=>{
    const id=req.params.id;

    try{
        const response=await Product.findOne({_id:id})

        if (!response){
            return res.status(404).json({message:'Product Not Found'})
        }

        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Failed to find Product'})
    }
}